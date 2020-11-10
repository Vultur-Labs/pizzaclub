from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import UpdateAPIView

from .models import Table, OrderTable, TableItem
from orders.models import Order, OrderItem, PriceList, Place
from registration.models import Employee
from .serializers import (
    TableItemSerializer,
    OrderTableSerializer,
    TableSerializer
)
from orders.serializers import PriceListSerializer

class TableViewSet(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ("retrieve", "list"):
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class OrderTableViewSet(ModelViewSet):
    queryset = OrderTable.objects.filter(status="open")
    serializer_class = OrderTableSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ("retrieve", "list"):
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=["post"])
    def open(self, request):
        # Get the Table, the Place and the Employee from request
        try:
            table = Table.objects.get(pk=request.data.get("table"))
            owner = Place.objects.get(pk=request.data.get("owner"))
            employee = Employee.objects.get(pk=request.data.get("employee"))
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # Create the order
        order = OrderTable.objects.create(
            owner=owner,
            table=table,
            employee=employee
            )
        # Open the table
        order.open()
        # Serialize the OrderTable and return
        serializer = self.get_serializer(order)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=["post"])
    def close(self, request, pk=None):
        instance = self.get_object()

        if not instance.items.exists():
            instance.cancel()
            # return Response({ "id": instance.id }, status=status.HTTP_200_OK)
        else:
            instance.close()
            # Create Order
            order = Order.objects.create(
                order_type="local",
                employee=instance.employee,
                status="ready",
                table=instance.table.number,
                delivery_mode="local",
            )
            # Add items to order
            for item in instance.items.select_related():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                )
            # Save the order to calculate the total
            order.save()
            # Close the Table
            instance.table.close()
        # Serialize the instance and return
        serializer = self.get_serializer(instance)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_tableitems(request, owner_id, order_id):
    try:
        order = OrderTable.objects.get(id=order_id)
        if order.owner.id != owner_id: return Reponse(status=status.HTTP_400_BAD_REQUEST)
        serializer = TableItemSerializer(order.items, many=True)
    except:
        return Reponse(status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def new_item(request):
    try:
        # Get the Order, Product and quantity from request
        order = OrderTable.objects.get(id=request.data["order"])
        product = PriceList.objects.get(id=request.data["product"])
        quantity = request.data["quantity"]
        # Create the Item
        item = TableItem.objects.create(
            order=order,
            product=product,
            quantity=quantity
            )
        # Serialize the New Item and Return
        serializer = TableItemSerializer(item)
    except:
        return Reponse(status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def remove_item(request, pk=None):
    try:
        # Get the TableItem
        item = TableItem.objects.get(pk=pk)
        order = item.order.id
        # Remove the Item
        item.delete()
        res = {"order": order, "id": pk}
    except:
        return Reponse(status=status.HTTP_400_BAD_REQUEST)
    return Response(res,status=status.HTTP_200_OK)

class TableItemView(ModelViewSet):
    queryset = TableItem.objects.all()
    serializer_class = TableItemSerializer
    permission_classes= [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        #Create Table Items
        items = []
        for item in request.data:
            order = OrderTable.objects.get(pk=item.pop("order"))
            quantity = item.pop("quantity")
            prod = PriceList.objects.get(**item)
            items.append(TableItem.objects.create(
                order=order,
                product=prod,
                quantity=quantity
                ))
        # Save the order to get the total
        order.save()
        # Serialize the OrderTable and Send
        order_data = OrderTableSerializer(order)
        return Response(order_data.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        order = instance.order
        self.perform_destroy(instance)
        order.save()
        order_data = OrderTableSerializer(order)
        return Response(order_data.data, status=status.HTTP_200_OK)
