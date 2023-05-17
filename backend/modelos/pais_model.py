from db import Base
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel

class PaisBd(Base):
    __tablename__ = 'pais'

    pais_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_pais = Column(String, nullable=False)

class PaisApi(BaseModel):
    nombre_pais: str

    class Config:
        orm_mode = True