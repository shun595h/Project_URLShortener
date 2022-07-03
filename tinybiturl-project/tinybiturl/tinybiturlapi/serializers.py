from rest_framework.serializers import ModelSerializer
from .models import URLs


class URLsSerializer(ModelSerializer):
    class Meta:
        model = URLs
        fields = '__all__'
