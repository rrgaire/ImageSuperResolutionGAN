from __future__ import print_function

import os
import numpy as np
from PIL import Image
import operator
import settings
import utils
import tensorflow as tf
from os.path import dirname as dir

# Communication to TensorFlow server via gRPC
import grpc
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2_grpc



def __get_tf_server_connection_params__():

    server_name = utils.get_env_var_setting('TF_SERVER_NAME', settings.DEFAULT_TF_SERVER_NAME)
    server_port = utils.get_env_var_setting('TF_SERVER_PORT', settings.DEFAULT_TF_SERVER_PORT)

    return server_name, server_port

def __get_model_properties__(model_type):
    if (model_type.lower() == 'generic model'):
        return settings.generic_model
    elif (model_type.lower() == 'face model'):
        return settings.face_model
    elif (model_type.lower() == 'medical model'):
        return settings.medical_model


def __create_prediction_request__(image_dict):

    # create predict request
    request = predict_pb2.PredictRequest()

    image = image_dict['image']
    image_name = image_dict['image_name']
    model_type = image_dict['model_type']
    image = np.array(image, np.float32)
    image = np.expand_dims(image, 0)

    # Call ISRGAN model to make prediction on the image
    model = __get_model_properties__(model_type)
    request.model_spec.name = model['ISRGAN_MODEL_NAME']
    request.model_spec.signature_name = model['ISRGAN_MODEL_SIGNATURE_NAME']
    request.inputs[model['ISRGAN_MODEL_INPUTS_KEY']].CopyFrom(
        tf.make_tensor_proto(image))

    return request, image_name

def __open_tf_server_channel__(server_name, server_port):

    MAX_MESSAGE_LENGTH = 50*1024*1024
    options = [('grpc.max_send_message_length', MAX_MESSAGE_LENGTH), ('grpc.max_receive_message_length', MAX_MESSAGE_LENGTH)]
    channel = grpc.insecure_channel(str(server_name)+':'+str(server_port), options = options)

    stub = prediction_service_pb2_grpc.PredictionServiceStub(channel)

    return stub

def __make_prediction_and_prepare_results__(stub, request, image_name):

    result = stub.Predict(request, 60.0).outputs['lambda_87'] # 60 secs timeout
    result_arr = tf.make_ndarray(result)
    result_arr = result_arr.reshape(result_arr.shape[1:])

    out_img = Image.fromarray(np.uint8(result_arr), 'RGB')

    return out_img

def make_prediction(image_dict):

    # get TensorFlow server connection parameters
    server_name, server_port = __get_tf_server_connection_params__()

    # open channel to tensorflow server
    stub = __open_tf_server_channel__(server_name, server_port)

    # create predict request
    request, image_name = __create_prediction_request__(image_dict)

    # make prediction
    return __make_prediction_and_prepare_results__(stub, request, image_name)
