from django.db import models

from orders.models import Place, PriceList
from registration.models import Employee

# Create your models here.
class Table(models.Model):
    number = models.PositiveSmallIntegerField(default=0)
    is_open = models.BooleanField(default=False)
    owner = models.ForeignKey(Place, on_delete=models.CASCADE)

    class Meta:
        ordering = ["number"]

    def __str__(self):
        return f"Mesa #{self.number}"

    def open(self):
        self.is_open = True
        self.save()

    def close(self):
        self.is_open = False
        self.save()

class OrderTable(models.Model):
    STATUS_CHOICES = [
        ('open', 'open'),
        ('cancel', 'cancel'),
        ('close', 'close')
        ]

    owner = models.ForeignKey(Place, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, 
        on_delete=models.SET_NULL,
        null=True,
        blank=True
        )
    employee = models.ForeignKey(
        Employee,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
        )
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=7, choices=STATUS_CHOICES, default='open')
    total = models.FloatField(default=0)

    def __str__(self):
        return str(self.id)

    def open(self):
        self.table.open()
        self.save()

    def close(self):
        self.table.close()
        self.status = "close"
        self.save()
    
    def cancel(self):
        self.table.close()
        self.status = "cancel"
        self.save()

    def save(self, *args, **kwargs):
        # Calculate the total
        total = 0
        for item in self.items.select_related():
            total += item.total
        self.total = total
        super(OrderTable, self).save(*args, **kwargs)

class TableItem(models.Model):
    order = models.ForeignKey(OrderTable, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(PriceList, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    total = models.FloatField(default=0)
    is_delivered = models.BooleanField(default=False)
    
    def __str__(self):
        return f"#{self.id}"

    def delivered(self):
        self.is_delivered = True
        self.save()

    def save(self, *args, **kwargs):
        self.total = self.quantity*self.product.price
        super(TableItem, self).save(*args, **kwargs)
