import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ListadoUsuario from './componentes/usuario/listado-usuario';
// import FormularioUsuario from './componentes/usuario/formulario-usuario';
// import FormularioGenero from './componentes/genero/formulario-genero';
// import ListadoGenero from './componentes/genero/listado-genero';
// import ListadoPais from './componentes/pais/listado-pais';
import FormularioUsuarioLocal from './componentes/usuario/formulario-usuario-local';
import ListadoUsuarioLocal from './componentes/usuario/listado-usuario-local';
import ListadoGeneroLocal from './componentes/genero/listado-genero-local';
import ListadoPaisLocal  from './componentes/pais/listado-pais-local';

const RouterComponent = () => {
    return (
        <Router>
            <div className="ms-3 mb-3">
                
                {/* <nav className="navbar navbar-expand-lg gap-2 d-md-flex justify-content-center">
                    <Link to='/usuarios' className="nav-link">Usuarios</Link>
                    <Link to='/generos' className="nav-link">Géneros</Link>
                    <Link to='/pais' className="nav-link">Países</Link>
                </nav> */}
                <nav className="navbar navbar-expand-lg gap-2 d-md-flex justify-content-center">
                    <Link to='/usuarios-local' className="nav-link">Lista de usuarios registrados</Link>
                    {/* <Link to='/generos-local' className="nav-link">Géneros Local</Link>
                    <Link to='/pais-local' className="nav-link">Países Local</Link> */}
                </nav>
            </div>
            <div>
                <Routes>
                    {/* LISTADOS */}
                    {/* <Route path='/usuarios' exact element={<ListadoUsuario/>} />
                    <Route path='/generos' exact element={<ListadoGenero/>} />
                    <Route path='/pais' exact element={<ListadoPais/>} /> */}
                    <Route path='/usuarios-local' exact element={<ListadoUsuarioLocal/>} />
                    <Route path='/generos-local' exact element={<ListadoGeneroLocal/>} />
                    <Route path='/pais-local' exact element={<ListadoPaisLocal/>} />

                    {/* FORMULARIOS  */}
                    {/* <Route path='/' exact element={<FormularioUsuario/>} /> */}
                    <Route path='/' exact element={<FormularioUsuarioLocal/>} />
                    {/* <Route path='/usuarios/agregar-usuario' exact element={<FormularioUsuario/>} /> */}
                    <Route path='/usuarios/agregar-usuario-local' exact element={<FormularioUsuarioLocal/>} />
                    {/* <Route path='/genero/agregar-genero' exact element={<FormularioGenero/>}/> */}
                </Routes>
            </div>
        </Router>
    )
}

export default RouterComponent;