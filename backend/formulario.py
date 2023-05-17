import uvicorn
from fastapi import FastAPI
from api.genero_api import genero_router
from api.pais_api import pais_router
from api.usr_api import usr_router
import db
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8000",
    ]
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    )
"""
app.include_router(genero_router)
app.include_router(pais_router)
app.include_router(usr_router)

#db.drop_all()

db.create_all()

if __name__ == '__main__':
    uvicorn.run('formulario:app', reload=True)