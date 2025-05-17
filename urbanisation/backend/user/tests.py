from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from files.models import File
from django.core.files.uploadedfile import SimpleUploadedFile

class UserAuthTests(APITestCase):
    def setUp(self):
        # Create a dummy file for staff registration
        self.dummy_file = SimpleUploadedFile("test.pdf", b"file_content", content_type="application/pdf")
        self.file_obj = File.objects.create(file=self.dummy_file)

    def test_staff_register_and_login(self):
        # Register staff
        staff_data = {
            "username": "staffuser",
            "email": "staff@example.com",
            "password": "testpass123",
            "first_name": "Staff",
            "last_name": "User",
            "document_id": self.file_obj.id
        }
        response = self.client.post("api/user/staff/signup/", staff_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn("message", response.data)

        # Try login with correct credentials (should fail if is_valid is False)
        login_data = {"username": "staffuser", "password": "testpass123"}
        response = self.client.post("api/user/staff/login/", login_data, format='json')
        self.assertEqual(response.status_code, 412)  # Not valid yet
        self.assertIn("error", response.data)

    def test_citizen_register_and_login(self):
        # Register citizen
        citizen_data = {
            "username": "citizenuser",
            "email": "citizen@example.com",
            "password": "testpass123",
            "first_name": "Citizen",
            "last_name": "User"
        }
        response = self.client.post("api/user/citzen/signup/", citizen_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn("message", response.data)

        # Login with correct credentials
        login_data = {"username": "citizenuser", "password": "testpass123"}
        response = self.client.post("api/user/citizen/login/", login_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn("username", response.data)

        # Login with wrong password
        bad_login = {"username": "citizenuser", "password": "wrongpass"}
        response = self.client.post("api/user/citizen/login/", bad_login, format='json')
        self.assertEqual(response.status_code, 401)
        self.assertIn("error", response.data)
