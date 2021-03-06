# Generated by Django 3.1.1 on 2020-10-30 17:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0008_auto_20201026_1520'),
        ('tables', '0002_auto_20201030_1242'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordertable',
            name='employee',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='registration.employee'),
        ),
        migrations.AlterField(
            model_name='ordertable',
            name='table',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tables.table'),
        ),
    ]
