from rest_framework.serializers import (
    ModelSerializer, 
    RelatedField, 
    CharField,
    PrimaryKeyRelatedField
)
from .models import Table, OrderTable, TableItem
from orders.models import PriceList
from orders.serializers import PriceListSerializer

class TableSerializer(ModelSerializer):
    class Meta:
        model = Table
        fields = "__all__"

class TableItemSerializer(ModelSerializer):
    product = PriceListSerializer()

    class Meta:
        model = TableItem
        fields = "__all__"

class OrderTableSerializer(ModelSerializer):
    items = TableItemSerializer(many=True, read_only=True)
    table = TableSerializer(read_only=True)
    class Meta:
        model = OrderTable
        fields = '__all__'
