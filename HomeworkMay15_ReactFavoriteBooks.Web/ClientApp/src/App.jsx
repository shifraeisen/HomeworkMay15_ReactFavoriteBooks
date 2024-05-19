import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import { FavoriteBooksContextComponent } from './FavoriteBooksContext';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Search from './Pages/Search';
import Logout from './Pages/Logout';
import PrivateRoute from './components/PrivateRoute';
import MyFavorites from './Pages/MyFavorites';

const App = () => {
    return (
        <FavoriteBooksContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/myfavorites' element={
                        <PrivateRoute>
                            <MyFavorites />
                        </PrivateRoute>
                    } />
                </Routes>
            </Layout>
        </FavoriteBooksContextComponent>
    );
}

export default App;