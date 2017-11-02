import React from 'react';
import BookGrid from "../BookGrid/BookGrid";

const BookShelf = ({title, books}) =>
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <BookGrid books={books}/>
        </div>
    </div>

export default BookShelf;