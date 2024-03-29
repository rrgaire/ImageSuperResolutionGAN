import logging.config

import os
import settings
import utils
from flask import Flask, Blueprint
from flask_restplus import Resource, Api
from flask_cors import CORS


from api.restplus import api
from api.gan.endpoints.client import ns as gan_client_namespace

# create Flask application
application = Flask(__name__)
CORS(application)

# load logging configuration and create log object
logging.config.fileConfig(os.path.join(os.path.dirname(__file__), 'logging.conf'))
log = logging.getLogger(__name__)


def __get_flask_server_params__():

    server_name = utils.get_env_var_setting('FLASK_SERVER_NAME', settings.DEFAULT_FLASK_SERVER_NAME)
    server_port = int(utils.get_env_var_setting('FLASK_SERVER_PORT', settings.DEFAULT_FLASK_SERVER_PORT))
    flask_debug = utils.get_env_var_setting('FLASK_DEBUG', settings.DEFAULT_FLASK_DEBUG)

    flask_debug = True if flask_debug == '1' else False

    return server_name, server_port, flask_debug

def configure_app(flask_app):

    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = settings.RESTPLUS_ERROR_404_HELP


def initialize_app(flask_app):

    blueprint = Blueprint('tf_api', __name__, url_prefix='/tf_api')

    configure_app(flask_app)
    api.init_app(blueprint)
    api.add_namespace(gan_client_namespace)

    flask_app.register_blueprint(blueprint)



if __name__ == '__main__':
    server_name, server_port, flask_debug = __get_flask_server_params__()
    initialize_app(application)
    application.run(debug=flask_debug, host=server_name, port=server_port)
