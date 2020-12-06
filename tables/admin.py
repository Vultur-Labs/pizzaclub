from django.contrib import admin

from .models import Table, OrderTable, TableItem

# Register your models here


class TableAdmin(admin.ModelAdmin):
    list_display = ['id', 'number', 'is_open', 'owner']


class TableItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'quantity', 'total', 'status']


class OrderTableAdmin(admin.ModelAdmin):
    list_display = ['id', 'date', 'owner', 'table', 'status', 'total']


# Re-register UserAdmin
admin.site.register(Table, TableAdmin)
admin.site.register(TableItem, TableItemAdmin)
admin.site.register(OrderTable, OrderTableAdmin)
