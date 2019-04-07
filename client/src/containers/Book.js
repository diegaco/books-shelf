import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getBookWithReviewer, clearBookWithReviewer } from '../actions'

class Book extends Component {

  componentDidMount() {
    this.props.dispatch(getBookWithReviewer(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearBookWithReviewer());
  }

  renderBook = ({ book, reviewer }) => (
    book ?
      <div className="br_container">
        <div className="br_header">
          <h2>{book.name}</h2>
          <h5>{book.author}</h5>
          <div className="br_reviewer">
            <span>Review by: </span> {reviewer.name} {reviewer.lastname}
          </div>
        </div>
        <div className="br_review">
          {book.review}
        </div>
        <div className="br_box">
          <div className="left">
            <div className="">
              <span>Pages: </span> {book.pages}
            </div>
            <div>
              <span>Price: </span> {book.price}
            </div>
          </div>
          <div className="right">
            <span>Rating</span>
            <div>{book.rating}</div>
          </div>
        </div>
      </div>
    :
    null
  );

  render() {
    let { books } = this.props;
    return (
      <div>
        {this.renderBook(books)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
};

export default connect(mapStateToProps)(Book);