import RouterComponent from './router';

function App() {
  return (
    <div >
      <div>
        <h1 className='titulo'>FORMULARIO DE REGISTRO DE USUARIOS</h1>
      </div>
      <div><button><a href='/'>Volver</a></button></div>
      <div>
        <RouterComponent />
      </div>
    </div>
  );
}

export default App;
