import { Box, Modal } from '@mui/material';
import { useContext } from 'react';

import { actions, Context } from '../../../context/Context';
import { SignInForm } from '../form/SignInForm';

export const SignInModal = () => {
	const {
		state: { isSignInModalOpened },
		dispatch,
	} = useContext(Context);

	const handleClose = () => {
		dispatch({ data: false, type: actions.SET_IS_SIGN_IN_MODAL_OPENED });
	};

	return (
		<Modal open={isSignInModalOpened} onClose={handleClose}>
			<Box sx={{ bgcolor: 'background.paper' }}>
				<SignInForm />
			</Box>
		</Modal>
	);
};
