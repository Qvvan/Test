class FDataBase:
    def __init__(self, db):
        self.__db = db
        self.__cursor = db.cursor()

    def menu(self) -> dict:
        quest = "SELECT json_agg(json_build_object('id', p.id, 'name', p.name, 'code', p.code, 'unit', p.unit, 'count', pm.count,"\
				"'price_purchase', p.price_purchase , 'price_selling', p.price_selling))"\
                "FROM public.product_market as pm JOIN public.product p ON pm.product_id = p.id;"

        try:
            self.__cursor.execute(quest)
            res = self.__cursor.fetchone()
            if res[0]:
                return res[0]
        except:
            print('Ошибка подключения к БД')
        return []


    def order(self, column: int, order: str) -> dict:
        self.__column = column
        self.__order = order
        if self.__order == 'Возрастание':
            self.__order = 'ASC'
        else:
            self.__order = 'DESC'
        if self.__column == 'count':
            quest = "SELECT json_agg(json_build_object('id', p.id, 'name', p.name, 'code', p.code, 'unit', p.unit, 'count', pm.count," \
                    f"'price_purchase', p.price_purchase , 'price_selling', p.price_selling) ORDER BY pm.{self.__column} {self.__order})" \
                    "FROM public.product_market as pm JOIN public.product p ON pm.product_id = p.id;"
        else:
            quest = "SELECT json_agg(json_build_object('id', p.id, 'name', p.name, 'code', p.code, 'unit', p.unit, 'count', pm.count," \
                    f"'price_purchase', p.price_purchase , 'price_selling', p.price_selling) ORDER BY p.{self.__column} {self.__order})" \
                    "FROM public.product_market as pm JOIN public.product p ON pm.product_id = p.id;"
        try:
            self.__cursor.execute(quest)
            res = self.__cursor.fetchone()
            if res[0]:
                return res[0]
        except:
            print('Ошибка подключения к БД')
        return []
