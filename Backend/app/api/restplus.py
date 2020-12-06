
from flask_restplus import Api
import settings


# create Flask-RestPlus API
api = Api(version='1.0',
          title='ISRGSN TensorFlow Serving REST Api',
          description='RESTPlus API wrapper for TensorFlow Serving client')


# define default error handler
@api.errorhandler
def default_error_handler(error):

    message = 'Unexpected error occured: {}'.format(error.specific)

    if not settings.DEFAULT_FLASK_DEBUG:
        return {'message': message}, 500
