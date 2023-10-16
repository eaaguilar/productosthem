import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import {AuthProvider} from './context/AuthContext'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ProductsPage from './pages/ProductsPage'
import ProductFormPage from './pages/ProductsFormPage'
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>

            {/*Sección de rutas protegidas  */}
            <Route element={<ProtectedRoute />} >
                <Route path='/profile' element={<ProfilePage />}/>
                <Route path='/products' element={<ProductsPage />}/>
                <Route path='/add-product' element={<ProductFormPage />}/>
                <Route path='/products/:id' element={<ProductFormPage />}/>        
            </Route>  
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App