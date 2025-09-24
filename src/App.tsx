import { Routes, Route, Navigate } from 'react-router-dom'
import { Inicio } from './components/Inicio'
import { MinhasFotos } from './components/MinhasFotos'
import { VerFotosEnviadas } from './components/VerFotosEnviadas'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/my-photos" element={
          <ProtectedRoute>
            <MinhasFotos />
          </ProtectedRoute>
        } />
        <Route path="/shared-photos" element={
          <ProtectedRoute>
            <VerFotosEnviadas />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
