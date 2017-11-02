import React from 'react';
import Bookshelf from "../Bookshelf/Bookshelf";
import Header from "../Header/header";
import SearchButton from "../SearchButton/SearchButton";

const bookshelves = [
    {title: "Currently Reading", value: "currentlyReading"},
    {title: "Want to read", value: "wantToRead"},
    {title: "Read", value: "read"}
]

const ListBooks = ({books}) =>
    <div className="list-books">
        <Header/>
        <div className="list-books-content">
            <div>
                {bookshelves.map((shelf, index) =>
                    <Bookshelf
                        key={index}
                        title={shelf.title}
                        books={books.filter(book => book.shelf === shelf.value)}
                    />)
                }
            </div>
        </div>
        <SearchButton/>
    </div>

export default ListBooks;