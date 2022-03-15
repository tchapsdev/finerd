import { Box, Modal } from '@mui/material';
import { useContext } from 'react';

import { actions, Context } from '../../../context/Context';
import { TransactionForm } from '../form/TransactionForm';

const style = {
	bgcolor: 'background.paper',
	left: '50%',
	position: 'absolute' as const,
	top: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
};

export const TransactionModal = () => {
	const {
		state: { isTransactionModalOpened },
		dispatch,
	} = useContext(Context);

	const handleClose = () => {
		dispatch({ data: false, type: actions.SET_IS_TRANSACTION_MODAL_OPENED });
	};

	return (
		<Modal open={isTransactionModalOpened} onClose={handleClose}>
			<Box sx={style}>
				<TransactionForm />
			</Box>
		</Modal>
	);
};
