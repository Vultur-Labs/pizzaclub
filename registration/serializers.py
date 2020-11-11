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
        extra_fields = ["is_table_manager"]

class EmployeeSerializer(ModelSerializer):
    user = UserSerializer()
    address = AddressSerializer()
    class Meta:
        model = Employee
        fields = "__all__"

    def create(self, validated_data):
        # Get the User data and create
        user_data = validated_data.pop("user")
        password = self.context.get("request").data.get("user").pop("password")
        user = User.objects.create_user(is_employee=True, password=password, **user_data)
        # Get the address data and create
        address = Address.objects.create(**validated_data.pop("address"))
        # Create the employee instance
        employee = Employee.objects.create(user=user, address=address, **validated_data)
        return employee

    def update(self, instance, validated_data):
        # Extract Data
        user = validated_data.pop('user', None)
        address = validated_data.pop('address', True)
        # Update User
        if user: 
            [setattr(instance.user, k, v) for k, v in user.items()]
            instance.user.save()      
        #Update Address
        if isinstance(address, dict):
            if not instance.address: instance.address = Address.objects.create(**address)
            else: 
                [setattr(instance.address, k, v) for k, v in address.items()]
                instance.address.save()
        if address == None: instance.address = None
        # Update Client
        [setattr(instance, k, v) for k, v in validated_data.items()]
        instance.save()
        return instance