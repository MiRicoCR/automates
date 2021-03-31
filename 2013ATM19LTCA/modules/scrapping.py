#coding=utf-8

from selenium import webdriver
import pandas as pd
from time import sleep
from datetime import date, datetime
from os.path import isfile
import os
import shutil

class Scrapper:

    def __init__(self):

        self.date = date(2021, 3, 30)
        self.webSite = webdriver.Chrome('./chromedriver')

    def loginSite(self):

        self.webSite.get("https://www.wansoft.net/Wansoft.Web")
        
        self.webSite.find_element_by_id("UserName").send_keys("MiRico")
        self.webSite.find_element_by_id("Password").send_keys("ISC18mr9")

        self.webSite.find_element_by_class_name("btn-primary").click()

    def disconectSite(self):

        self.webSite.close()

    def scrapeSite(self, uuid):

        self.webSite.get("https://www.wansoft.net/Wansoft.Web/Inventory/PurchaseOrders")

        sleep(4)

        storeTag = self.webSite.find_element_by_xpath("//select[@name='Subsidiary']/option[@value='{code}']".format(code=uuid))
        storeTag.click()

        sleep(4)

        self.webSite.execute_script("document.getElementById('startDate').value = '{iFecha}'".format(iFecha=str(self.date)))
        self.webSite.execute_script("document.getElementById('endDate').value = '{fFecha}'".format(fFecha=str(self.date)))
        self.webSite.find_element_by_id("btnSearch").click()

        sleep(4)

        # Download files
        tableData = self.webSite.find_element_by_xpath("//table[@aria-labelledby='gbox_purchaseOrderList-grid']")
        orders = tableData.find_elements_by_xpath("//tr[@role='row']")

        for row in orders[2:]:
            
            referencia = row.find_element_by_xpath(".//td[@aria-describedby='purchaseOrderList-grid_OrderReference']").text
            fecha = row.find_element_by_xpath(".//td[@aria-describedby='purchaseOrderList-grid_PurchaseOrderDate']").text
            fecha = fecha.split(" ")[0]
            fecha = fecha.split("-")[2]
            store = self.webSite.find_element_by_xpath("//option[@value={Y}]".format(Y=uuid)).text
            store = store.split(" - ")[1]
            estatus = row.find_element_by_xpath(".//td[@aria-describedby='purchaseOrderList-grid_Status']").text

            fname = "{F}. {S} {R} {E}".format(S=store, F=fecha, R=referencia, E=estatus)
            
            actions = row.find_element_by_xpath(".//td[@aria-describedby='purchaseOrderList-grid_Actions']")
            #div = actions.find_element_by_tag_name("div")
            export = actions.find_element_by_xpath(".//img[@title='Exportar Excel']")
                       
            export.click()

            sleep(8)

            oldFileName = "C:/Users/misae/Downloads/OC_{R}.xls".format(R=referencia)
            newFileName = "C:/Users/misae/Downloads/{N}.xlsx".format(N=fname)
            os.rename(r"C:/Users/misae/Downloads/OC_{R}.xls".format(R=referencia),r"C:/Users/misae/Downloads/{N}.xlsx".format(N=fname))

            newPath = "C:/Users/misae/OneDrive/Escritorio/Ordenes de Compra/{F}.xlsx".format(F=fname)
            shutil.move(newFileName, newPath)
            
    def startProcess(self):
        UUID = ["1289", "1832", "1620", "1288", "1292", "1290", "1297", "1298", "1291", "1417", "1237", "2684", "2327", "1831", "2745", "2018", "3258", "3356", "3256", "3257", "3355", "1287", "1285", "1316", "4596", "4407","1327", "1301", "1319", "1307", "1322", "1313", "1314", "1317", "1328", "1305", "2279", "3667", "1320", "1312", "1381", "1308", "1341", "1300", "2326", "1323", "3668", "1299", "1414", "1318", "2278", "1321", "1273", "2936", "1326", "1304"]

        for code in UUID:
            self.scrapeSite(code)
            sleep(2)

        self.disconectSite()


Obj = Scrapper()
Obj.loginSite()
Obj.startProcess()
