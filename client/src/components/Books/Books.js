import React from 'react';
import Book from '../../containers/Book';

const Books = (props) => {
  return (
    <div>
      <Book {...props} />
    </div>
  );
};

export default Books;