from django.contrib import admin

from .models import Table

# Register your models here

class TableAdmin(admin.ModelAdmin):
    list_display = ['id', 'number', 'is_open', 'owner']

# Re-register UserAdmin
admin.site.register(Table, TableAdmin)
