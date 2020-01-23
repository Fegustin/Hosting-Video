from django.urls import path

from . import views

app_name = 'videoHosting'
urlpatterns = [
    path('', views.index, name='index'),
]
