export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_BOOKS':
      return {
        ...state,
        list: action.payload,
      };
    case 'GET_BOOK':
      return {
        ...state,
        book: action.payload,
      };
    case 'GET_BOOK_WITH_REVIEWER':
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer,
      };
    case 'CLEAR_BOOK_WITH_REVIEWER':
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer,
      };
    case 'ADD_BOOK':
      return {
        ...state,
        newBook: action.payload,
      };
    case 'CLEAR_NEW_BOOK':
      return {
        ...state,
        newBook: action.payload,
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        deletedBook: action.payload.success,
        book: action.payload.data,
      };
    case 'UPDATE_BOOK':
      return {
        ...state,
        updatedBook: action.payload.success,
        newBook: action.payload.data,
      };

    case 'CLEAR_BOOK':
      return {
        ...state,
        book: action.payload.book,
        newBook: action.payload.newBook,
        updatedBook: action.payload.updatedBook,
        deletedBook: action.payload.deletedBook,
      };
    default:
      return state;
  }
}
