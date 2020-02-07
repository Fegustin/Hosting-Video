from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from .validators import ValidateFileFormat


# Create your models here.


class Xvideo(models.Model):
    name = models.CharField(verbose_name='Название', max_length=30, null=False)
    description = models.TextField(verbose_name='Описание', max_length=1000)
    file = models.FileField(verbose_name='Видео', upload_to='video/', null=False, )
    pub_date = models.DateTimeField(verbose_name='Дата публикации', default=timezone.now)

    def __str__(self):
        return self.name


class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    video_id = models.ForeignKey(Xvideo, on_delete=models.CASCADE, default='')
    name = models.CharField(verbose_name="Имя", max_length=30)
    content = models.TextField(verbose_name='Комментарий', max_length=1000)
    pub_date = models.DateTimeField(verbose_name='Дата публикации', default=timezone.now)
