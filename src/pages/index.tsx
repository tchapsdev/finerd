import React, { useReducer } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { AppBar, Box, Container, Fab, Grid, Toolbar } from '@mui/material';

import { Navbar } from './components/navbar/Navbar';
import { Panel } from './components/panels/Panel';
import variables from '../../styles/variables.module.scss';
import { Transactions } from './components/transactions/Transactions';
import { ContextProvider, contextReducer, initialState } from './context/Context';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    color: variables.secondaryDark,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.12), 0px 4px 5px 0px rgba(0,0,0,0.10), 0px 1px 10px 0px rgba(0,0,0,0.06)',
});

export const Main = () => {
    const [state, dispatch] = useReducer<any>(contextReducer, initialState);
    const currentPanel: number = (state as any).currentPanel;
    const supportedTransactions = (state as any).supportedTransactions;

    return (
        <ContextProvider value={{ state, dispatch }}>
            <Container maxWidth={false} disableGutters={true}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Navbar/>
                        </Grid>
                        <Grid item xs={12}>
                            <Panel value={currentPanel} index={currentPanel}>
                                <Transactions type={supportedTransactions[currentPanel]}/>
                            </Panel>
                            <AppBar
                                position="fixed"
                                color="inherit"
                                elevation={0}
                                sx={{ top: 'auto', bottom: 0, boxShadow: 'none' }}
                            >
                                <Toolbar>
                                    {/* todo: add onclick action to open add transaction modal */}
                                    <StyledFab aria-label="add">
                                        <AddIcon/>
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
