import { Grid, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import { actions, Context } from '../../context/Context';
import { TransactionService } from '../../service/TransactionService';

const indexToProps = (index: number) => ({
    'aria-controls': `panel-${index}`,
    id: `navbar-tab-${index}`,
    key: `navbar-tab-${index}`,
});

export const Navbar = () => {
    const {
        state: { currentPanel: current, supportedTransactions: tabs },
        dispatch,
    } = useContext(Context);

    const handleChange = (event: SyntheticEvent, tabIndex: number) => {
        dispatch({ data: tabIndex, type: actions.SET_CURRENT_PANEL });
    };

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const transactionService = new TransactionService();
        setBalance(transactionService.getBalanceByType(tabs[current]));
    }, [current, tabs]);

    return (
        <Grid container alignItems="center" justifyContent="space-between" sx={{ rowGap: 3 }}>
            {/* todo: logo and login menu*/}
            <Grid item xs={12}>
                <Tabs className="tabs tabs-boxed" value={current} onChange={handleChange} centered>
                    {tabs.map((tab, index) => (
                        <Tab className="tab" label={tab} {...indexToProps(index)} />
                    ))}
                </Tabs>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('en-CA', { currency: 'CAD', style: 'currency' }).format(balance)}
                </Typography>
            </Grid>
        </Grid>
    );
};
