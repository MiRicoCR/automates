import sys
from getopt import getopt, GetoptError
from modules.scrapping import Scrapping
from modules.concentrado import Objection

VERSION = "v1.0.3"
VERBOSE = False

def Filter():

    try:
        options, remainder = getopt(sys.argv[1:], 'u:val p:val', ['version'])
        usrArg = None
        pwdArg = None

    except GetoptError as err:
        print('')

    for opt, arg in options:
        if opt in ('-u', '--username'):
            usrArg = arg
        elif opt in ('-p', '--password'):
            pwdArg = arg
        elif opt == '--version':
            print(VERSION)

    if usrArg and pwdArg:
        return usrArg, pwdArg
    else:
        print("Necesitas introducir tus datos de inicio de sesión en wansoft.")
        print("Por favor ejecuta el programa de la siguiente manera:")
        print("python3 main.py -u USUARIO -p CONTRASEÑA")

if __name__ == "__main__":
    usuario, clave = Filter()
    print(usuario, clave)
    Web = Scrapping(usuario, clave)
    Web.connect()
    logPath, date = Web.downloadSite()

    Complete = Objection(logPath, date)
    Complete.Full_Form()