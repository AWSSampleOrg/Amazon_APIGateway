FROM python:3.9
RUN mkdir /cognito
COPY . /cognito
RUN pip install awscli boto3 warrant
EXPOSE 80
WORKDIR /cognito