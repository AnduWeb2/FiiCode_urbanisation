from . import views
from django.urls import path

urlpatterns = [
    path('citizen/login/', views.CitzenLogin),
    path('citzen/signup/', views.CitzenRegister),
    path('staff/login/', views.loginStaffUser),
    path('staff/signup/', views.registerStaffUser),
    path('add_points/', views.add_points),
    path('get_points/', views.getPoints)
]