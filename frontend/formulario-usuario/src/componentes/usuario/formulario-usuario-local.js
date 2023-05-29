import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormularioUsuarioLocal = () => {
  const [usuarios, setUsuarios] = useState([])
  const [usuario, setUsuario] = useState([])
  const usuarioId = useRef()
  const nombreCompleto = useRef()
  const fechaNacimiento = useRef()
  const correoElectronico = useRef()
  const pass = useRef()
  const generoId = useRef()
  const paisId = useRef()
  const [generos, setGeneros] = useState([]);
  const nombre_genero = useRef()
  const [paises, setPaises] = useState([]);
  const nombre_pais = useRef()

  const { idUsuario } = useParams()
  const { idGenero } = useParams()
  const { idPais } = useParams()

  const [camposCompletos, setCamposCompletos] = useState({
    nombre_completo: false,
    fecha_nacimiento: false,
    correo_electronico: false,
    contraseña: false,
    confirmacion: false,
  });

  const [validaPass, setValidaPass] = useState({ confirmacion: '' })
  const { confirmacion } = validaPass
  const navigate = useNavigate();

  const formularioCambio = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      const user = {
        usuario_id: usuarioId.current.value,
        nombre_completo: nombreCompleto.current.value,
        fecha_nacimiento: fechaNacimiento.current.value,
        correo_electronico: correoElectronico.current.value,
        contraseña: pass.current.value,
        genero_id: generoId.current.value,
        pais_id: paisId.current.value
      }
      console.log(user)
      setUsuario(user)
      console.log(usuario)
      setCamposCompletos((prevState) => ({
        ...prevState,
        [name]: value !== "",
      }));

    } else {
      console.error("Evento no válido");
    }
  };

  const habilitarBtnAceptar = () => {
    let coinciden = pass.current.value === confirmacion ? true : false
    let btnAceptar = true
    if (camposCompletos.nombre_completo === true && camposCompletos.fecha_nacimiento === true && camposCompletos.correo_electronico === true && camposCompletos.contraseña === true && camposCompletos.confirmacion === true && coinciden === true) {
      btnAceptar = false
    }
    return btnAceptar
  }

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
      setValidaPass({
        ...validaPass,
        [name]: value,
      })
    }

    return pass.current.value === confirmacion ? true : false
  }  

  const obtenerUsuarios = () => {
    axios.get(`http://localhost:3030/usuarios-local`)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if(idUsuario) {
      axios.get(`http://localhost:3030/usuarios/${idUsuario}`)
      .then((response) => {
          const user = response.data;

          usuarioId.current.value = user.usuario_id;
          nombreCompleto.current.value = user.nombre_completo;
          fechaNacimiento.current.value = user.fecha_nacimiento;
          correoElectronico.current.value = user.correo_electronico;
          pass.current.value = user.contraseña;
          generoId.current.value = user.genero_id;
          paisId.current.value = user.pais_id;
      })
  }
    if (!idUsuario) {
      obtenerUsuarios()
    }
  }, [idUsuario])

  const obtenerGeneros = () => {
    axios.get(`http://localhost:3030/generos-local`)
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
    axios.get(`http://localhost:3030/pais-local`)
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
    //usuarioId = usuarios.length + 1
    //console.log("ID de usuario a asignar: " + usuario_id)
    //setUsuario((user) => ({...user,[usuario_id]: usuario_id}))
    console.log("Usuario ID: " + usuario.usuario_id)
    console.log("Nombre completo: " + usuario.nombre_completo)
    console.log("Fecha de nacimiento: " + usuario.fecha_nacimiento)
    console.log("Correo electrónico: " + usuario.correo_electronico)
    console.log("Contraseña: " + usuario.contraseña)
    console.log("Género ID: " + usuario.genero_id)
    console.log("País ID: " + usuario.pais_id)
    axios.post(`http://localhost:3030/usuarios-local`, usuario)
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
            ref={nombreCompleto}
            id='nombre_completo'
            value={usuario.nombre_completo}
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
            ref={fechaNacimiento}
            value={usuario.fecha_nacimiento}
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
            ref={correoElectronico}
            value={usuario.correo_electronico}
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
              ref={pass}
              value={usuario.contraseña}
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
            ref={generoId}
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
            ref={paisId}
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
          <button className="btn btn-primary" onClick={guardarUsuario}  id='btnAceptar'>
            Agregar
          </button>
          <button className="btn btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
  );
}


export default FormularioUsuarioLocal;