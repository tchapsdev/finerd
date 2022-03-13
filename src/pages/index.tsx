import React, { useReducer } from 'react';
import { Box, Container, Grid } from '@mui/material';

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
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Navbar/>
                        </Grid>
                        <Grid item xs={12}>
                            <Panel value={currentPanel} index={currentPanel}>
                                <Transactions type={supportedTransactions[currentPanel]}/>
                            </Panel>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ContextProvider>
    );
};

export default Main;
