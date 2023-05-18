from sqlalchemy import select
from sqlalchemy.orm.session import Session
from fastapi.exceptions import HTTPException
from modelos.usr_model import UsrBd, UsrApi
from modelos.pais_model import PaisBd
from modelos.genero_model import GeneroBd
import re
from datetime import datetime
from dateutil.relativedelta import relativedelta


class UsrRepositorio:
    def lista_usr(self, session: Session):
        usr = session.query(UsrBd).join(GeneroBd).filter(UsrBd.genero_id == GeneroBd.genero_id).join(PaisBd).filter(PaisBd.pais_id == UsrBd.pais_id).all()
        #return session.execute(select(UsrBd)).scalars().all()
        return usr
    
    def usr_by_id(self, id: int, session: Session):
        usr = session.execute(select(UsrBd).where(UsrBd.usuario_id == id)).scalar()
        return usr
    
    def agregar_usr(self, datos: UsrApi, session: Session):
        correo = datos.correo_electronico
        expresion_regular = r"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
        validar_correo = re.match(expresion_regular, correo)
        fecha_actual = datetime.now().date()
        fec_nac = datos.fecha_nacimiento.date()
        edad = relativedelta(fecha_actual, fec_nac)
        if edad.years <= 17:
            raise HTTPException(status_code=406, detail='El usuario debe ser mayor de 18 años')
        if validar_correo is None:
            raise HTTPException(status_code=406, detail='El formato de correo electrónico ingresado no es correcto')
        usr = UsrBd(nombre_completo = datos.nombre_completo, fecha_nacimiento = datos.fecha_nacimiento, correo_electronico = datos.correo_electronico, contraseña = datos.contraseña, genero_id = datos.genero_id, pais_id = datos.pais_id)
        session.add(usr)
        session.commit()
        return usr
    
    def eliminar_usr(self, id: int, session: Session):
        usr = session.get(UsrBd, id)
        if usr is None:
            raise HTTPException(status_code=404, detail='El usuario no existe')
        try:
            session.delete(usr)
            session.commit()
        except:
            raise HTTPException(status_code=404, detail='No se puede eliminar el usuario, posiblemente esté referenciado por otro registro')
    
    def modificar_usr(self, id: int, datos: UsrApi, session: Session):
        usr = session.get(UsrBd, id)
        if usr is None:
            raise HTTPException(status_code=404, detail='El usuario no existe')
        fecha_actual = datetime.now().date()
        fec_nac = datos.fecha_nacimiento.date()
        edad = relativedelta(fecha_actual, fec_nac)
        if edad.years <= 17:
            raise HTTPException(status_code=406, detail='El usuario debe ser mayor de 18 años')
        correo = datos.correo_electronico
        expresion_regular = r"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
        validar = re.match(expresion_regular, correo)
        if validar is None:
            raise HTTPException(status_code=406, detail='El formato de correo electrónico ingresado no es correcto')
        fecha_actual = datetime.now()
        edad = fecha_actual - datos.fecha_nacimiento
        if edad <= 17:
            raise HTTPException(status_code=406, detail='El usuario debe ser mayor de 18 años')
        
        try:
            usr.nombre_completo = datos.nombre_completo
            usr.fecha_nacimiento = datos.fecha_nacimiento
            usr.correo_electronico = datos.correo_electronico
            usr.contraseña = datos.contraseña
            usr.genero_id = datos.genero_id
            usr.pais_id = datos.pais_id
            session.commit()
        except:
            raise HTTPException(status_code=404, detail='No se puede modificar el usuario, posiblemente esté referenciado por otro registro')
        return usr