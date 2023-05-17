from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from db import get_session
from sqlalchemy.orm import Session
from repositorio.usr_repo import UsrRepositorio
from modelos.usr_model import UsrApi

usr_router = APIRouter(prefix='/usuarios', tags=['Usuarios'])

repo = UsrRepositorio()

@usr_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return repo.lista_usr(s)

@usr_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    return repo.usr_by_id(id, s)

@usr_router.post('/', response_model=UsrApi)
def agregar_usr(datos: UsrApi, s: Session = Depends(get_session)):
    usr = repo.agregar_usr(datos, s)
    return usr

@usr_router.put('/{id}', response_model=UsrApi)
def modificar_usr(id: int, datos: UsrApi, s: Session = Depends(get_session)):
    usr = repo.modificar_usr(id, datos, s)
    return usr

@usr_router.delete('/eliminar_usuario/{id}', response_model=UsrApi)
def eliminar_usr(id: int, s: Session = Depends(get_session)):
    usr = repo.eliminar_usr(id, s)
    return usr