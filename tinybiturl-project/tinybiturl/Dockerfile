FROM python:3.9

LABEL maintainer="HSH"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /tinybiturl

RUN pwd

COPY requirements.txt ./

RUN pip install -U pip

RUN pip install -r requirements.txt

RUN pip install qrcode

COPY . /tinybiturl
# . / is the current directory
COPY tinybiturl tinybiturl

EXPOSE 8000

CMD ["manage.py", "runserver", "0.0.0.0:8000"]

