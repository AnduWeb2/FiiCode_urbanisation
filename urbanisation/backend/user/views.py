from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import StaffUser, Citzen, StaffUserToken, CitzenToken
from files.views import getFile
from files.models import File 
from django.contrib.auth.hashers import make_password, verify_password, check_password


@csrf_exempt
def registerStaffUser(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            print(data)
            document = File.objects.get(id=data['document_id'])
            user = StaffUser.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password']),
                first_name=data['first_name'],
                last_name=data['last_name'],
                document=document,
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
            if user.is_valid == False:
                return JsonResponse({"error": "User is not valid"}, status=status.HTTP_412_PRECONDITION_FAILED)
            if verify_password(data['password'], user.password):
                token = StaffUserToken.objects.create(user=user, token=make_password(user.username))
                token.save()
                return JsonResponse({"token": token.token,
                                     "username": user.username
                }, status=status.HTTP_200_OK)
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
            if check_password(data['password'], user.password):
                token = CitzenToken.objects.create(user=user, token=make_password(user.username))
                token.save()
                return JsonResponse({"token": token.token, "username": user.username}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except Citzen.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

@csrf_exempt
def add_points(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            print(data)
            points_to_add = data.get('points', 0)
            token = request.headers.get('Authorization')
            if not token:
                return JsonResponse({"error": "Token is required"}, status=400)
            if token.startswith("Bearer "):
                token = token[7:]
            user = CitzenToken.objects.get(token=token).user
            if not user:
                return JsonResponse({"error": "Invalid token"}, status=401)
            user.points += points_to_add
            user.save()
            return JsonResponse({"message": "Points added successfully"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

def getPoints(request):
    if request.method == 'GET':
        print(f"Authorization Header: {request.headers.get('Authorization')}")
        try:
            token = request.headers.get('Authorization')
            if not token:
                return JsonResponse({"error": "Token is required"}, status=400)
            if token.startswith("Bearer "):
                token = token[7:]
            user = CitzenToken.objects.get(token=token).user
            if not user:
                return JsonResponse({"error": "Invalid token"}, status=401)
            return JsonResponse({"points": user.points}, status=200)
        except Exception as e:
            print(f"Error in getPoints: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status = status.HTTP_405_METHOD_NOT_ALLOWED)
