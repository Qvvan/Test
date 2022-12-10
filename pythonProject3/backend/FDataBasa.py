class FDataBase:
    def __init__(self, db):
        self.__db = db
        self.__cursor = db.cursor()

    def menu(self):
        quest = 'SELECT p.id, p.name, p.code, p.unit, pm.count, p.price_purchase ,p.price_selling ' \
                'FROM public.product_market as pm JOIN public.product p ON pm.product_id = p.id;'
        try:
            self.__cursor.execute(quest)
            res = self.__cursor.fetchall()
            if res:
                return res
        except:
            print('Ошибка подключения к БД')
        return []
