import psycopg2


conn = psycopg2.connect(dbname = 'postgres', user = 'postgres', password = '123', host = '192.168.1.103', port = '5432')
cursor = conn.cursor()

# Распечатать сведения о PostgreSQL
print("Информация о сервере PostgreSQL")
print(conn.get_dsn_parameters(), "\n")
# Выполнение SQL-запроса
cursor.execute("SELECT version();")
# Получить результат
record = cursor.fetchone()
print("Вы подключены к - ", record, "\n")