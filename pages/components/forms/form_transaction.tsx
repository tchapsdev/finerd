import { useState } from 'react';
import $ from 'jquery';
import { Transaction } from '../../../src/model/transaction';
import TransactionService from '../../../src/service/transaction_service';

const FormTransaction = () => {
  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);
  const initialFormData = new Transaction();  
  initialFormData.id = 0
  initialFormData.transaction_type_id = 1
  initialFormData.category_id = 1
  initialFormData.descritpion = 'Description 1'
  initialFormData.montant =  15000
  initialFormData.date = new Date();
  initialFormData.photo= 'photo 1'

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    let inputType = $(`input[name=${e.target.name}`).attr('type');   
    updateFormData({
      ...formData,  
      // Trimming any whitespace
      [e.target.name]: inputType == 'number'? parseFloat(e.target.value.trim()): e.target.value.trim()
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault()

    const service = new TransactionService();
    service.save(formData)
    console.log(service.getAll()) 
  }


  return (
    <form>      
       <div className='form-group'>
        <label>id</label>
        <input type="number" className='form-control' name='id' onChange={handleChange} readOnly ></input>
      </div>
      <div className='form-group'>
        <label>Transaction type id</label>
        <input type="number" className='form-control' name='transaction_type_id' onChange={handleChange} ></input>
      </div>
      <div className='form-group'>
        <label>Category id</label>
        <input type="number" className='form-control' name="category_id" onChange={handleChange} ></input>
      </div>
      <div className='form-group'>
        <label>Descritpion</label>
        <input type="text" className='form-control' name="descritpion" onChange={handleChange}></input>
      </div>
      <div className='form-group'>
        <label>Montant</label>
        <input type="number" className='form-control' name="montant" onChange={handleChange}></input>
      </div>
      <input type='submit' value='Submit' onClick={handleSubmit} className='btn btn-primary'></input>
    </form>
  );
};

export default FormTransaction;