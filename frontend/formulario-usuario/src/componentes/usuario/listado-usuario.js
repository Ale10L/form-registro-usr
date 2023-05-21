import axios from 'axios'
import React, { useEffect, useState} from 'react'
// import ListadoGenero from '../genero/listado-genero';
// import ListadoPais from "../pais/listado-pais";


const ListadoUsuario = () => {
    const [usuarios, setUsuarios] = useState([])
    const [paises, setPaises] = useState([])
    const [generos, setGeneros] = useState([])

    const obtenerUsuarios = () => {
        axios.get(`http://localhost:8000/usuarios`)
            .then((response) => {
                setUsuarios(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }
    
    const obtenerGeneros = () => {
        axios.get(`http://localhost:8000/genero`)
            .then((response) => {
                setGeneros(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }

    useEffect(() => {
        obtenerGeneros()
    }, [])

    const obtenerPaises = () => {
        axios.get(`http://localhost:8000/pais`)
            .then((response) => {
                setPaises(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }

    useEffect(() => {
        obtenerPaises()
    }, [])

    useEffect(() => {
        obtenerUsuarios()
    }, [])

    return (
        <div className='rom mb-3'>
        <table className='table table-striped table-hover'>
            <thead className='table-dark'>
                <tr>
                    <th className='text-center' scope='col'>ID</th>
                    <th className='text-center' scope='col'>NOMBRE COMPLETO</th>
                    <th className='text-center' scope='col'>CORREO ELECTRONICO</th>
                    <th className='text-center' scope='col'>FECHA DE NACIMIENTO</th>
                    <th className='text-center' scope='col'>CONTRASEÑA</th>
                    <th className='text-center' scope='col'>GENERO</th>
                    <th className='text-center' scope='col'>PAIS</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.usuario_id}>
                        <td className='text-center'>{usuario.usuario_id}</td>
                        <td className='text-center'>{usuario.nombre_completo}</td>
                        <td className='text-center'>{usuario.correo_electronico}</td>
                        <td className='text-center'>{usuario.fecha_nacimiento}</td>
                        <td className='text-center'>{usuario.contraseña}</td>
                        <td className='text-center'>{generos.map((gen) => (usuario.genero_id === gen.genero_id ? gen.nombre_genero : null))}</td>
                        <td className='text-center'>{paises.map((pais) => (usuario.pais_id === pais.pais_id ? pais.nombre_pais : null))}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
  }

  
export default ListadoUsuario;