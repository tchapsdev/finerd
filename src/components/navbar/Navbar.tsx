import MoreIcon from '@mui/icons-material/MoreVert';
import {
	AppBar,
	Box,
	Container,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Tab,
	tabClasses,
	Tabs,
	tabsClasses,
	Toolbar,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { MouseEvent, SyntheticEvent, useContext, useEffect, useState } from 'react';

import variables from '../../../styles/variables.module.scss';
import { actions, Context } from '../../context/Context';

const TabItem = styled(Tab)(`
    margin: auto;
    min-height: 40px;
    
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

enum menuActions {
	signIn = 'Sign In',
	signUp = 'Sign Up',
	signOut = 'Sign Out',
}

export const Navbar = () => {
	const {
		state: { currentPanel: current, supportedTransactions: tabs, isSignedIn },
		dispatch,
	} = useContext(Context);

	const handleChange = (event: SyntheticEvent, tabIndex: number) => {
		dispatch({ data: tabIndex, type: actions.SET_CURRENT_PANEL });
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleMenuButtonClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (option: string) => {
		switch (option) {
			case menuActions.signIn:
				dispatch({ data: true, type: actions.SET_IS_SIGN_IN_MODAL_OPENED });
				break;
			case menuActions.signUp:
				dispatch({ data: true, type: actions.SET_IS_SIGN_UP_MODAL_OPENED });
				break;
			case menuActions.signOut:
				// todo: sign out user and clear local storage
				dispatch({ data: false, type: actions.SET_IS_SIGNED_IN });
				break;
		}

		handleCloseMenu();
	};

	const [options, setOptions] = useState<string[]>([]);

	useEffect(() => {
		setOptions(isSignedIn ? [menuActions.signOut] : [menuActions.signIn, menuActions.signUp]);
	}, [isSignedIn]);

	return (
		<Box sx={{ flexGrow: 1, mb: 10, p: 0 }}>
			<AppBar position="fixed" color="inherit" elevation={0} sx={{ boxShadow: 'none', m: 0, p: 0, pt: 2 }}>
				<Container maxWidth={false} sx={{ p: 0 }}>
					<Toolbar disableGutters={true} variant="dense">
						<Grid container alignItems="center" justifyContent="space-between">
							<Grid item xs={12} sx={{ ml: 2 }}>
								<TabContainer
									className="tabs tabs-boxed"
									value={current}
									onChange={handleChange}
									variant="fullWidth"
								>
									{tabs.map((tab, index) => (
										<TabItem className="tab" label={tab} {...indexToProps(index)} />
									))}
									<IconButton
										aria-controls={isMenuOpen ? 'account-menu' : undefined}
										aria-expanded={isMenuOpen ? 'true' : undefined}
										aria-haspopup="true"
										aria-label="more"
										color="inherit"
										edge="start"
										id="account-button"
										onClick={handleMenuButtonClick}
										sx={{ pl: 0, pr: 0, zIndex: 1000 }}
									>
										<MoreIcon />
									</IconButton>
									<Menu
										id="account-menu"
										MenuListProps={{
											'aria-labelledby': 'account-button',
										}}
										anchorEl={anchorEl}
										open={isMenuOpen}
										onClose={handleCloseMenu}
										PaperProps={{
											elevation: 3,
											style: {
												width: '15ch',
											},
										}}
									>
										{options.map(option => (
											<MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
												{option}
											</MenuItem>
										))}
									</Menu>
								</TabContainer>
							</Grid>
						</Grid>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};
