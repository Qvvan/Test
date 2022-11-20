from flask import Flask, render_template, url_for, request, redirect
import psycopg2

app = Flask(__name__)

conn = psycopg2.connect(dbname = 'postgres', user = 'postgres', password = '123', host = '25.66.55.215', port = '5432')
cursor = conn.cursor()


@app.route('/', methods = ['POST', 'GET'])
def login():
    if request.form.get('lol'):
        id = request.form.get('id')
        name = request.form.get('name')
        if id and name:
            cursor.execute("""INSERT INTO test(id,name) values(%s,'%s')""" % (id,name))
            conn.commit()
    cursor.execute('SELECT * from test')
    record = cursor.fetchall()
    return render_template('account.html', full_name=record)

if __name__ == "__main__":
    app.run(debug=True)