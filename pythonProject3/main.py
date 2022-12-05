from flask import Flask, render_template, url_for, request, redirect, g
import psycopg2
from FDataBasa import FDataBase

app = Flask(__name__)

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
    return render_template('account.html', full_name = dbase.menu())



if __name__ == "__main__":
    app.run(debug=True)