import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Search from "./components/Search/Search";
import ListBooks from "./components/ListBooks/ListBooks";
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Route exact path="/" component={ListBooks}/>
                    <Route exact path="/search" component={Search}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
