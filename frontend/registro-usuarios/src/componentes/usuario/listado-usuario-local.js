import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ListadoUsuarioLocal = () => {
    const [usuarios, setUsuarios] = useState([])
    const [generos, setGeneros] = useState([])
    const [paises, setPaises] = useState([])
    const obtenerUsuarios = () => {
        axios.get(`http://localhost:3030/usuarios-local`)
            .then((response) => {
                setUsuarios(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }
    const obtenerGeneros = () => {
        axios.get(`http://localhost:3030/generos-local`)
            .then((response) => {
                setGeneros(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }
    const obtenerPaises = () => {
        axios.get(`http://localhost:3030/pais-local`)
            .then((response) => {
                setPaises(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }

    useEffect(() => {
        obtenerUsuarios()
    }, [])
    useEffect(() => {
        obtenerGeneros()
    }, [])
    useEffect(() => {
        obtenerPaises()
    }, [])

    return (
        <div className='row'>
            <div><button className='btn btn-warning' id='btnVolver'><Link to='/usuarios/agregar-usuario-local'className='text-black'>Volver</Link></button></div>
            <table className='table table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th className='text-center' scope='col'>NOMBRE COMPLETO</th>
                        <th className='text-center' scope='col'>CORREO ELECTRONICO</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td className='text-center text-white'>{usuario.nombre_completo}</td>
                            <td className='text-center text-white'>{usuario.correo_electronico}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default ListadoUsuarioLocal;