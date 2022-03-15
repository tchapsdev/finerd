import AddIcon from '@mui/icons-material/Add';
import { AppBar, Box, Container, Fab, Grid, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useReducer } from 'react';

import { Navbar } from './components/navbar/Navbar';
import { Panel } from './components/panels/Panel';
import { Transactions } from './components/transactions/Transactions';
import { ContextProvider, contextReducer, initialState } from './context/Context';

const StyledFab = styled(Fab)({
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.14), 0px 4px 5px 0px rgba(0,0,0,0.12), 0px 1px 10px 0px rgba(0,0,0,0.08)',
    left: 0,
    margin: '0 auto',
    position: 'absolute',
    right: 0,
    top: -30,
    zIndex: 1,
});

export const Main = () => {
    const [state, dispatch] = useReducer<any>(contextReducer, initialState);
    const currentPanel: number = (state as any).currentPanel;
    const supportedTransactions = (state as any).supportedTransactions;

    return (
        <ContextProvider value={{ dispatch, state }}>
            <Container maxWidth={false} disableGutters={true}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Navbar />
                        </Grid>
                        <Grid item xs={12}>
                            <Panel value={currentPanel} index={currentPanel}>
                                <Transactions type={supportedTransactions[currentPanel]} />
                            </Panel>
                            <AppBar
                                position="fixed"
                                color="inherit"
                                elevation={0}
                                sx={{ bottom: 0, boxShadow: 'none', top: 'auto' }}
                            >
                                <Toolbar>
                                    {/* todo: add onclick action to open add transaction modal */}
                                    <StyledFab color="primary" aria-label="add">
                                        <AddIcon />
                                    </StyledFab>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ContextProvider>
    );
};

export default Main;
