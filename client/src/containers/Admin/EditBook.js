import React, {PureComponent} from 'react';
import FormFields from '../../widgetsUI/FormFields';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getBook, updateBook, clearBook, deletePost} from '../../actions';

class EditBook extends PureComponent {
  state = {
    registerError: '',
    book: this.props.books.book,
    loading: false,
    formData: {
      _id: this.props.match.params.id,
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
        <button type="submit">Edit a Review</button>
        <div className="delete_post">
          <button className="button">Delete review</button>
        </div>
      </div>
    );

  submitForm = event => {
    event.preventDefault();
  };

  componentDidMount() {
    const {id: bookId} = this.props.match.params;
    this.props.dispatch(getBook(bookId));
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {book} = nextProps.books;
    let newFormData = {...state.formData};

    if (book && book !== state.book) {
      for (const prop in book) {
        if (newFormData[prop] && prop != '_id') {
          const newElement = {
            ...newFormData[prop],
          };
          newElement.value = book[prop];
          newFormData[prop] = newElement;
        }
      }

      return {
        book,
        formData: newFormData,
      };
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Edit a Review</h2>
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(EditBook);
