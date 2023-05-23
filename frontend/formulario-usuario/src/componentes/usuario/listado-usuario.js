import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import ListadoGenero from '../genero/listado-genero';
// import ListadoPais from "../pais/listado-pais";


const ListadoUsuario = () => {
    const [usuarios, setUsuarios] = useState([])

    const obtenerUsuarios = () => {
        axios.get(`http://localhost:8000/usuarios`)
            .then((response) => {
                setUsuarios(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }

    useEffect(() => {
        obtenerUsuarios()
    }, [])

    return (
        <div className='rom mb-3'>
            <div><button className='btn btn-warning' id='btnVolver'><Link to='/'className='text-black'>Volver</Link></button></div>
            <table className='table table-striped table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th className='text-center' scope='col'>NOMBRE COMPLETO</th>
                        <th className='text-center' scope='col'>CORREO ELECTRONICO</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.usuario_id}>
                            <td className='text-center text-white'>{usuario.nombre_completo}</td>
                            <td className='text-center text-white'>{usuario.correo_electronico}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default ListadoUsuario;