import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material';
import { ChangeEvent, SyntheticEvent, useContext, useState } from 'react';

import variables from '../../../styles/variables.module.scss';
import { actions, Context } from '../../context/Context';
import { AccountService } from '../../service/AccountService';
import { AccountRequestBody } from '../../types';

export const SignInDialog = () => {
	const {
		state: { isSignInModalOpened },
		dispatch,
	} = useContext(Context);

	const handleClose = () => {
		dispatch({ data: false, type: actions.SET_IS_SIGN_IN_MODAL_OPENED });
	};

	const [data, setData] = useState<Pick<AccountRequestBody, 'email' | 'password'> & { showPassword: boolean }>({
		email: '',
		password: '',
		showPassword: false,
	});

	const [isNotificationOpened, setIsNotificationOpened] = useState(false);
	const [isSingInSuccess, setIsSingInSuccess] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const toggleShowPassword = () => {
		setData({ ...data, showPassword: !data.showPassword });
	};

	const handleSignIn = () => {
		new AccountService()
			.signIn(data)
			.then(() => {
				setIsSingInSuccess(true);
				setIsNotificationOpened(true);
				handleClose();
				dispatch({ data: true, type: actions.SET_IS_SIGNED_IN });
			})
			.catch(() => {
				setIsSingInSuccess(false);
				setIsNotificationOpened(true);
			});
	};

	const handleNotificationClose = (event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsNotificationOpened(false);
	};

	return (
		<>
			<Dialog open={isSignInModalOpened} onClose={handleClose} aria-labelledby="sign-in-dialog-title">
				<DialogTitle id="sign-in-dialog-title" sx={{ color: variables.secondaryDark }}>
					Sign in to your account.
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} rowSpacing={3} alignItems="center" justifyContent="space-between">
						<Grid item xs={12} sm={12} md={12}>
							<TextField
								sx={{ width: '100%' }}
								required
								id="email"
								label="email"
								type="email"
								name="email"
								value={data.email}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
							<FormControl sx={{ width: '100%' }} variant="outlined">
								<InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
								<OutlinedInput
									required
									id="outlined-adornment-password"
									type={data.showPassword ? 'text' : 'password'}
									label="Password"
									name="password"
									value={data.password}
									onChange={handleChange}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={toggleShowPassword}
												onMouseDown={event => event.preventDefault()}
												edge="end"
											>
												{data.showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
							<Typography align="justify">
								Don't have an account yet? Please consider signing up.
							</Typography>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} sx={{ color: variables.secondary }}>
						Cancel
					</Button>
					<Button onClick={handleSignIn} autoFocus sx={{ color: variables.primaryDark }}>
						Sign In
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar open={isNotificationOpened} autoHideDuration={6000} onClose={handleNotificationClose}>
				<Alert
					onClose={handleNotificationClose}
					severity={isSingInSuccess ? 'success' : 'warning'}
					sx={{ width: '100%' }}
				>
					{isSingInSuccess
						? 'You have successfully signed in! Please wait while we sync your transactions.'
						: 'Something went wrong, please retry.'}
				</Alert>
			</Snackbar>
		</>
	);
};
