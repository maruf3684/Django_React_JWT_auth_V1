from django.db.models.base import Model
from rest_framework.serializers import ModelSerializer
from base.schoolmodels import Student


class StudentSerializer(ModelSerializer):
    class Meta:
        model=Student
        fields='__all__'