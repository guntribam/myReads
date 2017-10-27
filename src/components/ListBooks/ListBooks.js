import React from 'react';
import Bookshelf from "../Bookshelf/Bookshelf";
import {getAll, update} from '../../BooksAPI'
import Header from "../Header/header";
import SearchButton from "../SearchButton/SearchButton";

const bookshelves = [
    "Currently Reading",
    "Want to read",
    "Read"
]

export default class ListBooks extends React.Component {
    state = {books: []}

    getBooks = () => getAll().then(books => {
        console.log("GetAll ", books)
        this.setState({books})
    });

    format = (text) => text.toUpperCase().replace(/\s/g, "")

    filterBookPerShelf = (book, shelf) => this.format(book.shelf) === this.format(shelf)

     onShelfChange = async (newShelf, bookId) => {
        const newBooks = this.state.books
        const index = newBooks.findIndex(book => book.id === bookId);
        const oldShelf = newBooks[index].shelf;
        newBooks[index].shelf = newShelf;
        this.setState({books: newBooks});
        try {await update(newBooks[index], newShelf)}
        catch (e) {
            console.log(e)
            newBooks[index].shelf = oldShelf
            this.setState({books: newBooks});
        }
    }

    componentDidMount = () => this.getBooks();

    render = () =>
        <div className="list-books">
            <Header/>
            <div className="list-books-content">
                <div>
                    {bookshelves.map((shelf, index) =>
                        <Bookshelf
                            key={index}
                            title={shelf}
                            books={this.state.books.filter(book => this.filterBookPerShelf(book, shelf))}
                            onShelfChange={this.onShelfChange}
                            bookshelves={bookshelves}
                        />)
                    }
                </div>
            </div>
            <SearchButton/>
        </div>
}