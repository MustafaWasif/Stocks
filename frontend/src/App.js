import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MyStorePage from './components/NavBar';
import AddProductForm from './components/AddProductForm';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/mystore' element={<MyStorePage />}></Route>
        <Route path='/mystore/add' element={<AddProductForm />}></Route>

      </Routes>
    </>

  );
}

export default App;
