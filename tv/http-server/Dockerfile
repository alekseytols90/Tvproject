from ubuntu:latest

run apt-get update
run apt-get install -y software-properties-common
run apt-add-repository ppa:dotz/nginx-with-push-stream-module
run apt-get install -y nginx

stopsignal SIGTERM
cmd ["nginx", "-g", "daemon off;"]
expose 80
