# Generated by Django 3.1.1 on 2020-09-16 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0012_auto_20200915_2026'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='place',
            name='logo',
        ),
    ]
