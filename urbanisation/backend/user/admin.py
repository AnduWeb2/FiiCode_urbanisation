from django.contrib import admin
from .models import Citzen, StaffUser, StaffUserToken, CitzenToken,StaffUser

# Register your models here.
class CitzenAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'points')
    search_fields = ('username', 'email')

admin.site.register(Citzen, CitzenAdmin)
admin.site.register(StaffUser)