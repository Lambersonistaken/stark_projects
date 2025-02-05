from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Project, Repository, Tracker
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        print("Listing projects...")
        queryset = self.get_queryset()
        print(f"Found {queryset.count()} projects")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            print("Validation errors:", serializer.errors)
            return Response(
                {"detail": str(serializer.errors)},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Error creating project:", str(e))
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Project deleted successfully"})

    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        project = self.get_object()
        new_project = Project.objects.create(
            name=f"Copy of {project.name}",
            slug=f"{project.slug}-copy",
            description=project.description,
            language=project.language
        )
        
        # Duplicate repositories
        for repo in project.repositories.all():
            Repository.objects.create(
                project=new_project,
                title=repo.title,
                url=repo.url,
                type=repo.type,
                email=repo.email,
                token=repo.token
            )
        
        # Duplicate trackers
        for tracker in project.trackers.all():
            Tracker.objects.create(
                project=new_project,
                title=tracker.title,
                url=tracker.url,
                type=tracker.type,
                email=tracker.email,
                token=tracker.token
            )
        
        serializer = self.get_serializer(new_project)
        return Response(serializer.data)
