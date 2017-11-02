import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Search from "./components/Search/Search";
import ListBooks from "./components/ListBooks/ListBooks";
import {update, getAll} from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

	state = {books: []}

	componentDidMount = () => this.getBooks();

	getBooks = () => getAll().then(books =>
		this.setState({
			books: books.map(book => {
				return {
					...book,
					onShelfChange: this.onShelfChange,
					loading: false
				}
			})
		})
	)

	onShelfChange = async (newShelf, bookId) => {
		this.activateLoading(bookId);
		try {
			await update({id: bookId}, newShelf)
			this.getBooks();
		}
		catch (e) {
			console.log(e)
		}
	}

	activateLoading = (bookId) =>
		this.setState(({books}) => {
			books[books.findIndex(book => book.id === bookId)].loading = true;
			return {books}
		})

	render = () =>
		<BrowserRouter>
			<div className="app">
				<Route exact path="/" render={() =>
					<ListBooks books={this.state.books}/>
				}/>
				<Route exact path="/search" render={() =>
					<Search onShelfChange={this.onShelfChange}/>
				}/>
			</div>
		</BrowserRouter>
}

export default BooksApp