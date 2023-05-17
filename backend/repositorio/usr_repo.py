from sqlalchemy import select
from sqlalchemy.orm.session import Session
from fastapi.exceptions import HTTPException
from modelos.usr_model import UsrBd, UsrApi


class UsrRepositorio:
    def lista_usr(self, session: Session):
        return session.execute(select(UsrBd)).scalars().all()
    
    def usr_by_id(self, id: int, session: Session):
        usr = session.execute(select(UsrBd).where(UsrBd.usuario_id == id)).scalar()
        return usr
    
    def agregar_usr(self, datos: UsrApi, session: Session):
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