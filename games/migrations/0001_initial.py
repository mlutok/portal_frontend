# Generated by Django 2.0.6 on 2018-09-21 19:09

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0004_auto_20180825_1642'),
    ]

    operations = [
        migrations.CreateModel(
            name='Adventure',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('season', models.PositiveIntegerField(blank=True, null=True, verbose_name='Season')),
                ('number', models.PositiveIntegerField(blank=True, null=True, verbose_name='Number')),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('type', models.IntegerField(choices=[(1, 'EX'), (2, 'EN'), (3, 'EP'), (4, 'CCC'), (5, 'Other')], verbose_name='Type')),
            ],
            options={
                'verbose_name': 'Adventure',
                'verbose_name_plural': 'Adventures',
                'ordering': ('season', 'number', 'title'),
            },
        ),
        migrations.CreateModel(
            name='GameSession',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateField(verbose_name='Date')),
                ('spots', models.PositiveIntegerField(default=1, verbose_name='Maximum spots')),
                ('notes', models.CharField(blank=True, max_length=255, null=True, verbose_name='Additional notes')),
                ('time_start', models.TimeField(blank=True, null=True, verbose_name='Starting time')),
                ('time_end', models.TimeField(blank=True, null=True, verbose_name='Ending time')),
                ('adventure', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='game_sessions', to='games.Adventure')),
                ('dm', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='game_sessions', to='profiles.Profile')),
            ],
            options={
                'verbose_name': 'Game Session',
                'verbose_name_plural': 'Game Sessions',
                'ordering': ('-date', 'table'),
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, verbose_name='Table name')),
                ('max_spots', models.PositiveIntegerField(default=1, verbose_name='Maximum spots')),
            ],
            options={
                'verbose_name': 'Table',
                'verbose_name_plural': 'Tables',
                'ordering': ['name'],
            },
        ),
        migrations.AddField(
            model_name='gamesession',
            name='table',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game_sessions', to='games.Table'),
        ),
    ]
