import React from 'react'
import * as BooksAPI from './BooksAPI'
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import Search from "./components/Search/Search";
import ListBooks from "./components/ListBooks/ListBooks";
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: [],
		searchBooks: [],
		query: ''
	};

	componentDidMount = () => this.getBooks();

	//These method add properties to be used by views
	buildBookForSearch = (searchBook) => {
		const book = this.state.books.find(book => searchBook.id === book.id);
		return book ? {...searchBook, onShelfChange: this.onShelfChange, loading: false, shelf: book.shelf}
					: {...searchBook, onShelfChange: this.onShelfChange, loading: false, shelf: 'none'}
	};

	buildBookForList = (bookObject) => {
		return {...bookObject, onShelfChange: this.onShelfChange, loading: false, isDraggable: true};
	};

	//This method retrieve my books
	getBooks = async () => {
		try {
			const books = await BooksAPI.getAll();
			this.setState({books: books.map(this.buildBookForList)});
		} catch (e) {
			console.log(e);
		}
	};

	//This method retrieve searched books
	onSearch = async (e) => {
		const query = e.target.value;
		if (query !== '') {
			try {
				const searchBooks = await BooksAPI.search(query, 10);
				this.setState({searchBooks: searchBooks.map(this.buildBookForSearch), query});
			} catch (e) {
				console.log(e);
				this.setState({query});
			}
		}
	};

//This method is used to change shelves with the loading animation
	onShelfChange = async (newShelf, bookId) => {
		this.activateLoading(bookId);
		try {
			await BooksAPI.update({id: bookId}, newShelf);
			this.getBooks();
			this.onSearch({target: {value: this.state.query}});
		}
		catch (e) {
			console.log(e);
		}
	};

//Loading animation in all Routes
	activateLoading = (bookId) =>
		this.setState(prevState => {
			const books = prevState.books;
			const book = books[books.findIndex(book => book.id === bookId)];
			if (book) book.loading = true;

			const searchBooks = prevState.searchBooks;
			const searchBook = searchBooks[searchBooks.findIndex(book => book.id === bookId)];
			if (searchBook) searchBook.loading = true;
			return {books, searchBooks};
		});


	render = () =>
		<BrowserRouter>
			<div className="app">
				<Route exact path="/" render={() =>
					<ListBooks books={this.state.books}/>
				}/>
				<Route exact path="/search" render={() =>
					<Search books={this.state.searchBooks}
					        onSearch={this.onSearch}
					        query={this.state.query}/>
				}/>
			</div>
		</BrowserRouter>
}

//This is the HOC of react-dnd used for the drag and drop feature
export default DragDropContext(HTML5Backend)(BooksApp);