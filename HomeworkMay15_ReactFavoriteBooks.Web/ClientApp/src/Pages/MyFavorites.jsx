import { useEffect, useState } from 'react';
import getAxios from '../AuthAxios';
import FaveBookItem from '../components/FaveBookItem';

const MyFavorites = () => {
    const [faveBooks, setFaveBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFaveBooks = async () => {
        const { data } = await getAxios().get('/api/home/getfavebooks');
        setFaveBooks(data);
        setIsLoading(false);
    }

    useEffect(() => {
        getFaveBooks();
    }, []);
    return (
        <div className='container mt-5'>
            <div style={{ marginTop: 80 }}>
                <h2 className='mb-4 text-info'>My Favorites</h2>
                <div className='row'>
                    {isLoading &&
                        <div className='container text-center' style={{ marginTop: 150 }}>
                            <img src="/src/pages/loadingimage/Dual Ball@1x-1.0s-200px-200px.gif" />
                        </div>
                    }
                    {!isLoading && faveBooks.length > 0 ?
                        faveBooks.map(b => <FaveBookItem key={b.id}
                            book={b}
                            faveBooks={faveBooks}
                            setFaveBooks={setFaveBooks}
                            getFaveBooks={getFaveBooks}                        />)
                        : <div className='container mt-5 text-center' style={{ marginTop: 80 }}>
                            <h1>No Favorite Books</h1>
                        </div>}
                </div>
            </div>
        </div>
    )
}
export default MyFavorites;