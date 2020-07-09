from __future__ import print_function

import os
import numpy as np
from PIL import Image
import operator
import logging
import settings
import utils
import tensorflow as tf

# Communication to TensorFlow server via gRPC
import grpc
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2_grpc


log = logging.getLogger(__name__)

def __get_tf_server_connection_params__():
    
    server_name = utils.get_env_var_setting('TF_SERVER_NAME', settings.DEFAULT_TF_SERVER_NAME)
    server_port = utils.get_env_var_setting('TF_SERVER_PORT', settings.DEFAULT_TF_SERVER_PORT)

    return server_name, server_port

def __create_prediction_request__(image):
    
    # create predict request
    request = predict_pb2.PredictRequest()

    image = np.array(image, np.float32)
    image = np.expand_dims(image, 0)

    # Call ISRGAN model to make prediction on the image
    request.model_spec.name = settings.GAN_MODEL_NAME
    request.model_spec.signature_name = settings.GAN_MODEL_SIGNATURE_NAME
    request.inputs[settings.GAN_MODEL_INPUTS_KEY].CopyFrom(
        tf.make_tensor_proto(image))

    return request

def __open_tf_server_channel__(server_name, server_port):
    
    MAX_MESSAGE_LENGTH = 50*1024*1024
    options = [('grpc.max_send_message_length', MAX_MESSAGE_LENGTH), ('grpc.max_receive_message_length', MAX_MESSAGE_LENGTH)]
    channel = grpc.insecure_channel(str(server_name)+':'+str(server_port), options = options) 
    
    stub = prediction_service_pb2_grpc.PredictionServiceStub(channel)
	
    return stub

def __make_prediction_and_prepare_results__(stub, request):
    
    result = stub.Predict(request, 60.0).outputs['lambda_87'] # 60 secs timeout
    result_arr = tf.make_ndarray(result)
    result_arr = result_arr.reshape(result_arr.shape[1:])
        
    out_img = Image.fromarray(np.uint8(result_arr), 'RGB')
    out_img.save('my3.jpg')
    print('Success')
    
    

    return out_img

def make_prediction(image):
    
    # get TensorFlow server connection parameters
    server_name, server_port = __get_tf_server_connection_params__()
    log.info('Connecting to TensorFlow server %s:%s', server_name, server_port)

    # open channel to tensorflow server
    stub = __open_tf_server_channel__(server_name, server_port)

    # create predict request
    request = __create_prediction_request__(image)

    # make prediction
    return __make_prediction_and_prepare_results__(stub, request)
