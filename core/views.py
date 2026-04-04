from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .models import User, Post, Comment, Like
from .serializers import (
    UserSerializer, PostSerializer, CommentSerializer, LikeSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=True, methods=['post'])
    def follow(self, request, pk=None):
        user_to_follow = self.get_object() 
        current_user = request.user        

        if user_to_follow == current_user:
            return Response(
                {"detail": "Você não pode seguir a si mesmo."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        current_user.following.add(user_to_follow)
        return Response({"detail": f"Você agora está seguindo {user_to_follow.username}."})

    @action(detail=True, methods=['post'])
    def unfollow(self, request, pk=None):
        user_to_unfollow = self.get_object()
        current_user = request.user

        current_user.following.remove(user_to_unfollow)
        return Response({"detail": f"Você deixou de seguir {user_to_unfollow.username}."})

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=False, methods=['get'])
    def feed(self, request):
        user = request.user
        
        following_users = user.following.all()
        
        queryset = Post.objects.filter(author__in=following_users).order_by('-created_at')
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)