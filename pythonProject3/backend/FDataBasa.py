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


    def spisanie(self, response: dict):
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
                    return self.menu(), 'Ошибка подключения к Базе данных'
            else:
                return self.menu(), 'Количетсво введено неверно'
        else:
            return self.menu(), 'Товар не найден'