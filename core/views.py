from django.db.models import Q
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .models import User, Post, Comment, Like
from .serializers import (
    UserSerializer, PostSerializer, CommentSerializer, LikeSerializer
)


def optimized_post_queryset():
    return (
        Post.objects
        .select_related('author')
        .prefetch_related('likes', 'comments')
        .order_by('-created_at')
    )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.prefetch_related('followers', 'following')
    serializer_class = UserSerializer
    lookup_field = 'username'

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=True, methods=['post'])
    def follow(self, request, username=None):
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
    def unfollow(self, request, username=None):
        user_to_unfollow = self.get_object()
        current_user = request.user

        current_user.following.remove(user_to_unfollow)
        return Response({"detail": f"Você deixou de seguir {user_to_unfollow.username}."})

    @action(detail=False, methods=['get', 'patch'])
    def me(self, request):
        user = request.user

        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)

        elif request.method == 'PATCH':
            serializer = self.get_serializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def followers(self, request, username=None):
        user = self.get_object()
        followers = user.followers.all()
        serializer = self.get_serializer(followers, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def following(self, request, username=None):
        user = self.get_object()
        following = user.following.all()
        serializer = self.get_serializer(following, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def posts(self, request, username=None):
        user = self.get_object()
        user_posts = optimized_post_queryset().filter(author=user)
        serializer = PostSerializer(user_posts, many=True, context={'request': request})
        return Response(serializer.data)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        return optimized_post_queryset()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()

        if post.author != request.user:
            return Response(
                {"detail": "Você não tem permissão para excluir este post."},
                status=status.HTTP_403_FORBIDDEN
            )

        self.perform_destroy(post)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'])
    def feed(self, request):
        user = request.user
        following_users = user.following.all()

        queryset = optimized_post_queryset().filter(
            Q(author__in=following_users) | Q(author=user)
        ).distinct()

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        post = self.get_object()
        comments = (
            Comment.objects
            .filter(post=post)
            .select_related('user', 'post')
            .order_by('-created_at')
        )
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user

        like_exists = Like.objects.filter(post=post, user=user).exists()

        if like_exists:
            Like.objects.filter(post=post, user=user).delete()
            is_liked = False
        else:
            Like.objects.create(post=post, user=user)
            is_liked = True

        total_likes = Like.objects.filter(post=post).count()

        return Response({
            'is_liked': is_liked,
            'likes_count': total_likes
        })


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        return (
            Comment.objects
            .select_related('user', 'post')
            .order_by('-created_at')
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()

        if comment.user != request.user:
            return Response(
                {"detail": "Você não tem permissão para excluir este comentário."},
                status=status.HTTP_403_FORBIDDEN
            )

        self.perform_destroy(comment)
        return Response(status=status.HTTP_204_NO_CONTENT)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.select_related('user', 'post')
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
