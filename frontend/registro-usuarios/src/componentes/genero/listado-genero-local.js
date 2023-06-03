import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const ListadoGeneroLocal = () => {
    const [generos, setGeneros] = useState([])
    
    const obtenerGeneros = () => {
        axios.get(`http://localhost:3030/generos-local`)
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

    return (
        <div className='rom mb-3'>
            <div><button className='btn btn-warning' id='btnVolver'><Link to='/usuarios/agregar-usuario-local'className='text-black'>Volver</Link></button></div>
        <table className='table table-striped table-hover'>
            <thead className='table-dark'>
                <tr>
                    <th className='text-center' scope='col'>ID</th>
                    <th className='text-center' scope='col'>NOMBRE</th>
                </tr>
            </thead>
            <tbody>
                {generos.map((gen) => (
                    <tr key={gen.id}>
                        <td className='text-center text-white'>{gen.id}</td>
                        <td className='text-center text-white'>{gen.nombre_genero}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
  }

  
export default ListadoGeneroLocal