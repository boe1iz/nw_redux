import React from 'react';

const TextInput = ({ name, label, onChange, placeHolder, value, error }) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}></label>
      <div classname="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-red">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
