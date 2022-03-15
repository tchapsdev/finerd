import React from 'react';
import Button from '@mui/material/Button';



export const DeleteTransaction_Card = () => deleteTransaction_Card() ; 

export  function deleteTransaction_Card() {
  return (
  
    <div>
      <div className="stat w-full place-items-center ">
          <h1 className="text-black"> Do you really want to delete this transaction ? </h1>
          <div className="tabs tabs-boxed bg-error mb-1 mt-1"  >  
            <Button variant="contained" >  delete </Button>
          </div>
          <div className="tabs tabs-boxed bg-base-content mx-auto "  >  
            <Button variant="contained"> cancel </Button>
          </div>
      </div>
    </div>
  );
}