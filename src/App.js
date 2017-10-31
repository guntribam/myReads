import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Search from "./components/Search/Search";
import ListBooks from "./components/ListBooks/ListBooks";
import {update} from './BooksAPI'

import './App.css'

class BooksApp extends React.Component {

    onShelfChange = async (newShelf, bookId) => {
        const books = this.state.books
        const index = books.findIndex(book => book.id === bookId);
        const oldShelf = books[index].shelf;
        books[index].shelf = newShelf;
        this.setState({books});
        try {
            await update(books[index], newShelf)
        }
        catch (e) {
            console.log(e)
            books[index].shelf = oldShelf
            this.setState({books});
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Route exact path="/" render={() =>
                        <ListBooks onShelfChange={this.onShelfChange}/>
                    }/>
                    <Route exact path="/search" render={() =>
                        <Search onShelfChange={this.onShelfChange}/>
                    }/>
                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
