from flask import Flask, request, jsonify
from werkzeug.http import parse_options_header
from flask_serverless import aws_invoke

app = Flask(__name__)


# class Config(object):
#     DEBUG = True

# app.config.from_object('test_aws.Config')

@app.route('/asset-api')
@app.route('/asset-api/')
def assets_root():
    return 'Hello from api!'


@app.route('/asset-api/get')
def assets_get():
    return 'Hello from asset get!'


@app.route('/asset-api/echo', methods=['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
def assets_echo():
    obj = {
        'method': request.method,
        'headers': dict(request.headers)
    }
    if request.method == 'POST' or request.method == 'PUT':
        contentType = parse_options_header(request.headers.get('Content-Type', 'application/octet-stream'))
        encoding = contentType[1].get('charset', 'utf-8')
        obj['data'] = request.data.decode(encoding)
    return jsonify(obj)


@app.route('/echo', methods=['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
def echo():
    obj = {
        'method': request.method,
        'headers': dict(request.headers)
    }
    if request.method == 'POST' or request.method == 'PUT':
        contentType = parse_options_header(request.headers.get('Content-Type', 'application/octet-stream'))
        encoding = contentType[1].get('charset', 'utf-8')
        obj['data'] = request.data.decode(encoding)
    return jsonify(obj)


def lambda_handler(event, context):
    return aws_invoke(app, event, block_headers=False)
