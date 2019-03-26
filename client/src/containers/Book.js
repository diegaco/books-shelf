import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getBookWithReviewer } from '../actions'

class Book extends Component {

  componentDidMount() {
    this.props.dispatch(getBookWithReviewer(this.props.match.params.id));
  }

  render() {
    return (
      <div>
        { this.renderBook}
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