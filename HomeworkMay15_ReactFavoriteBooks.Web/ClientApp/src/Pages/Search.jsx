import { useEffect, useState } from 'react';
import './Book.css';
import axios from 'axios';
import getAxios from '../AuthAxios';
import BookItem from "../components/BookItem";

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [faveIds, setFaveIds] = useState([]);

    useEffect(() => {
        const getFaveIds = async () => {
            const { data } = await getAxios().get('/api/home/getfaveids');
            setFaveIds(data);
        }
        getFaveIds();
    }, []);

    const onFormSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        const { data } = await axios.get(`/api/home/search?searchtext=${searchText}`);
        setSearchResults(data);
        setIsLoading(false);
    }

    return (
        <>
            <div className='container' style={{ marginTop: 80 }}>
                <h2>Search Books</h2>
                <form onSubmit={onFormSubmit}>
                    <div className='input-group mb-3'>
                        <input onChange={e => setSearchText(e.target.value)} type='text' className='form-control' placeholder='Enter Author, Title, or ISBN' value={searchText} />
                        <button type='submit' className='btn btn-outline-success'>Search</button>
                    </div>
                </form>
                <div className='row'>
                    {isLoading &&
                        <div className='container text-center' style={{ marginTop: 150 }}>
                            <img src="/src/pages/loadingimage/Dual Ball@1x-1.0s-200px-200px.gif" />
                        </div>
                    }
                    {!isLoading && searchResults.map(r =>
                        <BookItem key={r.id}
                            book={r}
                            isFavorite={faveIds.includes(r.id)}
                            faveIds={faveIds}
                            setFaveIds={setFaveIds} />)}
                </div>
            </div>
        </>
    )
}
export default Search;