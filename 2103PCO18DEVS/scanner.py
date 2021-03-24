from datetime import date, datetime, timedelta
import pandas as pd
import json

class Scanner:

    def __init__(self):
        self.WansoftFile = "C:/Users/misae/Downloads/ReporteDetalleDeVentas20210323.xls"
        self.TableFile = pd.read_excel(self.WansoftFile, sheet_name="Detalle de ventas", header=8, usecols="D,E,G,L,N,T,U,V,Z,AA,AB,AC,AE,AD,AG,AM")
        self.Data = {}
        self.OutputFile = "C:/Users/misae/OneDrive/Escritorio/Códigos/ventas-gral/Reporte"

    def searchRows(self, UUID):
        self.Data['record'] = []

        for index in self.TableFile.index:
            accionCol = str(self.TableFile['Acción'][index]).strip().lower()
            modiferCol = str(self.TableFile['Modificador'][index]).strip().lower()

            if ('venta' in accionCol) and ('nan' in modiferCol):
                self.pushProduct(index, UUID)
        
        with open('data.txt', 'w') as finalFile:
            json.dump(self.Data, finalFile)

    def pushProduct(self, idx, uuid):

        auxGroup = str(self.TableFile['Grupo'][idx]).split(" ")
        auxProducto = str(self.TableFile['Platillo / Artículo'][idx]).strip().lower
        strGroup = auxGroup[0].strip().title()

        groupsOn = ['Samurai', 'Ninja', 'Sensei', 'Sumo', 'Geisha', 'Rockster']
        seasonOn = ['red velvet p', 'red velvet r', 'red velvet m']

        if (strGroup in groupsOn) or (auxProducto in seasonOn):
            modalidad, leche, endulzante, tapioca, toppings = self.getProductDetails(idx)

            self.Data['record'].append({
                'id': 'UXC18',
                'tipo': 'Bebidas',
                'familia': strGroup,
                'producto': self.getProductName(idx),
                'tamanio': self.getProductSize(idx),
                'modalidad': modalidad,
                'leche': leche,
                'endulzante': endulzante,
                'tapioca': tapioca,
                'toppings': toppings
            })

    def getProductName(self, idx):
        auxProducto = str(self.TableFile['Platillo / Artículo'][idx])
        if auxProducto.endswith(" P") or auxProducto.endswith(" R") or auxProducto.endswith(" M"):
            auxProducto = auxProducto.split(" ")
            return " ".join(auxProducto[:-1]).strip().title()
        else:
            return auxProducto.strip().title()

    def getProductSize(self, idx):
        auxProducto = str(self.TableFile['Platillo / Artículo'][idx])
        if auxProducto.endswith(" P"):
            return "Pupi"
        elif auxProducto.endswith(" R"):
            return "Regular"
        elif auxProducto.endswith(" M"):
            return "Mostro"
        else:
            return "No Aplica"
    
    def getProductDetails(self, idx):
        exclude = ['Samurai', 'Ninja', 'Sensei', 'Sumo', 'Geisha', 'Rockster', 'Kokorotos', 'Snack', 'Combos', 'Promos', 'Temporada']
        
        auxProducto = str(self.TableFile['Platillo / Artículo'][idx]).strip().lower()

        modalitiesOn = ["hot pupi", "hot regular", "hot mostro", "cold pupi", "cold regular", "cold mostro", "icy pupi", "icy regular", "icy mostro", "milky cold pupi", "milky cold regular", "milky cold mostro", "milky hot pupi", "milky hoy regular", "milky hot mostro"]

        modalidad = ""
        leche = ""
        endulzante = ""
        tapioca = ""
        tmpTop = {}

        maxNumber = len(self.TableFile.index)
        for tmpIdx in range(idx, idx+6):
            if tmpIdx <= maxNumber-4:
                auxGroup = str(self.TableFile['Grupo'][tmpIdx]).split(" ")
                tmp = auxGroup[0].strip().lower()
                tmpDesc = str(self.TableFile['Descripción'][tmpIdx]).strip().lower()

                if ("hot" in tmp) or ("cold" in tmp) or ("icy" in tmp):
                    if ('hot' in tmpDesc):
                        modalidad = "Hot"
                    elif ('cold' in tmpDesc):
                        modalidad = "Cold"
                    elif ('icy' in tmpDesc):
                        modalidad = "Icy"
                elif ('extras' in tmp) or ('lacteos' in tmp):
                    if ("leche de almendras" in tmpDesc) or ("leche de almendra" in tmpDesc):
                        leche = "Leche de Almendras"
                    elif ("leche de arroz" in tmpDesc):
                        leche = "Leche de Arroz"
                    elif ("leche de coco" in tmpDesc):
                        leche = "Leche de Coco"
                    elif ("leche de soya" in tmpDesc):
                        leche = "Leche de Soya"
                    elif ("leche deslactosada light" in tmpDesc) or ("leche deslactosada" in tmpDesc) or ("deslactosada light" in tmpDesc) or ("deslactosada" in tmpDesc):
                        leche = "Leche de Deslactosada"
                    elif ("leche light" in tmpDesc) or ("leche liquida" in tmpDesc):
                        leche = "Leche Light"
                    elif ("sin leche." in tmpDesc) or ("sin leche" in tmpDesc):
                        leche = "Sin Leche"
                    else:
                        leche = "Sin Leche"
                elif ('endulzantes' in tmp):
                    if ("masc." in tmpDesc) or ("masc" in tmpDesc) or ("mascabado" in tmpDesc) or ("mascabado." in tmpDesc):
                        endulzante = "Mascabado"
                    elif ("miel" in tmpDesc):
                        endulzante = "Miel"
                    elif ("fructosa" in tmpDesc):
                        endulzante = "Fructosa"
                    elif ("splenda" in tmpDesc):
                        endulzante = "Splenda"
                    elif ("stevia" in tmpDesc):
                        endulzante = "Stevia"
                    elif ("sin azucar" in tmpDesc) or ("sin azúcar" in tmpDesc) or ("sin az?car" in tmpDesc):
                        endulzante = "Sin Azúcar"
                elif ('add' in tmp):
                    if ("tapioca pupi" in tmpDesc) or ("tapioca regular" in tmpDesc) or ("tapioca mostro" in tmpDesc):
                        tapioca = "Si"
                    elif ("sin toppings" in tmpDesc):
                        tapioca = "No"
                    elif ("cheese foam" in tmpDesc):
                        tmpTop['Cheese Foam'] = "Si"
                    elif ("jelly coffee" in tmpDesc):
                        tmpTop['Jelly Coffe'] = "Si"
                    elif ("jelly samba" in tmpDesc):
                        tmpTop['Jelly Samba'] = "Si"
                    elif ("jelly strawberry" in tmpDesc):
                        tmpTop['Jelly Strawyberry'] = "Si"
                    elif ("jelly lychee" in tmpDesc):
                        tmpTop['Jelly Lychee'] = "Si"
                    elif ("chamoy y miguelito" in tmpDesc):
                        tmpTop['Chamoy & Miguelito'] = "Si"
                    elif ("popping boba blueberry" in tmpDesc):
                        tmpTop['PB Blueberry'] = "Si"
                    elif ("popping boba strawberry" in tmpDesc):
                        tmpTop['PB Strawberry'] = "Si"
                    elif ("popping boba lychee" in tmpDesc):
                        tmpTop['PB Lychee'] = "Si"
                    elif ("pudding flan" in tmpDesc):
                        tmpTop['Pudding Flan'] = "Si"
                    elif ("pudding taro" in tmpDesc):
                        tmpTop['Pudding Taro'] = "Si"
            else:
                pass
        toppings = json.dumps(tmpTop)
        return modalidad, leche, endulzante, tapioca, toppings
Obj = Scanner()
Obj.searchRows('1292')