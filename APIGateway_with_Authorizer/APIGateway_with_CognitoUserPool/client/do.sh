#!/bin/bash

if [ -z $1 ] ; then
    echo "Give me docker command parameter"
    exit 1
fi

readonly profile_name="default" 2> /dev/null
readonly AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text --profile ${profile_name}) 2> /dev/null
readonly REGION=$(aws configure get region --profile ${profile_name}) 2> /dev/null
readonly image_name="cognito:latest" 2> /dev/null

function blue()
{
    echo -e "\033[34m${1}\033[0m"
}

if [ "build" = $1 ] ; then
	blue "Build Docker Images"
	docker image build -t ${image_name} .

elif [ "exec" = $1 ] ; then
	blue "Execute Docker container"
	docker container exec -it ${CONTAINER_ID} sh

elif [ "rmc" = $1 ] ; then
	blue "Remove All Docker Containers"
	docker container ps -aq | xargs docker container rm -f

elif [ "rmi" = $1 ] ; then
	blue "Remove All Docker Images"
	docker image ls -aq | xargs docker image rm -f

elif [ "run" = $1 ] ; then
	blue "Run Docker container"
	CONTAINER_ID=$(docker container run -itd -p 80:80 ${image_name})

fi
