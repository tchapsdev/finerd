import React, { useReducer } from 'react';
import Container from '@mui/material/Container';

import { Navbar } from './components/navbar/Navbar';
import { Panel } from './components/panels/Panel';
import { Transactions } from './components/transactions/Transactions';
import { ContextProvider, contextReducer, initialState } from './context/Context';

export const Main = () => {
    const [state, dispatch] = useReducer<any>(contextReducer, initialState);
    const currentPanel: number = (state as any).currentPanel;
    const supportedTransactions = (state as any).supportedTransactions;

    return (
        <ContextProvider value={{ state, dispatch }}>
            <Container maxWidth="sm">
                <Navbar/>
                <Panel value={currentPanel} index={currentPanel}>
                    <Transactions type={supportedTransactions[currentPanel]}/>
                </Panel>
            </Container>
        </ContextProvider>
    );
};

export default Main;
