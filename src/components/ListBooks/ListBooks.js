import React from 'react';
import Bookshelf from "../Bookshelf/Bookshelf";
import {getAll} from '../../BooksAPI'
import Header from "../Header/header";
import SearchButton from "../SearchButton/SearchButton";

const bookshelves = [
    "Currently Reading",
    "Want to read",
    "Read"
]

export default class ListBooks extends React.Component {
    state = {books: []}

    componentDidMount = () => getAll().then(books => this.setState({books}));

    format = (text) => text.toUpperCase().replace(/\s/g, "")

    filterBookPerShelf = (book, shelf) => this.format(book.shelf) === this.format(shelf)

    onShelfChange = (newShelf, bookId) => {
        let newBooks =  this.state.books;
        console.log("OLHA O OBJECTO", newBooks[newBooks.findIndex(book => book.id === bookId)])
        console.log("olha o shelf que veio ", newShelf)
        console.log("olha o bookID que veio ", bookId)
        newBooks[newBooks.findIndex(book => book.id === bookId)].shelf = newShelf;
        this.setState({books: newBooks})
    }

    render = () =>
        <div className="list-books">
            <Header/>
            <div className="list-books-content">
                <div>
                    {bookshelves.map((shelf,index) =>
                        <Bookshelf
                            key={index}
                            title={shelf}
                            books={this.state.books.filter(book => this.filterBookPerShelf(book, shelf))}
                            onShelfChange={this.onShelfChange}
                        />)
                    }
                </div>
            </div>
            <SearchButton/>
        </div>
}