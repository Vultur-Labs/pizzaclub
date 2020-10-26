# Generated by Django 3.1.1 on 2020-10-26 00:42

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0005_auto_20200927_2208'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='phone',
            field=models.CharField(blank=True, max_length=11, null=True, validators=[django.core.validators.MinLengthValidator(7), django.core.validators.MaxLengthValidator(11), django.core.validators.RegexValidator(regex='^\\d+$')]),
        ),
    ]