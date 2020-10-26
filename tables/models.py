from django.db import models

from orders.models import Place, PriceList

# Create your models here.
class Table(models.Model):
    number = models.PositiveSmallIntegerField(default=0)
    is_open = models.BooleanField(default=False)
    owner = models.ForeignKey(Place, on_delete=models.CASCADE)

    class Meta:
        ordering = ["number"]

class OrderTable(models.Model):
    STATUS_CHOICES = [
        ('open', 'open'),
        ('cancel', 'cancel'),
        ('close', 'close')
        ]

    owner = models.ForeignKey(Place, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=7, choices=STATUS_CHOICES, default='open')
    total = models.FloatField(default=0)

    def __str__(self):
        return str(self.order)

    def save(self, *args, **kwargs):
        # Calculate the total
        total = 0
        for item in self.items.select_related():
            total += item.total
        super(OrderTable, self).save(*args, **kwargs)

class TableItem(models.Model):
    order = models.ForeignKey(OrderTable, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(PriceList, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    unitary_price = models.FloatField(default=0)
    total = models.FloatField(default=0)
    
    def __str__(self):
        return f"#{self.id}"

    def save(self, *args, **kwargs):
        self.unitary_price = self.product.price
        self.total = self.quantity*self.unitary_price
        super(OrderItem, self).save(*args, **kwargs)
