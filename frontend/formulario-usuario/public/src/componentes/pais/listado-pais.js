import axios from 'axios'
import React, { useEffect, useState} from 'react'


const ListadoPais = () => {
    const [paises, setPaises] = useState([])
    
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
        obtenerPaises()
    }, [])

    return (
        <div className='rom mb-3'>
        <table className='table table-striped table-hover'>
            <thead className='table-dark'>
                <tr>
                    <th className='text-center' scope='col'>ID</th>
                    <th className='text-center' scope='col'>NOMBRE</th>
                </tr>
            </thead>
            <tbody>
                {paises.map((pais) => (
                    <tr key={pais.pais_id}>
                        <td className='text-center text-white'>{pais.pais_id}</td>
                        <td className='text-center text-white'>{pais.nombre_pais}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
  }

  
export default ListadoPais;