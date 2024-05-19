import { useAuth } from '../FavoriteBooksContext';
import getAxios from '../AuthAxios';
import { useNavigate } from 'react-router-dom';

const BookItem = ({ book, isFavorite, faveIds, setFaveIds }) => {
    const { id, title, author, coverUrl } = book;

    const navigate = useNavigate();

    const { user } = useAuth();
    const isLoggedIn = !!user;

    const onAddClick = async () => {
       setFaveIds([...faveIds, id]);
        await getAxios().post('/api/home/addtofavorites', { id, title, author, coverUrl });
        navigate('/search');
    }
    const onRemoveClick = async id => {
        const ids = faveIds.filter(i => i !== id);
        setFaveIds(ids);
        await getAxios().post('/api/home/removefromfavorites', { id });
        navigate('/search');
    }

    return (
        <div className='col-md-4 mb-3'>
            <div className='card h-100'>
                <div className='book-image'>
                    <img src={coverUrl} className='card-image-top' alt={title} style={{ maxHeight: '100vh', maxWidth: '100vh', objectFit: 'contain' }} />
                </div>
                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>{title}</h5>
                    <p className='card-text'>By: {author}</p>
                    {!isLoggedIn && <button disabled className='btn btn-primary mt-auto'>Log In to {isFavorite ? 'Remove From' : 'Add To'} Faves</button>}
                    {isLoggedIn && (!isFavorite ? <button onClick={onAddClick} className='btn btn-outline-primary mt-auto'>Add To Favorites</button>
                        : <button onClick={() => onRemoveClick(id)} className='btn btn-outline-danger mt-auto'>Remove From Favorites</button>)}
                </div>
            </div>
        </div>
    )
}
export default BookItem;
