from django.db import models
from user.models import Citzen

# Create your models here.

class FavoriteRoute(models.Model):
    route_id = models.CharField(max_length=255, unique=True)
    route_name = models.CharField(max_length=255)
    user = models.ForeignKey(Citzen, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.route_name} - {self.user.username}"