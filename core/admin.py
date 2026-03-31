from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Post, Comment, Like

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Informações Adicionais (Clone do X)', {'fields': ('bio', 'profile_picture', 'following')}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)