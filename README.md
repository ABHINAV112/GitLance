# GitLance
Online platform for freelancers and clients to upload and solve coding related jobs


Setup instructions:-
After downloading the zip file of the code. Enter the directory called GitLance 
CD into respective directories with package.json
and run npm install in the terminal.

Docker Setup:-
Use dockerrun.aws.json to deploy docker instance on elastic beanstack to get REST API to compile code.

Extension Setup:-
Go to chrome developer tools extract package and add the extension to chrome.

Launch Server Side app:-
Change directory to server and run firebase deploy

Launch client side app:-(only for local testing) 
Change directory to client and run npm start

Please check out our application hosted on firebase: https://git-lance.firebaseapp.com

# Use an official Python runtime as a parent image
FROM ubuntu

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

EXPOSE 80

RUN apt update
RUN apt install -y apt-utils
RUN apt install -y curl
RUN apt --assume-yes install nodejs
RUN apt --assume-yes install npm
RUN apt --assume-yes install python3.6
RUN apt --assume-yes install python3-pip
RUN apt --assume-yes install build-essential
RUN apt --assume-yes install manpages-dev
RUN gcc --version
RUN g++ --version
RUN apt --assume-yes install openjdk-8-jdk
RUN java -version
RUN javac -version
