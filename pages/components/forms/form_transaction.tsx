import { useState } from 'react';

const FormTransaction = () => {
  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <form>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Full name'
        aria-label='fullname'
      ></input>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Full name'
        aria-label='fullname'
      ></input>
      <label>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        ></input>{' '}
        Not a robot?
      </label>
      <input type='submit' value='Submit' ></input>
    </form>
  );
};

export default FormTransaction;

// import React, { Component } from 'react'

// export default class form_transaction extends Component {
//   render() {
//     return (
//       <div>form_transaction</div>
//     )
//   }
// }

// import React, { Component } from 'react'

// export class form_transaction extends Component {
//   render() {
//     return (
//       <div>form_transaction</div>
//     )
//   }
// }

// export default form_transaction