import { Box, Modal } from '@mui/material';
import { useContext } from 'react';

import { actions, Context } from '../../../context/Context';
import { TransactionForm } from '../form/TransactionForm';

export const TransactionModal = ({ isLoading }: { isLoading: boolean }) => {
	const {
		state: { isTransactionModalOpened },
		dispatch,
	} = useContext(Context);

	const handleClose = () => {
		dispatch({ data: false, type: actions.SET_IS_TRANSACTION_MODAL_OPENED });
	};

	return (
		<Modal open={isTransactionModalOpened} onClose={handleClose}>
			<Box sx={{ bgcolor: 'background.paper' }}>
				<TransactionForm isLoading={isLoading} />
			</Box>
		</Modal>
	);
};
