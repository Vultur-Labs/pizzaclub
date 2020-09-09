from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator

from pizzaclub.settings import MAX_CUIL_LENGTH, MIN_CUIL_LENGTH
from pizzaclub.settings import MAX_PHONE_LENGTH, MIN_PHONE_LENGTH
from registration.models import Employee, Client, Address
#from gdstorage.storage import GoogleDriveStorage

# Define Google Drive Storage
#gd_storage = GoogleDriveStorage()
# Create your models here.

class TypeProduct(models.Model):
    name = models.CharField(max_length=20)
    def __str__(self):
        return self.name

class SubTypeProduct(models.Model):
    name = models.CharField(max_length=20)
    type_id = models.ForeignKey(TypeProduct, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.type_id.name})"

class SizeProduct(models.Model):
    size = models.CharField(max_length=20)

    def __str__(self):
        return self.size

class Product(models.Model):
    name = models.CharField(max_length=50)
    type_id = models.ForeignKey(TypeProduct, on_delete=models.CASCADE)
    subtype_id = models.ForeignKey(SubTypeProduct, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.type_id.name}:{self.subtype_id.name})"
    
    def save(self, *args, **kwargs):
        if self.subtype_id.type_id.id != self.type_id.id:
            raise ValueError(f"Subtype must belong to Type of Product")
        super(Product, self).save(*args, **kwargs)

class PriceList(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(SizeProduct, on_delete=models.CASCADE)
    price = models.FloatField(default=0)
    is_active = models.BooleanField(default=True)
    is_available = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if self.price < 0: raise ValueError(f"Price must be greater than zero.")
        super(PriceList, self).save(*args, **kwargs)

"""
class ProductImages(models.Model):

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="products/", storage=gd_storage)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.image.url}"
    
    def save(self, *args, **kwargs):
        '''
            Change the name of file to uuid.
        '''
        # Get the file extension
        extension = '.' + self.image.name.split('.')[-1]
        # Change the name of image
        self.image.name = '/'.join([str(self.product.id), str(uuid.uuid4().hex + extension)])
        super(ProductImages, self).save(*args, **kwargs)
"""

class Place(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    #logo = models.ImageField(upload_to='owner/%Y/%m/%d', storage=gd_storage)
    instagram = models.URLField()
    whatsapp = models.URLField()
    #cbu = models.CharField(max_length=30)
    #alias_CBU = models.CharField(max_length=50)
    #cuenta = models.CharField(max_length=50)
    #banco = models.CharField(max_length=50)
    cuil = models.CharField(
        max_length=MAX_CUIL_LENGTH,
        unique=True,
        validators=[
            MinLengthValidator(MIN_CUIL_LENGTH),
            MaxLengthValidator(MAX_CUIL_LENGTH),
            RegexValidator(regex=r'^\d+$')
        ])
    phone = models.CharField(
        max_length=MAX_PHONE_LENGTH,
        null=True,
        blank=True,
        validators=[
            MinLengthValidator(MIN_PHONE_LENGTH),
            MaxLengthValidator(MAX_PHONE_LENGTH),
            RegexValidator(regex=r'^\d+$')
        ])
    address = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

class Shipping(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

class Order(models.Model):
    STATUS_CHOICES = [
        ('shipping', 'shipping'),
        ('open', 'open'),
        ('cancel', 'cancel'),
        ('pending', 'pending'),
        ('processing', 'processing'),
        ('delivering', 'delivering'),
        ('ready', 'ready')
        ]
    
    ORDER_TYPES = [
        ('whatsapp', 'whatsapp'),
        ('phone', 'phone'),
        ('local', 'local'),
        ('pedidos ya', 'pedidos ya')
    ]

    order = models.AutoField(primary_key=True)
    order_type = models.CharField(max_length=10, choices=ORDER_TYPES)
    date = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    table = models.PositiveSmallIntegerField(null=True)
    shipping = models.ForeignKey(Shipping, on_delete=models.CASCADE, null=True)
    #is_shipping = models.BooleanField(default=False)
    comment = models.TextField(default='', null=True, blank=True)
    total = models.FloatField(default=0.0)

    def __str__(self):
        return str(self.order_id)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=1)
    unitary_price = models.FloatField(default=0.0)
    unitary_cost = models.FloatField(default=0.0)
    total = models.FloatField(default=0.0)
    total_cost = models.FloatField(default=0.0)

    def __str__(self):
        return f"#{self.id}"

    def save(self, *args, **kwargs):
        self.total = self.quantity*self.unitary_price
        self.total_cost = self.quantity*self.unitary_cost
        super(OrderItem, self).save(*args, **kwargs)

