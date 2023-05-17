from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from db import get_session
from sqlalchemy.orm import Session
from repositorio.pais_repo import PaisRepositorio
from modelos.pais_model import PaisApi

pais_router = APIRouter(prefix='/pais', tags=['País'])

repo = PaisRepositorio()

@pais_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return repo.lista_pais(s)

@pais_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    return repo.pais_by_id(id, s)

@pais_router.post('/', response_model=PaisApi)
def agregar_pais(datos: PaisApi, s: Session = Depends(get_session)):
    pais = repo.agregar_pais(datos, s)
    return pais

@pais_router.put('/{id}', response_model=PaisApi)
def modificar_pais(id: int, datos: PaisApi, s: Session = Depends(get_session)):
    pais = repo.modificar_pais(id, datos, s)
    return pais

@pais_router.delete('/eliminar_pais/{id}', response_model=PaisApi)
def eliminar_pais(id: int, s: Session = Depends(get_session)):
    pais = repo.eliminar_pais(id, s)
    return pais