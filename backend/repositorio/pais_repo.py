from sqlalchemy import select
from sqlalchemy.orm.session import Session
from fastapi.exceptions import HTTPException
from modelos.pais_model import PaisBd, PaisApi


class PaisRepositorio:
    def lista_pais(self, session: Session):
        return session.execute(select(PaisBd)).scalars().all()
    
    def pais_by_id(self, id: int, session: Session):
        pais = session.execute(select(PaisBd).where(PaisBd.pais_id == id)).scalar()
        return pais
    
    def agregar_pais(self, datos: PaisApi, session: Session):
        pais = PaisBd(nombre_pais = datos.nombre_pais)
        session.add(pais)
        session.commit()
        return pais
    
    def eliminar_pais(self, id: int, session: Session):
        pais = session.get(PaisBd, id)
        if pais is None:
            raise HTTPException(status_code=404, detail='El país no existe')
        try:
            session.delete(pais)
            session.commit()
        except:
            raise HTTPException(status_code=404, detail='No se puede eliminar el país, posiblemente esté referenciado por otro registro')
    
    def modificar_pais(self, id: int, datos: PaisApi, session: Session):
        pais = session.get(PaisBd, id)
        if pais is None:
            raise HTTPException(status_code=404, detail='El país no existe')
        try:
            pais.nombre_pais = datos.nombre_pais
            session.commit()
        except:
            raise HTTPException(status_code=404, detail='No se puede modificar el país, posiblemente esté referenciado por otro registro')
        return pais