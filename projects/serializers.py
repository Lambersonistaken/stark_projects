from rest_framework import serializers
from .models import Project, Repository, Tracker


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['id', 'title', 'url', 'type', 'email', 'token']

class TrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields = ['id', 'title', 'url', 'type', 'email', 'token']

class ProjectSerializer(serializers.ModelSerializer):
    repositories = RepositorySerializer(many=True, required=False)
    trackers = TrackerSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = ['id', 'name', 'slug', 'description', 'language', 'repositories', 'trackers']

    def create(self, validated_data):
        repositories_data = validated_data.pop('repositories', [])
        trackers_data = validated_data.pop('trackers', [])
        
        project = Project.objects.create(**validated_data)
        
        for repo_data in repositories_data:
            Repository.objects.create(project=project, **repo_data)
        
        for tracker_data in trackers_data:
            Tracker.objects.create(project=project, **tracker_data)
        
        return project

    def update(self, instance, validated_data):
        repositories_data = validated_data.pop('repositories', [])
        trackers_data = validated_data.pop('trackers', [])
        
        # Update project fields
        instance.name = validated_data.get('name', instance.name)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.description = validated_data.get('description', instance.description)
        instance.language = validated_data.get('language', instance.language)
        instance.save()
        
        # Update repositories
        instance.repositories.all().delete()
        for repository_data in repositories_data:
            Repository.objects.create(project=instance, **repository_data)
        
        # Update trackers
        instance.trackers.all().delete()
        for tracker_data in trackers_data:
            Tracker.objects.create(project=instance, **tracker_data)
        
        return instance
