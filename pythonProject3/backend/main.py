from flask import Flask, render_template, g, jsonify
from FDataBasa import FDataBase
import psycopg2

app = Flask(__name__, template_folder='../frontend/app', static_folder='../frontend/app/static')

def connect_db():
    """Соединяемся с БД"""
    conn = psycopg2.connect(dbname='postgres', user='postgres', password='123', host='25.66.55.215', port='5432')
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

@app.route('/')
def login():
    # return render_template('./../frontend/app/index.html', full_name = dbase.menu())
    return render_template('index.html')

@app.route('/add', methods = ['GET'])
def add():
    # return render_template('./../frontend/app/index.html', full_name = dbase.menu())
    print(dbase.menu())
    return jsonify(dbase.menu())


if __name__ == "__main__":
    app.run(debug=True)