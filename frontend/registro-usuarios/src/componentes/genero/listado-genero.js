import axios from 'axios'
import React, { useEffect, useState} from 'react'


const ListadoGenero = () => {
    const [generos, setGeneros] = useState([])
    
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

    useEffect(() => {
        obtenerGeneros()
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
                {generos.map((gen) => (
                    <tr key={gen.genero_id}>
                        <td className='text-center text-white'>{gen.genero_id}</td>
                        <td className='text-center text-white'>{gen.nombre_genero}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
  }

  
export default ListadoGenero