import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const FormularioGenero = () => {
  const [generos, setGeneros] = useState({
    nombre_genero: ""
  });

  console.log(generos);

  const {nombre_genero} = generos
  const navigate = useNavigate()
  const { idGenero } = useParams();

  const guardarGenero = () => {
    console.log(generos);
    axios.post(`http://localhost:8000/genero`, generos)
      .then(() => {
        alert("Se registro un nuevo género");
        navigate('/')
      })
      .catch((error) => {
        alert(error);
      });
  };

  const obtenerGeneros = () => {
    axios.get(`http://localhost:8000/genero`)
      .then((response) => {
        setGeneros(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const formularioCambio = (e) => {
    setGeneros({
      ...generos,
      nombre_genero: e.value,
    });
  };


  useEffect(() => {
    if(idGenero){
      obtenerGeneros();
    }
  }, [idGenero]);

  return (
    <div className='form'>
      <div className="row">        
          <div className='form_group'>
            <input
              type="text"
              className="nombre_genero"
              name="nombre_genero"
              value={nombre_genero}
              onChange={(e) => formularioCambio(e.target)}
            />
            <label className='label'>Nombre género</label>
            <span className='barra'></span>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button className="btn btn-primary" onClick={guardarGenero}>
              {/* {idGenero ? 'Editar' : 'Crear'} */}Aceptar
            </button>
            <button className="btn btn-danger">Cancelar</button>
          </div>
        
      </div>
    </div>
  );
}

export default FormularioGenero;