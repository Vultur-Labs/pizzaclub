from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Table, OrderTable, TableItem
from .serializers import (
    TableItemSerializer,
    OrderTableSerializer,
    TableSerializer
)

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
    queryset = OrderTable.objects.all()
    serializer_class = OrderTableSerializer
    permission_classes= [IsAuthenticated]

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
        item = TableItem.objects.create(**request.data)
        serializer = TableItemSerializer(item)
    except:
        return Reponse(status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data,status=status.HTTP_200_OK)