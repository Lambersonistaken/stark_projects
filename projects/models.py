# Bu kod, Django'nun ORM (Object-Relational Mapping) sistemini kullanarak veritabanında üç farklı tablo (model) oluşturuyor:
from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    language = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Repository(models.Model):
    REPO_TYPES = [
        ('GitHub', 'GitHub'),
        ('GitLab', 'GitLab'),
        ('Bitbucket', 'Bitbucket'),
    ]
    
    project = models.ForeignKey(Project, related_name='repositories', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    url = models.URLField()
    type = models.CharField(max_length=20, choices=REPO_TYPES)
    email = models.EmailField()
    token = models.CharField(max_length=200)

class Tracker(models.Model):
    TRACKER_TYPES = [
        ('GitHub', 'GitHub'),
        ('GitLab', 'GitLab'),
        ('Jira', 'Jira'),
    ]
    
    project = models.ForeignKey(Project, related_name='trackers', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    url = models.URLField()
    type = models.CharField(max_length=20, choices=TRACKER_TYPES)
    email = models.EmailField()
    token = models.CharField(max_length=200)
