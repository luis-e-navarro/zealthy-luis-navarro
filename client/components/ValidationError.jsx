import React from 'react';

const ValidationError = ({message}) => {
  return (
    <li id='error-message'> Error: {message} !</li>
  );
};

export default ValidationError;
