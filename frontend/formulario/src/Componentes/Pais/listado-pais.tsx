"use client"
import axios from 'axios'
import React, { useEffect, useState} from 'react'



export default function Pais() {
    const [paises, setPaises] = useState<any[]>([])
    
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
                        <td className='text-center'>{pais.pais_id}</td>
                        <td className='text-center'>{pais.nombre_pais}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
  }