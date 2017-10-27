import React from 'react';

const ShelfChanger = ({onShelfChange, shelf, bookId}) =>
        <div className="book-shelf-changer">
            <select value={shelf} onChange={e => onShelfChange(e.target.value, bookId)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>

export default ShelfChanger;