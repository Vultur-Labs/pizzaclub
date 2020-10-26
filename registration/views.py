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
    res = User.objects.filter(username=username, is_active=True).exclude(id=user_id).exists()
    return Response({"ok": not res})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def register_employee(request):
    """
        Register a new employee passing the user data, password, address,
        dni, cuil and phone.
    """
    # Get the User data and create
    try:
        user_data = request.data.pop("user")
        user = User.objects.create_user(is_employee=True, **user_data)
    except Exception as error:
        return Response({"error": "User data is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
    # Get the address data and create
    address_data = request.data.pop("address")
    check = Address.objects.filter(address=address_data).exists()
    address = (Address.objects.get(address=address_data) 
    if check else Address.objects.create(address=address_data))
    # Create the employee instance
    employee = Employee.objects.create(user=user, address=address, **request.data)
    # Serialize the employee data
    serializer = EmployeeSerializer(employee)
    return Response(serializer.data, status=status.HTTP_200_OK)

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.perform_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
