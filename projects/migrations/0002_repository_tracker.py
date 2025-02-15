# Generated by Django 5.1.5 on 2025-02-03 15:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Repository',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('url', models.URLField()),
                ('type', models.CharField(choices=[('GitHub', 'GitHub'), ('GitLab', 'GitLab'), ('Bitbucket', 'Bitbucket')], max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('token', models.CharField(max_length=255)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repositories', to='projects.project')),
            ],
        ),
        migrations.CreateModel(
            name='Tracker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('url', models.URLField()),
                ('type', models.CharField(choices=[('GitHub', 'GitHub'), ('GitLab', 'GitLab'), ('Bitbucket', 'Bitbucket'), ('Jira', 'Jira')], max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('token', models.CharField(max_length=255)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trackers', to='projects.project')),
            ],
        ),
    ]
