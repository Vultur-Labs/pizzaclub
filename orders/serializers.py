from rest_framework.serializers import (
    ModelSerializer, 
    RelatedField, 
    CharField
)
from .models import (
    Product,
    PriceList,
    SubTypeProduct,
    TypeProduct,
    SizeProduct,
    PresentationProduct,
    FeatureProduct,
    Place,
    Shipping,
    Order,
    OrderItem,
    )
from registration.serializers import (
    AddressSerializer,
    ExtraFieldsSerializer
    )

class SubTypeSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    class Meta:
        model = SubTypeProduct
        fields = '__all__'

class TypeSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    subtype = SubTypeSerializer(many=True, read_only=True)
    class Meta:
        model = TypeProduct
        fields = '__all__'

class SizeSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    class Meta:
        model = SizeProduct
        fields = '__all__'

class PresentationSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    class Meta:
        model = PresentationProduct
        fields = '__all__'

class ShippingSerializer(ExtraFieldsSerializer):
    class Meta:
        model = Shipping
        fields = '__all__'

class OwnerSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Place Class.
    '''
    address = AddressSerializer()
    shipping = ShippingSerializer(many=True)
    class Meta:
        model = Place
        fields = (
            'id',
            'name',
            'instagram',
            'whatsapp',
            'phone',
            'address',
            'shipping'
        )

class FeatureSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    class Meta:
        model = FeatureProduct
        fields = '__all__'

class PriceSerializer(RelatedField):
    '''
        Change the representation for price in the ProductSerializer.
    '''
    def to_representation(self, value):
        size = value.size.id if value.size else None 
        presentation = value.presentation.id if value.presentation else None
        return {
            'size': size,
            'presentation': presentation,
            'price': value.price
            }

class ProductSerializer(ExtraFieldsSerializer):
    '''
        Serialize the data of product.
    '''
    # images = ProductImagesSerializer(many=True, read_only=True)
    size = SizeSerializer(many=True, read_only=True)
    presentation = PresentationSerializer(many=True, read_only=True)
    feature = FeatureSerializer(many=True, read_only=True)
    prices = PriceSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class PriceListSerializer(ExtraFieldsSerializer):
    '''
        Serialize the data of price list.
    '''
    size = CharField()
    presentation = CharField()
    class Meta:
        model = PriceList
        fields = "__all__"
        extra_fields = ["get_product_name"]

class OrderItemSerializer(ModelSerializer):
    product = PriceListSerializer()
    class Meta:
        model = OrderItem
        exclude = ['order']

class OrderSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True)
    delivery_address = AddressSerializer(allow_null=True)
    class Meta:
        model = Order
        fields = '__all__'

class OrderWhatsAppSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `OrderItem` instance, given the validated data.
        """
        items_data = validated_data.pop("items", [])
        # Create the Order
        order = Order.objects.create(**validated_data)
        # Create and add items
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        # Save order for calculated Total
        order.save()
        return order