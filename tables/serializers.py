from rest_framework.serializers import (
    ModelSerializer, 
    RelatedField, 
    CharField
)
from .models import Table, OrderTable, TableItem
from orders.serializers import PriceListSerializer

class TableSerializer(ModelSerializer):

    class Meta:
        model = Table
        fields = "__all__"

class TableItemSerializer(ModelSerializer):
    product = PriceListSerializer()
    class Meta:
        model = TableItem
        exclude = ['order']

class OrderTableSerializer(ModelSerializer):
    items = TableItemSerializer(many=True)
    class Meta:
        model = OrderTable
        fields = '__all__'
