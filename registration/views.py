from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import User, Employee, Address
from .serializers import UserSerializer, EmployeeSerializer


@api_view(["GET"])
def validate_username(request):
    user_id = request.GET.get('id', None)
    username = request.GET.get('username', None)
    res = User.objects.filter(username=username).exclude(id=user_id).exists()
    return Response({"ok": not res})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        # Extract Main Data
        user = request.data.pop('user', None)
        user.pop("password") #Remove the password
        address = request.data.pop('address', None)
        # Only collect the data change
        # Employee Data
        data = {k:v for k, v in request.data.items() if v != getattr(instance, k)}
        # User Data
        if user: data['user'] = {
            k: v for k, v in user.items() 
            if v != getattr(instance.user, k)
            }
        # Address Data
        if isinstance(address, dict):
            data['address'] = {
                k: v for k, v in address.items() 
                if not (instance.address and v == getattr(instance.address, k))
                }
        if not address and instance.address: data['address'] = None
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.perform_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
