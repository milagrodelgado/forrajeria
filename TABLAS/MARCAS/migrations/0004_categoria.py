# Generated by Django 5.0.6 on 2024-07-22 01:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MARCAS', '0003_empleado'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('categoria', models.CharField(max_length=100)),
            ],
        ),
    ]
