from rest_framework import serializers
from .models import User, Post, Comment, Like

class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

        read_only_fields = ('last_login', 'date_joined', 'is_superuser', 'is_staff', 'is_active', 'groups', 'user_permissions')

        extra_kwargs = {
            'password': {'write_only': True} 
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        
        if password:
            user.set_password(password)
            user.save()
            
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        
        user = super().update(instance, validated_data)
        
        if password:
            user.set_password(password)
            user.save()
            
        return user 

    def get_followers_count(self, obj):
        return len(obj.followers.all())

    def get_following_count(self, obj):
        return len(obj.following.all())

    def get_is_following(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return any(
            follower.id == request.user.id for follower in obj.followers.all()
        )

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comment
        fields = ['id', 'user', 'author_username', 'post', 'content', 'created_at']
        read_only_fields = ['user']

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'author_username', 'content', 'created_at', 'likes_count', 'comments_count', 'is_liked']
        read_only_fields = ['author']

    def get_likes_count(self, obj):
        return len(obj.likes.all())

    def get_comments_count(self, obj):
        return len(obj.comments.all())

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return any(
            like.user_id == request.user.id for like in obj.likes.all()
        )

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'created_at']
        read_only_fields = ['user', 'post']