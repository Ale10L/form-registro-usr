import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormularioUsuarioLocal = () => {
  const [usuarios, setUsuarios] = useState([])
  const [usuario, setUsuario] = useState({
    nombre_completo: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    contraseña: "",
    genero_id: 0,
    pais_id: 0,
  });
  const [generos, setGeneros] = useState([]);
  const [genero, setGenero] = useState({
    genero_id: 0,
    nombre_genero: ""
  })
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState({
    pais_id: 0,
    nombre_pais: ""
  })

  const {
    nombre_completo,
    fecha_nacimiento,
    correo_electronico,
    contraseña,
    genero_id,
    pais_id,
  } = usuario;

  const { idUsuario } = useParams()
  const { idGenero } = useParams()
  const { idPais } = useParams()

  const formularioCambio = (e) => {
    if (e.target) {
      const { name, value } = e.target;

      if (name === "nombre_genero") {
        setGenero({
          ...genero,
          nombre_genero: value,
        });
        setUsuario({
          ...usuario,
          genero_id: 0,
        });
      }

      if (name === "nombre_pais") {
        setPais({
          ...pais,
          nombre_pais: value,
        });
        setUsuario({
          ...usuario,
          pais_id: 0,
        });
      }

      if (name) {
        setUsuario({
          ...usuario,
          [name]: value,
        });
      }

      setCamposCompletos((prevState) => ({
        ...prevState,
        [name]: value !== "",
      }));
    } else {
      console.error("Evento no válido");
    }
  };

  const [camposCompletos, setCamposCompletos] = useState({
    nombre_completo: false,
    fecha_nacimiento: false,
    correo_electronico: false,
    contraseña: false,
    confirmacion: false,
  });

  const habilitarBtnAceptar = () => {
    let coinciden = contraseña === confirmacion ? true : false
    let btnAceptar = true
    if (camposCompletos.nombre_completo === true && camposCompletos.fecha_nacimiento === true && camposCompletos.correo_electronico === true && camposCompletos.contraseña === true && camposCompletos.confirmacion === true && coinciden === true) {
      btnAceptar = false
    }
    return btnAceptar
  }

  const [validaPass, setValidaPass] = useState({ confirmacion: '' })
  const { confirmacion } = validaPass


  const eventoContraseña = (e) => {
    const { name, value } = e.target
    console.log(name)

    if (name === 'confirmacion') {
      setValidaPass({
        ...validaPass,
        [name]: value,
      })
    }
    if (name === 'contraseña') {
      setUsuario({
        ...usuario,
        [name]: value,
      })
      setValidaPass({
        ...validaPass,
        [name]: value,
      })
    }

    return contraseña === confirmacion ? true : false
  }

  const navigate = useNavigate();

  const obtenerUsuarios = () => {
    axios.get(`http://localhost:3030/usuarios`)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (!idUsuario) {
      obtenerUsuarios()
    }
  }, [idUsuario])

  const obtenerGeneros = () => {
    axios.get(`http://localhost:3030/genero`)
      .then((response) => {
        setGeneros(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (!idGenero) {
      obtenerGeneros();
    }
  }, [idGenero]);

  const obtenerPaises = () => {
    axios.get(`http://localhost:3030/pais`)
      .then((response) => {
        setPaises(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (!idPais) {
      obtenerPaises();
    }
  }, [idPais]);


  const guardarUsuario = () => {
    console.log(usuario)
    axios.post(`http://localhost:3030/usuarios`, usuario)
      .then(() => {
        alert("Se registro un nuevo usuario");
        navigate('/')
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="row">
      <form className='form'>
        <div className='form_group'>
          <input
            type="text"
            className='nombre_completo'
            name='nombre_completo'
            id='nombre_completo'
            value={nombre_completo}
            required
            onChange={(e) => formularioCambio(e)}
          />
          <label className='label'>Nombre Completo</label>
          <label className='text-white' hidden={camposCompletos.nombre_completo}>El campo nombre completo es obligatorio</label>
          <span className='barra'></span>
        </div>
        <div className='form_group'>
          <input
            type="datetime-local"
            className='fecha_nacimiento'
            name='fecha_nacimiento'
            value={fecha_nacimiento}
            onChange={(e) => formularioCambio(e)}
            required
          />
          <span className='barra'></span>
          <label className='label'>Fecha de nacimiento</label>
          <label className='text-white' hidden={camposCompletos.fecha_nacimiento}>El campo fecha de nacimiento es obligatorio</label>
        </div>
        <div className='form_group'>
          <input
            type="text"
            className='correo_electronico'
            name='correo_electronico'
            value={correo_electronico}
            onChange={(e) => formularioCambio(e)}
            required
          />
          <label className='label'>Correo electrónico</label>
          <label className='text-white' hidden={camposCompletos.correo_electronico}>El campo correo electrónico es obligatorio</label>
          <span className='barra'></span>
        </div>
        <div>
          <div className='form_group'>
            <input
              type="password"
              className='contraseña'
              name='contraseña'
              value={contraseña}
              onChange={(e) => { formularioCambio(e); eventoContraseña(e) }}
              required
              id='contraseña' />
            <label className='label'>Contraseña</label>
            <label className='text-white' hidden={camposCompletos.contraseña}>El campo contraseña es obligatorio</label>
            <span className='barra'></span>
          </div>
          <div className='form_group'>
            <input
              type="password"
              className='confirmacion'
              value={confirmacion}
              name='confirmacion'
              required onChange={(e) => { formularioCambio(e); eventoContraseña(e) }}
              id='confirmacion' />
            <label className='label'>Confirmar contraseña</label>
            <label className='text-white' hidden={camposCompletos.confirmacion}>El campo confirmar contraseña es obligatorio</label>
            <span className='barra'></span>
          </div>
          <label className='text-white' hidden={camposCompletos.contraseña === camposCompletos.confirmacion ? true : false}>Las contraseñas deben coincidir</label>
        </div>
        <div className='form_group'>
          <select
            className='genero'
            required
            name='genero_id'
            value={usuario.genero_id}
            onChange={(e) => { formularioCambio(e);}}
          >
            {generos.map((gen) => (
              <option key={gen.genero_id}
                value={gen.genero_id}
              >{gen.genero_id} - {gen.nombre_genero}</option>
            ))}
            <option value="otro_genero">Otro</option>
          </select>
          <label className='label'>Género</label>
          <span className='barra'></span>
        </div>
        <div className='form_group'>
          <select
            className='pais'
            required
            name='pais_id'
            value={usuario.pais_id}
            onChange={(e) => formularioCambio(e)}
          >
            {paises.map((pais) => (
              <option key={pais.pais_id} value={pais.pais_id}
              >{pais.pais_id} - {pais.nombre_pais}</option>
            ))}
            <option value="otro_pais">Otro</option>
          </select>
          <label className='label'>País de residencia</label>
          <span className='barra'></span>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <button className="btn btn-primary" onClick={guardarUsuario} disabled={habilitarBtnAceptar()} id='btnAceptar'>
            Agregar
          </button>
          <button className="btn btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
  );
}


export default FormularioUsuarioLocal;