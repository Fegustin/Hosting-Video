from django.shortcuts import render
from django.http import JsonResponse


from .models import Xvideo, Comment


# Create your views here.


def index(request):
    if request.method == 'POST' and request.is_ajax():
        response_data = {}

        comment_under_the_video = Comment(
            user=request.user,
            video=Xvideo.objects.get(pk=request.POST.get('video')),
            content_text=request.POST.get('comment')
        )
        comment_under_the_video.save()

        response_data['result'] = 'Create post successful!'
        response_data['user'] = comment_under_the_video.user.username
        response_data['comment'] = comment_under_the_video.content_text
        response_data['date'] = comment_under_the_video.pub_date

        return JsonResponse(response_data)

    if request.method == "GET":
        file_list = Xvideo.objects.all()

        context = {'videos': file_list}

        return render(request, 'videoHosting/index.html', context)
