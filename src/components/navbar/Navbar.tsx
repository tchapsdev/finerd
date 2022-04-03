import MoreIcon from '@mui/icons-material/MoreVert';
import { AppBar, Box, Container, Grid, IconButton, Tab, tabClasses, Tabs, tabsClasses, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import { SyntheticEvent, useContext } from 'react';

import variables from '../../../styles/variables.module.scss';
import { actions, Context } from '../../context/Context';

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

	return (
		<Box sx={{ flexGrow: 1, mb: 10, p: 0 }}>
			<AppBar position="fixed" color="inherit" elevation={0} sx={{ boxShadow: 'none', m: 0, p: 0, pt: 2 }}>
				<Container maxWidth={false}>
					<Toolbar disableGutters={true} variant="dense">
						<Grid container alignItems="center" justifyContent="space-between">
							<Grid item xs={12}>
								<TabContainer
									className="tabs tabs-boxed"
									value={current}
									onChange={handleChange}
									variant="fullWidth"
								>
									{tabs.map((tab, index) => (
										<TabItem className="tab" label={tab} {...indexToProps(index)} />
									))}
									<IconButton edge="end" color="inherit">
										<MoreIcon />
										{/* todo: add handler to open menu with sign up or log out options */}
									</IconButton>
								</TabContainer>
							</Grid>
						</Grid>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};
