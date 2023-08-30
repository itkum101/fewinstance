FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update
RUN apt-get install -y python3.6
RUN ln -s /usr/bin/python3 /usr/bin/python
RUN apt-get install -y python3-pip
RUN apt-get update && \
    apt-get install -y libpq-dev
WORKDIR /app
COPY requirements.txt  requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 8091
CMD ["python","manage.py","runserver","0.0.0.0:8091"]
