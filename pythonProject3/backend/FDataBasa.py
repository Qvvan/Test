from datetime import datetime

class FDataBase:
    def __init__(self, db):
        self.__db = db
        self.__cursor = db.cursor()

    def menu(self) -> dict:
        quest = "SELECT json_agg(json_build_object('id', pm.product_id, 'name', p.name, 'code', p.code, 'unit', p.unit, 'count', pm.count,"\
				"'price_purchase', p.price_purchase , 'price_selling', p.price_selling) ORDER BY p.id ASC)"\
                "FROM public.product_market as pm JOIN public.product p ON pm.product_id = p.id;"
        try:
            self.__cursor.execute(quest)
            res = self.__cursor.fetchone()
            if res[0]:
                return res[0]
        except:
            print('Ошибка подключения к БД')
        return {}


    def order(self, column: str, order: str) -> dict:
        """Функция сортировки столбцов"""
        self.__column = column
        self.__order = order
        if self.__order == 'Возрастание':
            self.__order = 'ASC'
        else:
            self.__order = 'DESC'
        quest = "SELECT json_agg(json_build_object('id', p.id, 'name', p.name, 'code', p.code, 'unit', p.unit, 'count', pm.count," \
                    f"'price_purchase', p.price_purchase , 'price_selling', p.price_selling) ORDER BY p{'m.' + self.__column if self.__column == 'count' else '.' + self.__column} {self.__order})" \
                    "FROM public.product_market as pm JOIN public.product p ON pm.product_id = p.id;"
        try:
            print(quest)
            self.__cursor.execute(quest)
            res = self.__cursor.fetchone()
            if res[0]:
                return res[0]
        except:
            print('Ошибка подключения к БД')
        return {}


    def spisanie(self, response: dict) -> (dict, str):
        """Функция списания товара"""
        count = response['count']
        id = response['id']
        quest = f'SELECT count FROM public.product_market WHERE product_id = {id}'
        self.__cursor.execute(quest)
        res = self.__cursor.fetchone()[0]
        if res >= 0:
            if count.isdecimal():
                try:
                    if int(count) > int(res):
                        return self.menu(), 'На складе меньше товара, чем вы хотите списать.'
                    else:
                        quest = f'UPDATE public.product_market SET count = {int(res) - int(count)} WHERE product_id = {id}'
                        self.__cursor.execute(quest)
                        self.__db.commit()
                        return self.menu(), 'Списание выполнено'
                except:
                    return 'Ошибка подключения к Базе данных'
            else:
                return self.menu(), 'Количетсво введено неверно'
        else:
            return self.menu(), 'Товар не найден'


    def overrate(self, response: dict) -> (dict, str):
        """Функция переоценки товара"""
        id = response['id']
        price_selling = response['Новая цена']
        if id and int(price_selling) >= 0:
            try:
                quest = f'UPDATE public.product SET price_selling = {price_selling} WHERE id = {id}'
                self.__cursor.execute(quest)
                self.__db.commit()
                return self.menu(), 'Товар переоценён'
            except:
                print("Ошибка подключения к Базе данных")
        else:
            return self.menu(), 'Ошибка'

    def add(self, response):
        name = response['name']
        units = response['units']
        article = response['article']
        price_purchase = response['price_purchase']
        price_selling = response['price_selling']
        category_id = 1
        data_start = "now()::timestamp"
        data_end = "now()::timestamp + interval '0.6 years'"
        quest = f"INSERT INTO public.product (name, unit, code, price_purchase, price_selling, date_start, date_end, category_id)" \
                f"VALUES('{name}', '{units}', '{article}', {price_purchase}, {price_selling}, {data_start}, {data_end}, {category_id})"
        print(quest)

        try:
            self.__cursor.execute(quest)
            self.__db.commit()
            print('Все гуд')
            return 'Товар создан'
        except:
            print('Ошибка с базой данных')
            return 'Ошибка с бд'
            

