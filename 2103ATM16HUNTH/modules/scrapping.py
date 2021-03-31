from datetime import datetime, timedelta, date
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep

"""
    DOCUMENTACIÓN
"""

class Scrapping:

    def __init__(self, username, password):
        self.__usr = username
        self.__pwd = password
        self.Driver = webdriver.Chrome("./addings/chromedriver")

    def connect(self):

        self.Driver.get("https://www.wansoft.net/Wansoft.Web")

        # Escribir usuario y contraseñas en la página.
        self.Driver.find_element_by_id("UserName").send_keys(self.__usr)
        self.Driver.find_element_by_id("Password").send_keys(self.__pwd)

        # Dar click en el botón de iniciar sesión.
        self.Driver.find_element_by_class_name("btn-primary").click()

    def downloadSite(self):

        self.Driver.get("https://www.wansoft.net/Wansoft.Web/Reports/ConsolidatedSalesMasterReport")

        # Listas de sucursales
        Corporativas = ["2684", "2327", "1289", "1285", "1316", "1832", "3258", "3356", "1620", "1288", "3256", "1287", "1292", "1831", "2745", "1290", "1297", "3257", "1298", "1291", "1417", "2018", "1237", "3355", "4407", "4596"]
        Franquicias = ["1327", "1301", "1319", "1322", "1313", "1314", "1317", "1328", "1305", "2279", "3667", "1320", "1381", "1308", "1341", "1300", "2326", "1323", "3668","1299", "1318", "4711", "2278", "1321", "1273", "2936", "1304"]

        sucursales = Corporativas
        #sucursales = ["1327"]

        # Arreglo para guardar los datos de cada sucursal
        datalist = []

        for name in sucursales:

            # Seleccionar tiendas
            store_selection = "//select[@id='Subsidiary']/option[@value='{store_uuid}']".format(store_uuid=name)
            self.Driver.find_element_by_xpath(store_selection).click()

            # Esperar a que carge la página.
            sleep(3)

            # Poner los filtros de fechas.
<<<<<<< HEAD
            self.sDate = date(2021, 3, 22)
=======
            self.sDate = date(2021, 3, 28)
>>>>>>> d115b1f032e56d7d7ec2a616483141f04c708ef5
            start_filter_date = "document.getElementById('startDate').setAttribute('value', '{filter}')".format(filter=str(self.sDate))
            end_filter_date = "document.getElementById('endDate').setAttribute('value', '{filter}')".format(filter=str(self.sDate))
            self.Driver.execute_script(start_filter_date)
            self.Driver.execute_script(end_filter_date)

            # Aplicar filtros
            self.Driver.find_element_by_id("applyFilter").click()

            # Esperar a que se apliquen los filtros en la página.
            sleep(3)

            datalist.append(self.extractData(name))
            sleep(2)

        filePath = "/Users/goldenfield/Documents/Backups/Contabilidad/Cedulas/{fileName}-RH.csv".format(fileName=str(self.sDate))
        #filePath = "/Users/goldenfield/Documents/Backups/Contabilidad/Cedulas/{fileName}-RH.csv".format(fileName=str(self.sDate))
        logData = pd.DataFrame(datalist)
        logData.to_csv(filePath, header=True, index=False, index_label=False, encoding='utf-8-sig')

        self.Driver.quit()

        return filePath, self.sDate


    def extractData(self, store):
        Soup = BeautifulSoup(self.Driver.page_source, "html.parser")

        # Diccionario para guardar la colección de los datos de la sucursal.
        collection = {}

        # Guardar el nombre de la tienda
        storeName = Soup.find("option", {"value": "{code}".format(code=store)}).get_text()
        storeName = storeName.split(" - ")
        storeName = storeName[1]

        # Agregar como primer columna el nombre de la sucursal a la que pertenece el resto de valores.
        collection.update({"store_name": storeName})

        # Finally get the resume info
        collection.update({"Subtotal": self.__clean_amount(Soup.find("span", {"id": "SubtotalSalesAmount"}).get_text())})

        return collection

    def __clean_amount(self, amount):
        aux = amount[1:]
        return aux.replace(",", "")

    def setDates(self):

        currentDay = int(datetime.now().day)
        currentMonth = int(datetime.now().month)
        currentYear = int(datetime.now().year)

        if currentDay > 15:
            self.sDate = date(currentYear, currentMonth, 1)
            self.fDate = date(currentYear, currentMonth, 15)
        else:
            self.sDate = date(currentYear, currentMonth, 16)
            self.fDate = date(currentYear, currentMonth+1 , 1) - timedelta(days=1)