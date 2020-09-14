import io
import numpy as np
from scipy import misc
from PIL import Image
import json
import jsonpickle

from flask import request
from flask_restplus import Resource
from api.restplus import api
from api.gan.logic.tf_serving_client import make_prediction
from werkzeug.datastructures import FileStorage


# create dedicated namespace for GAN client
ns = api.namespace('isrgan_client', description='Operations for ISRGAN client')

# Flask-RestPlus specific parser for image uploading
UPLOAD_KEY = 'image'
UPLOAD_LOCATION = 'files'
upload_parser = api.parser()
upload_parser.add_argument(UPLOAD_KEY,
                           location=UPLOAD_LOCATION,
                           type=FileStorage,
                           required=True)


@ns.route('/prediction')
class GanPrediction(Resource):
    @ns.doc(description='Upscales the Resolution of Images. ' +
            'Returns an Upscaled Image ',
            responses={
                200: "Success",
                400: "Bad request",
                500: "Internal server error"
                })
    @ns.expect(upload_parser)
    def post(self):

        try:

            image_file = request.files[UPLOAD_KEY]
            image_name = image_file.filename
            image_file = Image.open(image_file)

            image_dict = {'image': image_file, 'image_name': image_name}


        except Exception as inst:
            return {'message': 'something wrong with incoming request. ' +
                               'Original message: {}'.format(inst)}, 400



        try:
            results = make_prediction(image_dict)
            results = jsonpickle.encode(results)
            # print(results)
            return {'prediction_result': results}, 200

        except Exception as inst:
            return {'message': 'internal error: {}'.format(inst)}, 500
