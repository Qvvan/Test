from flask import Flask, render_template, g, jsonify, request
from FDataBasa import FDataBase
import psycopg2
from cashbox import cashbox

app = Flask(__name__, template_folder='../frontend/app', static_folder='../frontend/app/static')


app.register_blueprint(cashbox, url_prefix = '/cashbox')
def connect_db():
    """Соединяемся с БД"""
    conn = psycopg2.connect(dbname='test_market_db', user='postgres', password='123', host='25.66.55.215', port='5432')
    return conn

def get_db():
    """Возвращаем объект с БД"""
    if not hasattr(g, '_database'):
        g._database = connect_db()
    return g._database


dbase = None
@app.before_request
def before_request():
    """Соединение с БД перед выполнением запроса"""
    global dbase
    db = get_db()
    dbase = FDataBase(db)

@app.teardown_appcontext
def close_db(error):
    """"ЗАКРЫВАЕМ соединение с БД"""
    if hasattr(g, '_database'):
        g._database.close()

@app.route('/', methods = ['GET'])
def login():
    return render_template('index.html')

@app.route('/add', methods = ['GET', 'POST'])
def add():
    if request.method == 'POST':
        print(request.get_json())
        return jsonify('ok')
    return dbase.menu()

@app.route('/order', methods = ['GET'])
def order():
    response = request.get_json()
    column_ = response['Колонка']
    order_ = response['Сортировка']
    return dbase.order(column_,order_)


if __name__ == "__main__":
    app.run(debug=True)