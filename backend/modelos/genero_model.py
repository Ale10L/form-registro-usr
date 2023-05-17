from db import Base
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel

class GeneroBd(Base):
    __tablename__ = 'genero'

    genero_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_genero = Column(String, nullable=False)

class GeneroApi(BaseModel):
    nombre_genero: str

    class Config:
        orm_mode = True