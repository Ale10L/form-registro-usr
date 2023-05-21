import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const FormularioUsuario = () => {
  const [usuarios, setUsuarios] = useState({
    nombre_completo: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    contraseña: "",
    confirmacion: "",
    genero_id: 1,
    pais_id: 1,
  });

  const {
    nombre_completo,
    fecha_nacimiento,
    correo_electronico,
    contraseña,
    genero_id,
    pais_id,
  } = usuarios;

  const formularioCambio = (e) => {
    if (e.target) {
      const { name, value } = e.target
      if (name) {
        setUsuarios({
          ...usuarios,
          [name]: value,
        });
      }
    } else {
      console.error("Evento no válido")
    }
  };

  const { idUsuario } = useParams();


  const obtenerUsuarios = () => {
    console.log(usuarios)
    axios
      .get(`http://localhost:8000/usuarios`)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (idUsuario) {
      obtenerUsuarios();
    }
  }, [idUsuario]);

  const [generos, setGeneros] = useState([]);

  const obtenerGeneros = () => {
    axios
      .get(`http://localhost:8000/genero`)
      .then((response) => {
        setGeneros(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    obtenerGeneros();
  }, []);

  const [paises, setPaises] = useState([]);

  const obtenerPaises = () => {
    axios
      .get(`http://localhost:8000/pais`)
      .then((response) => {
        setPaises(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    obtenerPaises();
  }, []);

  const guardarUsuario = () => {
    console.log(usuarios);
    axios
      .post(`http://localhost:8000/usuarios/agregar-usuario/`, usuarios)
      .then(() => {
        alert("Se registro un nuevo usuario");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="row">
      <Link to='/genero/agregar-genero'>Agregar género</Link>
      <form className='form'>
        <div className='form_group'>
          <input
            type="text"
            className='nombre_completo'
            name='nombre_completo'
            value={nombre_completo}
            onChange={(e) => formularioCambio(e)}
          />
          <label className='label'>Nombre Completo</label>
          <span className='barra'></span>
        </div>
        <div className='form_group'>
          <input
            type="datetime-local"
            className='fecha_nacimiento'
            name='fecha_nacimiento'
            value={fecha_nacimiento}
            onChange={(e) => formularioCambio(e)}
          />
          <span className='barra'></span>
          <label className='label'>Fecha de nacimiento</label>
        </div>
        <div className='form_group'>
          <input
            type="text"
            className='correo_electronico'
            name='correo_electronico'
            value={correo_electronico}
            onChange={(e) => formularioCambio(e)}
          />
          <label className='label'>Correo electrónico</label>
          <span className='barra'></span>
        </div>
        <div className='form_group'>
          <input
            type="password"
            className='contraseña'
            name='contraseña'
            value={contraseña}
            onChange={(e) => formularioCambio(e)}
          />
          <label className='label'>Contraseña</label>
          <span className='barra'></span>
        </div>
        <div className='form_group'>
          <input type="password" className='confirmacion' />
          <label className='label'>Confirmar contraseña</label>
          <span className='barra'></span>
        </div>
        <div className='form_group'>
          <select
            className='genero'
          >
            {generos.map((gen) => (
              <option key={gen.genero_id}
                name='genero_id'
                value={genero_id}
                onChange={(e) => formularioCambio(e)}>{gen.genero_id} - {gen.nombre_genero}</option>
            ))}
          </select>
          <label className='label'>Género</label>
          <span className='barra'></span>
        </div>
        <div className='form_group'>
          <select
            className='pais'
          >
            {paises.map((pais) => (
              <option key={pais.pais_id}
                name='pais_id'
                value={pais_id}
                onChange={(e) => formularioCambio(e)}>{pais.pais_id} - {pais.nombre_pais}</option>
            ))}
          </select>
          <label className='label'>País de residencia</label>
          <span className='barra'></span>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <button className="btn btn-primary" onClick={guardarUsuario}>
            Agregar
          </button>
          <button className="btn btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
  );
}


export default FormularioUsuario;