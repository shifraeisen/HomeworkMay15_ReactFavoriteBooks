import React, { createContext, useContext, useEffect, useState } from 'react';
import getAxios from './AuthAxios';

const FavoriteBooksContext = createContext();

const FavoriteBooksContextComponent = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await getAxios().get('/api/account/getcurrentuser');
                setUser(data);
            }
            catch {
            }
            setIsLoading(false);
        }

        getUser();
    }, []);


    if (isLoading) {
        return (
            <div className='container text-center' style={{ marginTop: 250 }}>
                <img src="/src/pages/loadingimage/Dual Ball@1x-1.0s-200px-200px.gif" />
            </div>
        )
    }

    return <FavoriteBooksContext.Provider value={{ user, setUser }}>
        {children}
    </FavoriteBooksContext.Provider>

}

const useAuth = () => useContext(FavoriteBooksContext);


export { FavoriteBooksContextComponent, useAuth };