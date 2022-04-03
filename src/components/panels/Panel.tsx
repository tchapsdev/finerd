import AddIcon from '@mui/icons-material/Add';
import { AppBar, Fab, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ReactNode, useContext } from 'react';

import variables from '../../../styles/variables.module.scss';
import { actions, Context } from '../../context/Context';

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

const FloatingButton = styled(Fab)({
	bottom: 16,
	boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.12), 0px 4px 5px 0px rgba(0,0,0,0.10), 0px 1px 10px 0px rgba(0,0,0,0.06)',
	color: variables.secondaryDark,
	margin: '0 auto',
	position: 'absolute',
	right: 16,
	zIndex: 1,
});

export const Panel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;
	const { dispatch } = useContext(Context);

	const openTransactionModal = () => {
		dispatch({ data: true, type: actions.SET_IS_TRANSACTION_MODAL_OPENED });
	};

	return (
		<>
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`panel-${index}`}
				aria-labelledby={`navbar-tab-${index}`}
				{...other}
			>
				{value === index && <>{children}</>}
			</div>
			<AppBar
				position="fixed"
				color="transparent"
				elevation={0}
				sx={{ bottom: 0, boxShadow: 'none', top: 'auto' }}
			>
				<Toolbar>
					<FloatingButton aria-label="add" onClick={openTransactionModal}>
						<AddIcon />
					</FloatingButton>
				</Toolbar>
			</AppBar>
		</>
	);
};
