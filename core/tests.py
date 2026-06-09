from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Post

User = get_user_model()

class PostInteractionTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='bruno_tester', password='senhaforte123')
        
        self.client.force_authenticate(user=self.user1)
        
        self.post = Post.objects.create(author=self.user1, content='Post automatizado de teste')

    def test_create_post(self):
        url = '/api/posts/'
        data = {'content': 'Testando a criação de um novo post!'}
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)
        self.assertEqual(response.data['content'], 'Testando a criação de um novo post!')

    def test_like_and_unlike_post(self):
        url = f'/api/posts/{self.post.id}/like/'
        
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['is_liked'])
        self.assertEqual(response.data['likes_count'], 1)

        response_unlike = self.client.post(url)
        
        self.assertEqual(response_unlike.status_code, status.HTTP_200_OK)
        self.assertFalse(response_unlike.data['is_liked'])
        self.assertEqual(response_unlike.data['likes_count'], 0)

class UserAndCommentTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='bruno', password='123')
        self.user2 = User.objects.create_user(username='dafny', password='123')
        
        self.client.force_authenticate(user=self.user1)
        
        self.post_dafny = Post.objects.create(author=self.user2, content='Post da Dafny')

    def test_comment_on_post(self):
        url = '/api/comments/'
        data = {'post': self.post_dafny.id, 'content': 'Ótima postagem!'}
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['content'], 'Ótima postagem!')
        self.assertEqual(response.data['author_username'], 'bruno')

    def test_follow_and_unfollow_user(self):
        follow_url = f'/api/users/{self.user2.username}/follow/'
        response_follow = self.client.post(follow_url)
        
        self.assertEqual(response_follow.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user1.following.count(), 1)
        self.assertEqual(self.user2.followers.count(), 1)

        unfollow_url = f'/api/users/{self.user2.username}/unfollow/'
        response_unfollow = self.client.post(unfollow_url)

        self.assertEqual(response_unfollow.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user1.following.count(), 0)

class AuthenticationTests(APITestCase):
    def test_user_registration(self):
        url = '/api/users/'
        data = {
            'username': 'novousuario',
            'email': 'novousuario@example.com',
            'password': 'senhaforte123'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='novousuario').exists())

    def test_user_login(self):
        User.objects.create_user(username='loginuser', password='loginpass123')
        
        url = '/api/token/'
        data = {
            'username': 'loginuser',
            'password': 'loginpass123'
        }
        response = self.client.post(url, data)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)