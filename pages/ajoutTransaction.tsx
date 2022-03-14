import React from 'react';

import  BackButton  from './components/header/header';
import  {Sample}  from './components/categoryList/categoryList';
import  RadioButtonsGroup  from './components/typePaiement/typePaiement';
import  BasicTextFields  from './components/amount/amount';
import  BasicButtons  from './components/saveButton/saveButton';

export default function Home() {
    return (
        <div>
            <BackButton/>
            <Sample/>
            <BasicTextFields/>
            <RadioButtonsGroup/>
            <BasicButtons/>
        </div>
    )
}
