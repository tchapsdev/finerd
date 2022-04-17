import { Box, Modal } from '@mui/material';
import { useContext } from 'react';

import { actions, Context } from '../../../context/Context';
import { SignUpForm } from '../form/SignUpForm';

export const SignUpModal = () => {
	const {
		state: { isSignUpModalOpened },
		dispatch,
	} = useContext(Context);

	const handleClose = () => {
		dispatch({ data: false, type: actions.SET_IS_SIGN_UP_MODAL_OPENED });
	};

	return (
		<Modal open={isSignUpModalOpened} onClose={handleClose}>
			<Box sx={{ bgcolor: 'background.paper' }}>
				<SignUpForm />
			</Box>
		</Modal>
	);
};
