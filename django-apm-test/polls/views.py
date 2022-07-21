import time
from random import randrange

from django.http import HttpResponse

def forceError():
    i = 1 / 0

def index(request):
    if request.GET.get("force500") != None:
        forceError()
    time.sleep(randrange(20) / 10)
    return HttpResponse("Hello world from polls")