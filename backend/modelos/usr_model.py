from db import Base
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from datetime import datetime

class UsrBd(Base):
    __tablename__ = 'usuarios'

    usuario_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_completo = Column(String, nullable=False)
    fecha_nacimiento = Column(DateTime, nullable=False)
    correo_electronico = Column(String, nullable=False)
    contraseña = Column(String, nullable=False)
    genero_id = Column(Integer, ForeignKey('genero.genero_id'), nullable=False)
    pais_id = Column(Integer, ForeignKey('pais.pais_id'), nullable=False)

    genero = relationship('GeneroBd', foreign_keys=[genero_id])
    pais = relationship('PaisBd', foreign_keys=[pais_id])

class UsrApi(BaseModel):
    nombre_completo: str
    fecha_nacimiento: datetime
    correo_electronico: str
    contraseña: str
    genero_id: int
    pais_id: int

    class Config:
        orm_mode = True