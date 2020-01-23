from django.db import models

from .validators import ValidateFileFormat


# Create your models here.


class Xvideo(models.Model):
    name = models.CharField('Название', max_length=30, null=False)
    description = models.TextField('Описание', max_length=1000)
    file = models.FileField('Видео', upload_to='media/', null=False,
                            validators=[ValidateFileFormat(content_types='video/mp4')])
    pub_date = models.DateTimeField('Дата публикации')

    def __str__(self):
        return self.name


class Users(models.Model):
    name = models.CharField('Имя пользователя', max_length=30, null=False)
    password = models.CharField('Пароль', max_length=30)
    email = models.EmailField('Адрес электронной почты')

    def __str__(self):
        return self.name


class Comments(models.Model):
    comment = models.TextField('Комментарий', max_length=1000, null=False)
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
    xvideo = models.ForeignKey(Xvideo, on_delete=models.CASCADE)

    def __str__(self):
        return self.users.name
