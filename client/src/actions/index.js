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