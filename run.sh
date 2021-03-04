#!/bin/sh

# source this file after giving sudo permission


# conda deactivate
# source ./env/bin/activate

docker_image=$"rrg11/isrgan"
docker stop $(docker ps -aq --filter ancestor="$docker_image")
docker run -d $docker_image
echo $(docker ps --latest)
container_id=$(docker ps --latest --filter ancestor="$docker_image" -q | xargs)
echo $container_id
docker exec $container_id /bin/bash -c 'tensorflow_model_server --port=9000 --model_name=my_model --model_base_path=/models/my_model &> srgan_log &'

echo $(docker network inspect bridge | grep IPv4Address)

cd ./Backend/app
echo "all done here!"
python app.py


