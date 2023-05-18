"use client"
import axios from 'axios'
import React, { useEffect, useState} from 'react'



export default function Genero() {
    const [generos, setGeneros] = useState<any[]>([])
    
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
                        <td className='text-center'>{gen.genero_id}</td>
                        <td className='text-center'>{gen.nombre_genero}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
  }