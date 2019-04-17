/*-------------------- BOOKS --------------------*/

export function getBooks(limit = 10, start = 0, order = 'asc', list = '') {
  // const req = `/api/books?limit=${limit}&skip=${start}&order=${order}`;
  const req = fetch(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(res => res.json())
    .then(json => {
      return list ? [...list, ...json.data] : json.data;
    })
    .catch(err => err);

  return {
    type: 'GET_BOOKS',
    payload: req,
  };
}

export function getBookWithReviewer(id) {
  const req = fetch(`/api/book/${id}`);

  // Redux Thunk
  return dispatch => {
    req
      .then(res => res.json())
      .then(json => {
        let book = json.data;

        fetch(`/api/user/${book.ownerId}`)
          .then(res => res.json())
          .then(json => {
            let response = {
              book,
              reviewer: json,
            };
            dispatch({
              type: 'GET_BOOK_WITH_REVIEWER',
              payload: response,
            });
          });
      });
  };
}

export function clearBookWithReviewer() {
  return {
    type: 'CLEAR_BOOK_WITH_REVIEWER',
    payload: {
      book: {},
      reviewer: {},
    },
  };
}

export function addBook({name, author, review, pages, rating, price, ownerId}) {
  const req = fetch('/api/book', {
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      author: author.value,
      review: review.value,
      pages: pages.value,
      rating: rating.value,
      price: price.value,
      ownerId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => json);

  return {
    type: 'ADD_BOOK',
    payload: req,
  };
}

export function clearNewBook() {
  return {
    type: 'CLEAR_NEW_BOOK',
    payload: {},
  };
}

export function getBook(id) {
  const req = fetch(`/api/book/${id}`)
    .then(res => res.json())
    .then(json => json.data);

  return {
    type: 'GET_BOOK',
    payload: req,
  };
}

export function updateBook(data) {
  const req = fetch(`/api/book/${data._id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => json.data);
  return {
    type: 'UPDATE_BOOK',
    payload: req,
  };
}

/*-------------------- USER --------------------*/

export function loginUser({email, password}) {
  const req = fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({email: email.value, password: password.value}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => json);

  return {
    type: 'USER_LOGIN',
    payload: req,
  };
}

export function auth() {
  const req = fetch('/api/private')
    .then(res => res.json())
    .then(json => json);

  return {
    type: 'USER_AUTH',
    payload: req,
  };
}

export function getUserPosts(userId) {
  const req = fetch(`/api/books?user=${userId}`)
    .then(res => res.json())
    .then(json => json.data);

  return {
    type: 'GET_USER_POSTS',
    payload: req,
  };
}
