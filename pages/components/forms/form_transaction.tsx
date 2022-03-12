import { useState } from 'react';

const FormTransaction = () => {
  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <form>
      <div className='form-group'>
      <label>Id</label>
        <input type="number" className='form-control' value={name} onChange={(e) => setName(e.target.value)} placeholder="Id" ></input>
      </div>  
      <div className='form-group'>
      <label>transaction type id</label>
        <input type="number" className='form-control' id="" placeholder="transaction type id" ></input>
      </div>
      <div className='form-group'>
        <label>category id</label>
        <input type="number" className='form-control' id="category_id" placeholder="category id" ></input>
      </div>
      <div className='form-group'>
        <label>descritpion</label>
        <input type="text" className='form-control' id="descritpion" placeholder="descritpion" ></input>
      </div>   
      <div className='form-group'>
        <label>montant</label>
        <input type="number" className='form-control' id="montant" placeholder="1,0000" ></input>
      </div>
      <input type='submit' value='Submit' className='btn btn-primary'></input>
    </form>       
  );
};

export default FormTransaction;