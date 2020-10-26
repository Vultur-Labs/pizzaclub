from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from .models import User, Employee, Client, Address

class ExtraFieldsSerializer(ModelSerializer):
    '''
     This class override th get_field_names to add extra field defined in Meta class
     as extra_fields
    '''
    def get_field_names(self, declared_fields, info):
        expanded_fields = super(ExtraFieldsSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields

class AddressSerializer(ExtraFieldsSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ClientSerializer(ModelSerializer):
    '''
        Serialize the data of client.
    '''
    
    class Meta:
        model = Client
        fields = ['name', 'phone', 'email', 'address']

class UserSerializer(ExtraFieldsSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_employee",
            "is_staff"
        ]
        extra_fields = ["is_order_manager"]

class EmployeeSerializer(ModelSerializer):
    user = UserSerializer()
    address = AddressSerializer()
    class Meta:
        model = Employee
        fields = "__all__"
