import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';
import BookItem from '../widgetsUI/BookItem';


class Home extends Component {

  componentDidMount() {
    this.props.dispatch(getBooks(1, 0, 'desc'));
  }

  renderItems = (books) => (
    books.list ?
      books.list.map((book, i) => (
        <BookItem {...book} key={book._id} />
      ))
      : null
  )

  loadMore = () => {
    const count = this.props.books.list.length;
    this.props.dispatch(getBooks(1, count, 'desc', this.props.books.list));
  }

  render() {
    return (
      <div>
        { this.renderItems(this.props.books) }
        <div
          className="loadmore"
          onClick={this.loadMore}
        >Load More</div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(Home)
