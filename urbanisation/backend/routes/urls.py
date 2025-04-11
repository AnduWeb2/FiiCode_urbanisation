from . import views
from django.urls import path

urlpatterns = [
   path("add-favorite/", views.addFavorite),
]