import { Grid, Tab, tabClasses, Tabs, tabsClasses, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import variables from '../../../styles/variables.module.scss';
import { actions, Context } from '../../context/Context';
import { TransactionService } from '../../service/TransactionService';
import { Menubar } from './menubar/Menubar';

const TabItem = styled(Tab)(`
    margin: auto;
    min-height: 40px;
    
    &:hover,
    &:focus,
    &.${tabClasses.selected} {
        border-radius: 3px;
        background-color: ${variables.primary};
        color: #fff;
        -webkit-transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
`);

const TabContainer = styled(Tabs)(`
    .${tabsClasses.indicator} {
        display: none;
    }
`);

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
		<Menubar>
			<Grid container alignItems="center" justifyContent="center" sx={{ rowGap: 3 }}>
				<Grid item xs={12}>
					<TabContainer className="tabs tabs-boxed" value={current} onChange={handleChange} centered>
						{tabs.map((tab, index) => (
							<TabItem className="tab" label={tab} {...indexToProps(index)} />
						))}
					</TabContainer>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
						{new Intl.NumberFormat('en-CA', { currency: 'CAD', style: 'currency' }).format(balance)}
					</Typography>
				</Grid>
			</Grid>
		</Menubar>
	);
};
