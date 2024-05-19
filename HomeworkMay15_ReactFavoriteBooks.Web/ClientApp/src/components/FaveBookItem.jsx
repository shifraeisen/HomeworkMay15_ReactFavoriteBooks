import getAxios from "../AuthAxios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FaveBookItem = ({ book, faveBooks, setFaveBooks, getFaveBooks }) => {
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [showingNote, setShowingNote] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [addNote, setAddNote] = useState('');

    const { id, title, author, coverUrl, note } = book;

    const navigate = useNavigate();

    const onRemoveClick = async id => {
        setFaveBooks(faveBooks.filter(b => b.id !== id));
        await getAxios().post('/api/home/removefromfavorites', { id });
        navigate('/myfavorites');
    }
    const onAddClick = async id => {
        setIsAddingNote(false);
        setIsEditing(false);
        await getAxios().post('/api/home/addnote', { id, addNote });
        getFaveBooks();
    }
    const onCancelClick = () => {
        setIsAddingNote(false);
        setIsEditing(false);
        setShowingNote(false);
    }
    const onEditClick = () => {
        setIsEditing(true);
        setAddNote(note);
    }

    return (
        <div className='col-md-4 mb-4'>
            <div className='card h-100 shadow-sm border-0'>
                <div className='position-relative text-center'>
                    <img src={coverUrl} className='card-image-top' alt={title} style={{ height: 200, objectFit: 'contain' }} />
                    <button onClick={() => onRemoveClick(id)} className='btn btn-outline-danger btn-sm position-absolute top-0 end-0 m-2'><i className="bi bi-trash"></i></button>
                </div>
                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title text-truncate'>{title}</h5>
                    <p className='card-text text-muted'>By: {author}</p>
                </div>
                <div className='mt-auto'>
                    {!note && <button onClick={() => setIsAddingNote(true)} className='btn btn-outline-info w-100 mb-2'>Add Note</button>}
                    {!!note &&
                        <>
                        <button onClick={() => setShowingNote(!showingNote)} className='btn btn-outline-secondary w-100 mb-2'>{(!showingNote || isEditing) ? 'Show Note' : 'Hide Note'}</button>
                            <button onClick={onEditClick} className='btn btn-outline-warning w-100'>Edit Note</button>
                        </>}
                </div>
                {(isAddingNote || isEditing) &&
                    <div className='mt-3'>
                        <textarea value={addNote} onChange={e => setAddNote(e.target.value)} className='form-control' rows='3' placeholder="Add Note Here" />
                        <div className='d-flex justify-content-between mt-2'>
                            <button onClick={() => onAddClick(id)} className='btn btn-outline-success'>{isAddingNote ? 'Add' : 'Save Note'}</button>
                            <button onClick={onCancelClick} className='btn btn-outline-dark ms-2'>Cancel</button>
                        </div>
                    </div>}
                {(showingNote && !isEditing)  && <><h6>Note</h6><p>{note}</p></>}
            </div>
        </div>
    )
}
export default FaveBookItem;