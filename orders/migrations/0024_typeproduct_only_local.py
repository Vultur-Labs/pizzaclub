# Generated by Django 3.1.1 on 2020-11-12 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0023_auto_20201106_1518'),
    ]

    operations = [
        migrations.AddField(
            model_name='typeproduct',
            name='only_local',
            field=models.BooleanField(default=False),
        ),
    ]
