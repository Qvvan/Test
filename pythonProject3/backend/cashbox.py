from flask import Blueprint, g, jsonify, render_template, redirect

cashbox = Blueprint('cashbox', __name__)

db = None
@cashbox.before_request
def before_request():
    global db
    db = g.get('_database')

@cashbox.teardown_request
def teardown_request(request):
    global db
    db = None
    return request

@cashbox.route('/')
def index():
    return render_template('page1.html')