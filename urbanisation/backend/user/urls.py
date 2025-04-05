from . import views
from django.urls import path

urlpatterns = [
    path('citzen/login/', views.CitzenLogin),
    path('citzen/signup/', views.CitzenRegister),
    path('staff/login/', views.loginStaffUser),
    path('staff/signup/', views.registerStaffUser),
]