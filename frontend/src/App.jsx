import './App.css'
import { useState } from 'react'
import FormUsuario from './FormUsuario'
import TableUsuario from './TableUsuario'
import FormProduto from './FormProduto'
import TableProduto from './TableProduto'


function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserAdded = () => {
    // Increment to trigger refresh in TableUsuario
    setRefreshTrigger(prev => prev + 1);
  };

 const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <h1>Seja bem vindo!</h1>
      <p>Desenvolva seu website usando React!</p>
      <FormUsuario onUserAdded={handleUserAdded}></FormUsuario>
      <TableUsuario refreshTrigger={refreshTrigger}></TableUsuario>
      <FormProduto onProductAdded={handleProductAdded}></FormProduto>
      <TableProduto refreshTrigger={refreshTrigger}></TableProduto>
    </>
  )
}

export default App
