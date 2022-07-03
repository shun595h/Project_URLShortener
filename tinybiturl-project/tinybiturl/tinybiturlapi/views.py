from asyncio import constants
import random
import string

import qrcode
from PIL import Image
import sys,os
import shutil

from django.http import HttpResponse, HttpResponseNotFound
from django import urls
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import URLs
from .serializers import URLsSerializer
# Create your views here.


topath = "/tinybiturl-front/public/Images"

@api_view(['GET'])
def storedUrls(request):
    rdata = URLs.objects.all()
    serializer = URLsSerializer(rdata, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def genshorturl(request):
    data = request.data
    shorturl = randomize()
    longurl = data['longurl']
    qr = savedata(longurl,shorturl)
    return Response({'longurl': longurl, 'shorturl': shorturl, 'QR': qr})


def redirectUrl(request, urlshort):
    try:
        obj = URLs.objects.get(urlshort=urlshort)
    except URLs.DoesNotExist:
        obj = None

    if obj is not None:
        return redirect(obj.urllong)
    else:
        return HttpResponseNotFound("<h1>SHORT URL ENTERED IS NOT FOUND<h1><br>go back to http://localhost:3000")

def randomize():
    letters = string.ascii_lowercase+string.ascii_uppercase
    while True:
        randomletters = random.choices(letters, k=5)
        randomletters = "".join(randomletters)
        generatedshort = randomletters
        print(generatedshort)
        try:
            new_urlexist = URLs.objects.get(urlshort=generatedshort)
            if not new_urlexist:
                return generatedshort
        except:
            return generatedshort

def makeqr(url):
    qr = qrcode.QRCode(
        version=1,
        box_size=15,
        border=5
    )#works but cannot retrieve images
    data = url
    qr.add_data("localhost:8000/"+data)
    qr.make(fit=True)
    img = qr.make_image(fill='black', back_color='white')
    imgname = url+'.png'
    #img.save(imgname)
    localdirparth = os.path.abspath(os.getcwd())
    #shutil.move(localdirparth+"/"+imgname, "/Images")
    return imgname

def savedata(longurl,shorturl):#,qr):
    qrn=makeqr(shorturl) 
    success = URLs.objects.create(
        urllong=longurl,
        urlshort=shorturl,QRphotoname=qrn
    )
   # if not success:
    #    os.remove("Images/"+qrn)

   
    
    return shorturl