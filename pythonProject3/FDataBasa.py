class FDataBase:
    def __init__(self, db):
        self.__db = db
        self.__cursor = db.cursor()

    def menu(self):
        quest = 'SELECT * FROM test'
        try:
            self.__cursor.execute(quest)
            res = self.__cursor.fetchall()
            if res:
                return res
        except:
            print('Ошибка подключения к БД')
        return []
