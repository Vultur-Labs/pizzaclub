# Generated by Django 3.1.1 on 2020-09-15 20:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0011_auto_20200914_0546'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='presentationproduct',
            options={'ordering': ['order_n', 'pk']},
        ),
        migrations.AlterModelOptions(
            name='sizeproduct',
            options={'ordering': ['order_n', 'pk']},
        ),
        migrations.AlterModelOptions(
            name='subtypeproduct',
            options={'ordering': ['order_n', 'pk']},
        ),
        migrations.AlterModelOptions(
            name='typeproduct',
            options={'ordering': ['order_n', 'pk']},
        ),
        migrations.AlterField(
            model_name='pricelist',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prices', to='orders.product'),
        ),
    ]