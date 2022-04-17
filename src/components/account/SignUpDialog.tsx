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
	Link,
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

export const SignUpDialog = () => {
	const {
		state: { isSignUpModalOpened },
		dispatch,
	} = useContext(Context);

	const handleClose = () => {
		dispatch({ data: false, type: actions.SET_IS_SIGN_UP_MODAL_OPENED });
	};

	const [data, setData] = useState<AccountRequestBody & { showPassword: boolean }>({
		confirmPassword: '',
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		showPassword: false,
	});

	const [isNotificationOpened, setIsNotificationOpened] = useState(false);
	const [isSingUpSuccess, setIsSingUpSuccess] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const toggleShowPassword = () => {
		setData({ ...data, showPassword: !data.showPassword });
	};

	const handleSignUp = () => {
		new AccountService()
			.signUp(data)
			.then(() => {
				setIsSingUpSuccess(true);
				setIsNotificationOpened(true);
				handleClose();
			})
			.catch(() => {
				setIsSingUpSuccess(false);
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
			<Dialog open={isSignUpModalOpened} onClose={handleClose} aria-labelledby="sign-up-dialog-title">
				<DialogTitle id="sign-up-dialog-title" sx={{ color: variables.secondaryDark }}>
					Create an account
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} rowSpacing={3} alignItems="center" justifyContent="space-between">
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								sx={{ width: '100%' }}
								required
								id="firstName"
								label="First Name"
								name="firstName"
								value={data.firstName}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								sx={{ width: '100%' }}
								required
								id="lastName"
								label="Last Name"
								name="lastName"
								value={data.lastName}
								onChange={handleChange}
							/>
						</Grid>
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
						<Grid item xs={12} sm={6} md={6}>
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
						<Grid item xs={12} sm={6} md={6}>
							<FormControl sx={{ width: '100%' }} variant="outlined">
								<InputLabel htmlFor="outlined-adornment-password">Repeat password *</InputLabel>
								<OutlinedInput
									required
									id="outlined-adornment-password"
									type={data.showPassword ? 'text' : 'password'}
									label=" Password"
									name="confirmPassword"
									value={data.confirmPassword}
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
								By signing up on this app you're also agreeing to our{' '}
								<Link color={variables.primaryDark}>Term of Service</Link> and{' '}
								<Link color={variables.primaryDark}>Privacy Policy</Link>.
							</Typography>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} sx={{ color: variables.secondary }}>
						Cancel
					</Button>
					<Button onClick={handleSignUp} autoFocus sx={{ color: variables.primaryDark }}>
						Sign Up
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar open={isNotificationOpened} autoHideDuration={6000} onClose={handleNotificationClose}>
				<Alert
					onClose={handleNotificationClose}
					severity={isSingUpSuccess ? 'success' : 'warning'}
					sx={{ width: '100%' }}
				>
					{isSingUpSuccess
						? 'Your account has been created successfully, please sign in!'
						: 'Something went wrong, please retry.'}
				</Alert>
			</Snackbar>
		</>
	);
};
