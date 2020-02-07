import os
from django.conf import settings
from django.templatetags.static import static
from django.shortcuts import render

from .models import Xvideo

# Create your views here.


def index(request):
    img_list = Xvideo.objects.all()
    context = {'videos': img_list}
    return render(request, 'videoHosting/index.html', context)
