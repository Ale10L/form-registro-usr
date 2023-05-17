from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from db import get_session
from sqlalchemy.orm import Session
from repositorio.genero_repo import GeneroRepositorio
from modelos.genero_model import GeneroApi

genero_router = APIRouter(prefix='/genero', tags=['Género'])

repo = GeneroRepositorio()

@genero_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return repo.lista_genero(s)

@genero_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    return repo.genero_by_id(id, s)

@genero_router.post('/', response_model=GeneroApi)
def agregar_genero(datos: GeneroApi, s: Session = Depends(get_session)):
    genero = repo.agregar_genero(datos, s)
    return genero

@genero_router.put('/{id}', response_model=GeneroApi)
def modificar_genero(id: int, datos: GeneroApi, s: Session = Depends(get_session)):
    genero = repo.modificar_genero(id, datos, s)
    return genero

@genero_router.delete('/eliminar_genero/{id}', response_model=GeneroApi)
def eliminar_genero(id: int, s: Session = Depends(get_session)):
    genero = repo.eliminar_genero(id, s)
    return genero