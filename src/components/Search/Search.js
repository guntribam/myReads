import React from 'react';
import {Link} from  'react-router-dom';
import Book from "../Book/Book";
import {search} from '../../BooksAPI'
import { Debounce } from 'react-throttle';

export default class Search extends React.Component {

    state = {
        books: []
    }

    handleChange = (e) => {
        search(e.target.value,10).then(books => {
            console.log(books)
            if(books.length > 0) return this.setState({books})
        })
    }


    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                     NOTES: The search from BooksAPI is limited to a particular set of search terms.
                     You can find these search terms here:
                     https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                     However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                     you don't find a specific author or title. Every search is limited by search terms.
                     */}
                    <Debounce time="400" handler="onChange">
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={this.handleChange}/>
                    </Debounce>

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books.length > 0
                        ? this.state.books.map(book => <Book {...book} onShelfChange={this.props.onShelfChange}></Book>)
                        : null
                    }
                </ol>
            </div>
        </div>
    }
}