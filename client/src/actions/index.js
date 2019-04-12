
/*-------------------- BOOKS --------------------*/

export function getBooks(
  limit = 10,
  start = 0,
  order = 'asc',
  list = ''
) {
  // const req = `/api/books?limit=${limit}&skip=${start}&order=${order}`;
  const req = fetch(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(res => res.json())
    .then(json => (
      list ? [...list, ...json.data] : json.data
    ))
    .catch(err => err);

  return {
    type: 'GET_BOOKS',
    payload: req
  }
}

export function getBookWithReviewer(id) {
  const req = fetch(`/api/book/${id}`)

  // Redux Thunk
  return (dispatch) => {
    req
      .then(res => res.json())
      .then(json => {
        let book = json.data;

        fetch(`/api/user/${book.ownerId}`)
          .then(res => res.json())
          .then(json => {
            let response = {
              book,
              reviewer: json
            };
            dispatch({
              type: 'GET_BOOK_WITH_REVIEWER',
              payload: response
            })
          });
      })
  }
}

export function clearBookWithReviewer() {
  return {
    type: 'CLEAR_BOOK_WITH_REVIEWER',
    payload: {
      book: {},
      reviewer: {}
    }
  }
}



/*-------------------- USER --------------------*/

export function loginUser({email, password}) {
  const req = fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email: email.value, password: password.value }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => json);

  return {
    type: 'USER_LOGIN',
    payload: req
  }
}