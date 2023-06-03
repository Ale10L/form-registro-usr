import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ListadoUsuario = () => {
    const [usuarios, setUsuarios] = useState([])
    const [generos, setGeneros] = useState([])
    const [paises, setPaises] = useState([])
    const obtenerUsuarios = () => {
        axios.get(`http://localhost:8000/usuarios`)
        //axios.get(`http://localhost:3030/usuarios`)
            .then((response) => {
                setUsuarios(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }
    const obtenerGeneros = () => {
        axios.get(`http://localhost:8000/genero`)
        //axios.get(`http://localhost:3030/genero`)
            .then((response) => {
                setGeneros(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }
    const obtenerPaises = () => {
        axios.get(`http://localhost:8000/pais`)
        //axios.get(`http://localhost:3030/pais`)
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
            <div><button className='btn btn-warning' id='btnVolver'><Link to='/'className='text-black'>Volver</Link></button></div>
            <table className='table table-striped table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th className='text-center' scope='col'>ID</th>
                        <th className='text-center' scope='col'>NOMBRE COMPLETO</th>
                        <th className='text-center' scope='col'>CORREO ELECTRONICO</th>
                        <th className='text-center' scope='col'>GENERO</th>
                        <th className='text-center' scope='col'>PAIS</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.usuario_id}>
                            <td className='text-center text-white'>{usuario.usuario_id}</td>
                            <td className='text-center text-white'>{usuario.nombre_completo}</td>
                            <td className='text-center text-white'>{usuario.correo_electronico}</td>
                            <td className='text-center text-white'>{generos.map((gen) => (gen.genero_id === usuario.genero_id ? gen.nombre_genero : ''))}</td>
                            <td className='text-center text-white'>{paises.map((pais) => (pais.pais_id === usuario.pais_id ? pais.nombre_pais : ''))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default ListadoUsuario;