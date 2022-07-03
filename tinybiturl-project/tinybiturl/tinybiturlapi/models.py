from django.db import models

# Create your models here.
class URLs(models.Model):
    _id = models.AutoField(primary_key=True)
    urllong = models.CharField(max_length=100)
    urlshort = models.CharField(max_length=50)
    QRphotoname = models.CharField(max_length=100)

    def __str__(self):
        return self.urlshort
