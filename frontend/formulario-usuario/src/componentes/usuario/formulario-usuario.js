import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormularioUsuario = () => {
  const [usuarios, setUsuarios] = useState([])
  const [usuario, setUsuario] = useState({
    usuario_id: 0,
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
    usuario_id,
    nombre_completo,
    fecha_nacimiento,
    correo_electronico,
    contraseña,
    genero_id,
    pais_id,
  } = usuario;
  const { nombre_genero } = genero
  const { nombre_pais } = pais

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

  const [mostrarOtroGenero, setMostrarOtroGenero] = useState(false);
  const [mostrarOtroPais, setMostrarOtroPais] = useState(false);

  const eventoInputOtro = (e) => {
    const { name } = e.target;

    if (name === "otro_genero") {
      genero.genero_id = 0 // Reinicia el ID del género
      setGenero({
        ...genero,
        genero_id: genero.length + 1,
        nombre_genero: "",
      });
      setMostrarOtroGenero(true);
      axios.post(`http://localhost:3030/genero`, genero).then(() => { })
    }

    if (name === "otro_pais") {
      pais.pais_id = 0 // Reinicia el ID del país
      setPais({
        ...pais,
        pais_id: 0,
        nombre_pais: "",
      });
      axios.post(`http://localhost:3030/pais`, pais).then(() => { })
      setMostrarOtroPais(true);
    }
  }

  const navigate = useNavigate();

  const obtenerUsuarios = () => {

    //axios.get(`http://localhost:8000/usuarios`)
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

  console.log(usuarios)
  console.log("Cantidad de usuarios en db.json: " + usuarios.length)

  const obtenerGeneros = () => {
    //axios.get(`http://localhost:8000/genero`)
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
    //axios.get(`http://localhost:8000/pais`)
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
    console.log(usuarios);
    if (mostrarOtroGenero && nombre_genero !== "") {
      const nuevoGeneroObj = {
        genero_id: generos.length + 1, // Asigna un nuevo ID único
        nombre_genero: nombre_genero,
      };
      setGeneros([...generos, nuevoGeneroObj]);
    }

    // Agregar el nuevo país a la lista de países
    if (mostrarOtroPais && nombre_pais !== "") {
      const nuevoPaisObj = {
        pais_id: paises.length + 1, // Asigna un nuevo ID único
        nombre_pais: nombre_pais,
      };
      setPaises([...paises, nuevoPaisObj]);
    }
    console.log("ID de usuario antes de setearlo")
    console.log(usuario.usuario_id);
    // setUsuario({
    //   ...usuario,
    //   usuario_id: usuarios.length + 1
    // })


    console.log("Cantidad de usuarios en db.json luego del seteo: " + usuarios.length)
    usuario.usuario_id = usuarios.length + 1
    console.log("Lista de usuarios luego del seteo: ")
    console.log(usuarios)
    console.log("Usuario luego del seteo: ")
    console.log("ID: " + usuario.usuario_id);
    console.log("NOMBRE COMPLETO: " + usuario.nombre_completo);
    console.log("FECHA DE NACIMIENTO: " + usuario.fecha_nacimiento);
    console.log("CORREO ELECTRONICO: " + usuario.correo_electronico);
    console.log("CONTRASEÑA: " + usuario.contraseña);
    console.log("GENERO ID: " + usuario.genero_id);
    console.log("PAIS ID: " + usuario.pais_id);
    setUsuario([...usuario, usuario])
    //axios.post(`http://localhost:8000/usuarios/agregar-usuario/`, usuarios)
    axios.post(`http://localhost:3030/usuarios`, usuario)
      .then(() => {
        alert("Se registro un nuevo usuario");
        navigate('/')
      })
      .catch((error) => {
        console.log("ID: " + usuario.usuario_id);
        console.log("NOMBRE COMPLETO: " + usuario.nombre_completo);
        console.log("FECHA DE NACIMIENTO: " + usuario.fecha_nacimiento);
        console.log("CORREO ELECTRONICO: " + usuario.correo_electronico);
        console.log("CONTRASEÑA: " + usuario.contraseña);
        console.log("GENERO ID: " + usuario.genero_id);
        console.log("PAIS ID: " + usuario.pais_id);
        console.log(usuario);
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
            onChange={(e) => { formularioCambio(e); eventoInputOtro(e) }}
          >
            {generos.map((gen) => (
              <option key={gen.genero_id}
                value={gen.genero_id}
              >{gen.genero_id} - {gen.nombre_genero}</option>
            ))}
            <option value="otro_genero">Otro</option>
          </select>
          {mostrarOtroGenero && (
            <input
              type="text"
              className="nombre_genero"
              name="nombre_genero"
              value={genero.nombre_genero}
              onChange={(e) => { formularioCambio(e); eventoInputOtro(e) }}
            />
          )}

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
          {mostrarOtroPais && (
            <input
              type="text"
              className="nombre_pais"
              name="nombre_pais"
              value={pais.nombre_pais}
              onChange={(e) => formularioCambio(e)}
            />
          )}
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


export default FormularioUsuario;