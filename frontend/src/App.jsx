import './App.css'
import { useState } from 'react'
import FormUsuario from './FormUsuario'
import TableUsuario from './TableUsuario'
import FormProduto from './FormProduto'
import TableProduto from './TableProduto'
import FormCompras from './FormCompras'


function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserAdded = () => {
    // Increment to trigger refresh in TableUsuario
    setRefreshTrigger(prev => prev + 1);
  };

 const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

   const handleUserDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleProductDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

 return (
    <div className="geral">
      <h1>Sistema de Vendas</h1>
      
      <div className="forms-container">
        <div className="form-item">
          <h2>Cadastro de Usuários</h2>
          <FormUsuario onUserAdded={handleUserAdded}></FormUsuario>
        </div>
        <div className="form-item">
          <h2>Cadastro de Produtos</h2>
          <FormProduto onProductAdded={handleProductAdded}></FormProduto>
        </div>
        <div className="form-item">
          <h2>Registro de Compras</h2>
          <FormCompras refreshTrigger={refreshTrigger}></FormCompras>
        </div>
      </div>

      <div className="tables-container">
        <div className="table-item">
          <h2>Tabela de Usuários</h2>
          <TableUsuario refreshTrigger={refreshTrigger} onUserDeleted={handleUserDeleted}></TableUsuario>
        </div>
        <div className="table-item">
          <h2>Tabela de Produtos</h2>
          <TableProduto refreshTrigger={refreshTrigger} onProductDeleted={handleProductDeleted}></TableProduto>
        </div>
      </div>
    </div>
  )
}


export default App
