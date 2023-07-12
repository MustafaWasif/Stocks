import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MyStorePage from './components/MyStorePage';
import AddProductForm from './components/AddProductForm';
import ViewIndividualProduct from './components/ViewIndividualProduct';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/mystore' element={<MyStorePage />}></Route>
        <Route path='/mystore/add' element={<AddProductForm />}></Route>
        <Route path='/mystore/view/:productId' element={<ViewIndividualProduct />}></Route>
      </Routes>
    </>

  );
}

export default App;
