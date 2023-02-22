from flask import Flask, render_template, g, jsonify, request
from FDataBasa import FDataBase
import psycopg2
from cashbox import cashbox

app = Flask(__name__, template_folder='../assets/build', static_folder='../assets/build/static')

app.register_blueprint(cashbox, url_prefix = '/cashbox')
def connect_db():
    """Соединяемся с БД"""
    conn = psycopg2.connect(dbname='market', user='postgres', password='123', host='localhost', port='5432')
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

@app.route('/storage_list', methods = ['GET', 'POST'])
def storage_list():
    if request.method == 'POST':
        response = request.get_json()
        return jsonify(dbase.spisanie(response))
    return dbase.menu()

@app.route('/order', methods = ['POST'])
def order():
    response = request.get_json()
    column_ = response['Колонка']
    order_ = response['Сортировка']
    return dbase.order(column_, order_)


@app.route('/overrate', methods = ['POST'])
def overrate():
    response = request.get_json()
    return jsonify(dbase.overrate(response))

@app.route('/add', methods = ['POST'])
def add():
    response = request.get_json()
    return jsonify(dbase.add(response))


if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)
