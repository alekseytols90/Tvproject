import json
from os import environ
from datetime import datetime

from flask import Flask
from flask import jsonify
from flask import render_template


app = Flask(__name__)
app.config['SECRET_KEY'] = environ.get('SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'status': 'ok'})


@app.route('/api/movies', methods=['GET'])
def movies():
    with open('movies.json') as json_file:
        movies = json.load(json_file)
    return jsonify({'movies': movies})

@app.route('/api/refresh', methods=['GET'])
def refresh():
    return jsonify({'refresh': 'ok'})
