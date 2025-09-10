from tasks.models import Task
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        owner = serializers.ReadOnlyField(source='owner.username')
        fields = ["title", "description", "due_date", "completed", "owner"]


class UserSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'tasks']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
