# Generated by Django 5.0.6 on 2024-06-21 11:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_rename_items_cart_item'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='analytics',
            options={'verbose_name_plural': 'Analytics'},
        ),
        migrations.RenameField(
            model_name='product',
            old_name='img',
            new_name='image',
        ),
    ]
