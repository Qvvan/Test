from flask import Blueprint, g

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
    return 'cashbox'