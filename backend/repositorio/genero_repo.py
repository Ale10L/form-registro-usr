from sqlalchemy import select
from sqlalchemy.orm.session import Session
from fastapi.exceptions import HTTPException
from modelos.genero_model import GeneroBd, GeneroApi


class GeneroRepositorio:
    def lista_genero(self, session: Session):
        return session.execute(select(GeneroBd)).scalars().all()
    
    def genero_by_id(self, id: int, session: Session):
        genero = session.execute(select(GeneroBd).where(GeneroBd.genero_id == id)).scalar()
        return genero
    
    def agregar_genero(self, datos: GeneroApi, session: Session):
        genero = GeneroBd(nombre_genero = datos.nombre_genero)
        session.add(genero)
        session.commit()
        return genero
    
    def eliminar_genero(self, id: int, session: Session):
        genero = session.get(GeneroBd, id)
        if genero is None:
            raise HTTPException(status_code=404, detail='El género no existe')
        try:
            session.delete(genero)
            session.commit()
        except:
            raise HTTPException(status_code=404, detail='No se puede eliminar el género, posiblemente esté referenciado por otro registro')
    
    def modificar_genero(self, id: int, datos: GeneroApi, session: Session):
        genero = session.get(GeneroBd, id)
        if genero is None:
            raise HTTPException(status_code=404, detail='El género no existe')
        try:
            genero.nombre_genero = datos.nombre_genero
            session.commit()
        except:
            raise HTTPException(status_code=404, detail='No se puede modificar el género, posiblemente esté referenciado por otro registro')
        return genero