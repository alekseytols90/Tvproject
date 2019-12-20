HOW TO INSTALL THIS PROJECT:
# ==============================================================================
# install docker
# https://docs.docker.com/v17.09/engine/installation/linux/docker-ce/ubuntu/
# ==============================================================================
sudo apt-get update

sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo add-apt-repository "mywork"

sudo apt-get update

sudo apt-get install docker-ce

# ==============================================================================
# install docker-compose
# https://docs.docker.com/compose/install/
# ==============================================================================
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose


# ==============================================================================
# check versions
# ==============================================================================
docker -v
docker-compose -v

# ==============================================================================
# clone repo
# ==============================================================================
git clone git@bitbucket.org:zhorzh/tv.git
zhorzh.alexandr@gmail.com

# ==============================================================================
# build and run docker container
# ==============================================================================
sudo docker-compose up



HOW TO STOP THIS PROJECT:
# ==============================================================================
# stop docker container
# ==============================================================================
sudo docker-compose down
