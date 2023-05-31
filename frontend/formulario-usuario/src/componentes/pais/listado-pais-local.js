import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


const ListadoPaisLocal = () => {
    const [paises, setPaises] = useState([])
    
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
        obtenerPaises()
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
                {paises.map((pais) => (
                    <tr key={pais.id}>
                        <td className='text-center text-white'>{pais.id}</td>
                        <td className='text-center text-white'>{pais.nombre_pais}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
  }

  
export default ListadoPaisLocal;