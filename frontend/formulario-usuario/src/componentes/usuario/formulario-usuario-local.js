import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormularioUsuarioLocal = () => {
  const [usuarios, setUsuarios] = useState([])
  const [usuario, setUsuario] = useState({
    id: 0,
    nombre_completo: '',
    fecha_nacimiento: '',
    correo_electronico: '',
    contraseña: '',
    genero_id: 0,
    pais_id: 0
  })
  const [generos, setGeneros] = useState([]);
  const [genero, setGenero] = useState({ nombre_genero: '' })
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState({ nombre_pais: '' })
  const [habilitarOtroGenero, setHabilitarOtroGenero] = useState(false);
  const [habilitarOtroPais, setHabilitarOtroPais] = useState(false);

  const { nombre_completo, correo_electronico, contraseña, fecha_nacimiento, genero_id, pais_id } = usuario
  const { nombre_genero } = genero
  const { nombre_pais } = pais

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
      if (name !== 'confirmacion') {
        console.log(name + ": " + value)
        setUsuario({
          ...usuario,
          [name]: value
        })
      }
      if (name === "nuevo_genero") {
        setGenero({
          ...genero,
          nombre_genero: value,
        });
      }

      if (name === "nuevo_pais") {
        setPais({
          ...pais,
          nombre_pais: value,
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

  const habilitarBtnAceptar = () => {
    let coinciden = contraseña === confirmacion ? true : false
    let btnAceptar = true
    if (camposCompletos.nombre_completo === true && camposCompletos.fecha_nacimiento === true && camposCompletos.correo_electronico === true && camposCompletos.contraseña === true && camposCompletos.confirmacion === true && coinciden === true) {
      btnAceptar = false
    }
    return btnAceptar
  }

  const eventoContraseña = (e) => {
    const { name, value } = e.target

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

    return contraseña === confirmacion ? true : false
  }

  const habilitarInputOtro = (e) => {
    const { name, value } = e.target;
    if (name === "genero_id" && value === "otro_genero") {
      setHabilitarOtroGenero(true);
    } else {
      setHabilitarOtroGenero(false);
    }

    if (name === "pais_id" && value === "otro_pais") {
      setHabilitarOtroPais(true);
    } else {
      setHabilitarOtroPais(false);
    }
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
    if (genero.nombre_genero !== "") {
      axios.post(`http://localhost:3030/generos-local`, genero)
        .then(() => {
          alert("Se registró un nuevo género")
        })
        .catch((error) => {
          alert(error);
        })
      }
      
      if (pais.nombre_pais !== "") {
        axios.post(`http://localhost:3030/pais-local`, pais)
        .then(() => {
          alert("Se registró un nuevo país")
        })
        .catch((error) => {
          alert(error);
        })
    }
    
    if(usuario.genero_id === "otro_genero"){
      usuario.genero_id = generos.length + 1
    }
    if(usuario.pais_id === "otro_pais"){
      usuario.pais_id = paises.length + 1
    }
    usuario.genero_id = parseInt(usuario.genero_id)
    usuario.pais_id = parseInt(usuario.pais_id)
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
              value={usuario.contraseña}
              onChange={(e) => { formularioCambio(e); eventoContraseña(e) }}
              required
            />
            <label className='label'>Contraseña</label>
            <label className='text-white' hidden={camposCompletos.contraseña}>El campo contraseña es obligatorio</label>
            <span className='barra'></span>
            {/* <label className='text-white' hidden={(e) => {eventoContraseña(e)}}>Las contraseñas deben coincidir</label> */}
          </div>
          <div className='form_group'>
            <input
              type="password"
              className='confirmacion'
              value={confirmacion}
              name='confirmacion'
              required onChange={(e) => { formularioCambio(e); eventoContraseña(e) }}
            />
            <label className='label'>Confirmar contraseña</label>
            <label className='text-white' hidden={camposCompletos.confirmacion}>El campo confirmar contraseña es obligatorio</label>
            <span className='barra'></span>
          </div>
          <label className='text-white' hidden={contraseña === confirmacion ? true : false}>Las contraseñas deben coincidir</label>
        </div>
        <div className='form_group'>
          <select
            className='genero'
            required
            name='genero_id'
            //value={usuario.genero_id}
            onChange={(e) => { formularioCambio(e); habilitarInputOtro(e) }}
          >
            {generos.map((gen) => (
              <option key={gen.id}
                value={gen.id}
              >{gen.id} - {gen.nombre_genero}</option>
            ))}
            <option value="otro_genero">Otro</option>
          </select>
          <input
            hidden={!habilitarOtroGenero}
            placeholder="Ingrese otro género"
            name="nuevo_genero"
            value={nombre_genero}
            onChange={(e) => formularioCambio(e)}
          />
          <label className='label'>Género</label>
          <span className='barra'></span>
        </div>
        <div className='form_group'>
          <select
            className='pais'
            required
            name='pais_id'
            //value={usuario.pais_id}
            onChange={(e) => { formularioCambio(e); habilitarInputOtro(e) }}
          >
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id}
              >{pais.id} - {pais.nombre_pais}</option>
            ))}
            <option value="otro_pais">Otro</option>
          </select>
          <input
            hidden={!habilitarOtroPais}
            placeholder="Ingrese otro país"
            name="nuevo_pais"
            value={nombre_pais}
            onChange={(e) => formularioCambio(e)}
          />
          <label className='label'>País de residencia</label>
          <span className='barra'></span>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <button className="btn btn-primary" onChange={habilitarBtnAceptar} onClick={guardarUsuario} id='btnAceptar'>
            Agregar
          </button>
          <button className="btn btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
  );
}


export default FormularioUsuarioLocal;