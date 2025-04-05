from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import StaffUser, Citzen, StaffUserToken, CitzenToken
from files.views import getFile
from django.contrib.auth.hashers import make_password, verify_password


@csrf_exempt
def registerStaffUser(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            user = StaffUser.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password']),
                first_name=data['first_name'],
                last_name=data['last_name'],
                document=data['document']
            )
            user.save()
            return JsonResponse({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
@csrf_exempt    
def loginStaffUser(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            user = StaffUser.objects.get(username=data['username'])
            if verify_password(data['password'], user.password):
                token = StaffUserToken.objects.create(user=user, token=make_password(user.username))
                token.save()
                return JsonResponse({"token": token.token}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except StaffUser.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
@csrf_exempt
def CitzenRegister(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            user = Citzen.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password']),
                first_name=data['first_name'],
                last_name=data['last_name']
            )
            user.save()
            return JsonResponse({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
@csrf_exempt    
def CitzenLogin(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            user = Citzen.objects.get(username=data['username'])
            if verify_password(data['password'], user.password):
                token = CitzenToken.objects.create(user=user, token=make_password(user.username))
                token.save()
                return JsonResponse({"token": token.token}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except Citzen.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)