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
        self.assertTrue(response.data['liked'])
        self.assertEqual(response.data['likes_count'], 1)

        response_unlike = self.client.post(url)
        
        self.assertEqual(response_unlike.status_code, status.HTTP_200_OK)
        self.assertFalse(response_unlike.data['liked'])
        self.assertEqual(response_unlike.data['likes_count'], 0)