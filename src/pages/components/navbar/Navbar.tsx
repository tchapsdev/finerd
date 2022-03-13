import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';

import { actions, Context } from '../../context/Context';
import { TransactionService } from '../../../service/TransactionService';

const indexToProps = (index: number) => ({
    id: `navbar-tab-${index}`,
    'aria-controls': `panel-${index}`,
    key: `navbar-tab-${index}`,
});

export const Navbar = () => {
    const {
        state: { currentPanel: current, supportedTransactions: tabs },
        dispatch,
    } = useContext(Context);

    const handleChange = (event: SyntheticEvent, tabIndex: number) => {
        dispatch({ type: actions.SET_CURRENT_PANEL, data: tabIndex });
    };

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const transactionService = new TransactionService();
        setBalance(transactionService.getBalanceByType(tabs[current]));
    }, [current, tabs]);

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ rowGap: 5 }}>
                {/* todo: logo and login menu*/}
                <Grid item xs={12}>
                    <Tabs className="tabs tabs-boxed" value={current} onChange={handleChange} centered>
                        {
                            tabs.map((tab, index) => (
                                <Tab className="tab" label={tab} {...indexToProps(index)} />
                            ))
                        }
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2" align="center" gutterBottom={true} sx={{ fontWeight: 'bold' }}>
                        {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(balance)}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
