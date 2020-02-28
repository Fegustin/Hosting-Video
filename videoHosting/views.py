import json
from django.shortcuts import render, HttpResponseRedirect, HttpResponse
from django.http import JsonResponse

from .forms import CommentForm
from .models import Xvideo, Comment


# Create your views here.


def index(request):
    if request.method == 'POST':

        form_comment = CommentForm(request.POST)
        ajax_comment = request.POST.get('comment')

        if form_comment.is_valid():

            form_comment = form_comment.save(commit=False)
            form_comment.user = request.user
            # form_comment.content_text = ajax_comment
            form_comment.video = Xvideo.objects.get(pk=request.POST["video"])
            form_comment.save()

            return HttpResponseRedirect(request.path_info)

    else:
        form_comment = CommentForm()

    if request.method == "GET":
        file_list = Xvideo.objects.all()

        context = {'videos': file_list,
                   'form_comment': form_comment}

        return render(request, 'videoHosting/index.html', context)
