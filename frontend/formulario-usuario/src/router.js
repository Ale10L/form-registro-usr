import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListadoUsuario from './componentes/usuario/listado-usuario';
import FormularioUsuario from './componentes/usuario/formulario-usuario';
import FormularioGenero from './componentes/genero/formulario-genero';
import ListadoGenero from './componentes/genero/listado-genero';
import ListadoPais from './componentes/pais/listado-pais';

const RouterComponent = () => {
    return (
        <Router>
            <div className="ms-3 mb-3">
                
                <nav className="navbar navbar-expand-lg gap-2 d-md-flex justify-content-center">
                    <Link to='/usuarios' className="nav-link">Usuarios</Link>
                    <Link to='/genero' className="nav-link">Géneros</Link>
                    <Link to='/pais' className="nav-link">Países</Link>
                </nav>
            </div>
            <div>
                <Routes>
                    {/* LISTADOS */}
                    <Route path='/usuarios' exact element={<ListadoUsuario/>} />
                    <Route path='/generos' exact element={<ListadoGenero/>} />
                    <Route path='/pais' exact element={<ListadoPais/>} />

                    {/* FORMULARIOS  */}
                    <Route path='/' exact element={<FormularioUsuario/>} />
                    <Route path='/usuarios/agregar-usuario' exact element={<FormularioUsuario/>} />
                    <Route path='/genero/agregar-genero' exact element={<FormularioGenero/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default RouterComponent;