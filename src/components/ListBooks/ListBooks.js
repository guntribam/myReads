import React from 'react';
import Bookshelf from "../Bookshelf/Bookshelf";
import {getAll} from '../../BooksAPI'
import Header from "../Header/header";
import SearchButton from "../SearchButton/SearchButton";

const bookshelves = [
    {title: "Currently Reading", value: "currentlyReading"},
    {title: "Want to read", value: "wantToRead"},
    {title: "Read", value: "read"}
]

export default class ListBooks extends React.Component {
    state = {books: []}

    componentDidMount = () => this.getBooks();

    getBooks = () => getAll().then(books => this.setState({books}));

    render = () =>
        <div className="list-books">
            <Header/>
            <div className="list-books-content">
                <div>
                    {bookshelves.map((shelf, index) =>
                        <Bookshelf
                            key={index}
                            title={shelf.title}
                            books={this.state.books.filter(book => book.shelf === shelf.value)}
                            onShelfChange={this.onShelfChange}
                        />)
                    }
                </div>
            </div>
            <SearchButton/>
        </div>
}