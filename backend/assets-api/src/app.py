from flask import Flask, jsonify
from flask_serverless import aws_invoke
import json

ALLOW_CORS = True

app = Flask(__name__)


@app.route('/uiapi', methods=['GET', 'HEAD', 'OPTIONS', 'POST'])
def api_root():
    return jsonify({
        "response": "Hello from API Root!"
    })


@app.route('/uiapi/', methods=['GET', 'HEAD', 'OPTIONS', 'POST'])
def subroute():
    return jsonify({
        "response": "Hello from API subroute!"
    })


def handler(event, context):
    print('received event:')
    print(event)
    #
    # return {
    #     'statusCode': 200,
    #     'headers': {
    #         'Access-Control-Allow-Headers': '*',
    #         'Access-Control-Allow-Origin': '*',
    #         'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    #     },
    #     'body': json.dumps('Hello from your new Amplify Python lambda!')
    # }

    return aws_invoke(app, event, block_headers=False, cors=ALLOW_CORS)
