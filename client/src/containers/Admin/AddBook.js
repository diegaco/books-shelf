import React, {Component} from 'react';
import FormFields from '../../widgetsUI/FormFields';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addBook, clearNewBook} from '../../actions';

class AddBook extends Component {
  state = {
    registerError: '',
    loading: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      author: {
        element: 'input',
        value: '',
        validation: {
          required: true,
        },
        config: {
          name: 'author_input',
          type: 'text',
          placeholder: 'Enter author',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      review: {
        element: 'textarea',
        value: '',
        validation: {
          required: true,
        },
        config: {
          name: 'review_input',
          type: '',
          placeholder: 'Enter review',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      pages: {
        element: 'input',
        value: '',
        validation: {
          required: true,
        },
        config: {
          name: 'pages_input',
          type: 'number',
          placeholder: 'Enter pages',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      rating: {
        element: 'select',
        value: '',
        options: [['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5]],
        validation: {
          required: true,
        },
        config: {
          name: 'rating_input',
          type: '',
          placeholder: 'Enter Rating',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      price: {
        element: 'input',
        value: '',
        validation: {
          required: true,
        },
        config: {
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter Price',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  handleFormChange = element => {
    const newFormData = {
      ...this.state.formData,
    };

    const newElement = {
      ...newFormData[element.id],
    };

    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData,
    });
  };

  validate = element => {
    let error = [true, ''];

    // validate email
    if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const msg = `${!valid ? 'Must enter a valid email' : ''}`;
      error = !valid ? [valid, msg] : error;
    }

    // validate password
    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const msg = `${!valid ? 'Must be greater than 5' : ''}`;
      error = !valid ? [valid, msg] : error;
    }

    // validate required
    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const msg = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, msg] : error;
    }
    return error;
  };

  submitButton = () =>
    this.state.loading ? (
      'loading'
    ) : (
      <div>
        <button type="submit">Add a Review</button>
      </div>
    );

  submitForm = event => {
    event.preventDefault();
    this.props.dispatch(
      addBook({
        ...this.state.formData,
        ownerId: this.props.user.login.id,
      }),
    );
  };

  showNewBook = newBook =>
    newBook.success ? (
      <div className="conf_link">
        New Book was added <br />
        <Link to={`/books/${newBook.bookId}`}>See the New Book</Link>
      </div>
    ) : (
      'no book'
    );

  componentWillUnmount() {
    this.props.dispatch(clearNewBook());
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a Review</h2>
          <div className="form_element">
            <FormFields
              id="name"
              formData={this.state.formData.name}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          <div className="form_element">
            <FormFields
              id="author"
              formData={this.state.formData.author}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          <div className="form_element">
            <FormFields
              id="review"
              formData={this.state.formData.review}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          <div className="form_element">
            <FormFields
              id="pages"
              formData={this.state.formData.pages}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          <div className="form_element">
            <FormFields
              id="rating"
              formData={this.state.formData.rating}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          <div className="form_element">
            <FormFields
              id="price"
              formData={this.state.formData.price}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          {this.submitButton()}

          {this.props.book.newBook
            ? this.showNewBook(this.props.book.newBook)
            : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.books,
  };
};

export default connect(mapStateToProps)(AddBook);
