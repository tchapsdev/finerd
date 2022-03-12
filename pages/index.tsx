import React, { useReducer } from 'react';
import Container from '@mui/material/Container';
import { Navbar } from './components/navbar/Navbar';
import { contextReducer, initialState } from './context/Context';

export const Main = () => {
    const [state] = useReducer<any>(contextReducer, initialState);

    console.log('******************************************', state);
    // todo: get transaction from local storage
    // todo: init state with transactions
    // todo: dynamic panes

    const { currentPanel, supportedTransactions } = state as any;

    return (
        <Container maxWidth="sm">
            <Navbar tabs={supportedTransactions} current={currentPanel}/>
        </Container>
    );
};

export default Main;
