from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from user.models import Citzen, CitzenToken
from rest_framework import status


# Create your views here.
@csrf_exempt
def addFavorite(request):
    if request.method == 'POST':
        # Handle the POST request to add a favorite item
        # Extract data from the request and process it
        # For example, you might want to save the favorite item to the database
        try:
            data = JSONParser().parse(request)
            print(data) 
            route_id = data['route_id']
            route_name = data['route_name']
            token = data['token']
            user = CitzenToken.objects.get(token=token).user
            print(user)
            return JsonResponse({"message": "Favorite added successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    
        # Handle other request methods if needed (e.g., GET)
        
    