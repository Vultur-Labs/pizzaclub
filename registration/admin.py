from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
#from django.contrib.auth.models import User
from .models import User, Employee, Client, Address

# Register your models here
class EmployeeInline(admin.StackedInline):
    model = Employee
    can_delete = False
    verbose_name_plural = 'employees'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (EmployeeInline,)
    # In fieldset define the custom fields 
    # when change an user in admin app
    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {'fields': ('is_employee',)}),
    )
    # In add_fieldset define the custom fields 
    # when create anew user in admin app
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {'fields': ('is_employee',)}),
    )

class AddressAdmin(admin.ModelAdmin):
    list_display = ['id', 'address', 'lat', 'lon']

# Re-register UserAdmin
#admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Employee)
admin.site.register(Client)
admin.site.register(Address, AddressAdmin)

