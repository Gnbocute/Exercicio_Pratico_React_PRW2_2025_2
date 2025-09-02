import './App.css'
import { useState } from 'react'
import FormUsuario from './FormUsuario'
import TableUsuario from './TableUsuario'
import FormProduto from './FormProduto'
import TableProduto from './TableProduto'
import FormCompras from './FormCompras'

function App() {
  // contador para forçar recarregar dados nas tabelas
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => setRefresh(prev => prev + 1);

  return (
    <div className="geral">
      <h1>Sistema de Vendas</h1>
      
      <div className="forms-container">
        <div className="form-item">
          <h2>Cadastro de Usuários</h2>
          <FormUsuario onChangeData={handleRefresh} />
        </div>
        <div className="form-item">
          <h2>Cadastro de Produtos</h2>
          <FormProduto onChangeData={handleRefresh} />
        </div>
        <div className="form-item">
          <h2>Registro de Compras</h2>
          <FormCompras onChangeData={handleRefresh} />
        </div>
      </div>

      <div className="tables-container">
        <div className="table-item">
          <h2>Tabela de Usuários</h2>
          <TableUsuario refresh={refresh} />
        </div>
        <div className="table-item">
          <h2>Tabela de Produtos</h2>
          <TableProduto refresh={refresh} />
        </div>
      </div>
    </div>
  )
}

export default App
