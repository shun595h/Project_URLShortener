from django.urls import path
from . import views

urlpatterns = [
    path('tinifyurl/', views.genshorturl),
    path('<str:urlshort>', views.redirectUrl)
]
