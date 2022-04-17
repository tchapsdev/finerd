import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { AccountService } from '../../../service/AccountService';
import { Account } from '../../../types';

interface State {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	showPassword: boolean;
}

let theme = createTheme({
	typography: {
		button: {
			fontWeight: 800,
		},
		h1: {
			fontSize: 15,
			fontWeight: 550,
		},
		h2: {
			color: 'green',
			fontSize: 15,
			fontWeight: 600,
		},
		h3: {
			fontSize: 15,
			fontStyle: 'italic',
			fontWeight: 540,
		},
	},
});

theme = responsiveFontSizes(theme);

export const SignInForm = () => {
	const [values, setValues] = React.useState<State>({
		confirmPassword: '',
		email: '',
		firstName: '',
		id: 0,
		lastName: '',
		password: '',
		showPassword: false,
	});

	const account: Account = values || {
		confirmPassword: '',
		email: '',
		firstName: '',
		id: 0,
		lastName: '',
		password: '',
		showPassword: false,
	};

	const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleSignIn = () => {
		let service = new AccountService();
		service.signIn(account);
	};

	return (
		<Grid container columns={{ md: 12, xs: 8 }} direction="column" sx={{ m: 2 }}>
			<ThemeProvider theme={theme}>
				<Grid item sx={{ m: 1 }} xs={2} sm={4} md={4}>
					{' '}
					<Typography variant="h1"> finerd &nbsp;</Typography>{' '}
				</Grid>

				<Grid item>
					<Grid item xs={8} sm={12} md={11}>
						<TextField
							sx={{ m: 1, width: '91%' }}
							required
							id="outlined-search"
							label="Email"
							type="text"
							onChange={handleChange('email')}
						/>
					</Grid>

					<Grid item xs={8} sm={12} md={11}>
						<FormControl sx={{ m: 1, width: '91%' }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
							<OutlinedInput
								required
								id="outlined-adornment-password"
								type={values.showPassword ? 'text' : 'password'}
								onChange={handleChange('password')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
					</Grid>

					<Grid
						container
						xs={6}
						sm={8}
						md={10}
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ ml: 1 }}
					>
						<Button
							variant="contained"
							color="success"
							sx={{ my: 2, width: '100%' }}
							onClick={handleSignIn}
						>
							Sign in
						</Button>
					</Grid>
					<Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
						<Grid item>
							{' '}
							<Typography variant="h1">Don't have an account yet ?</Typography>{' '}
						</Grid>
						<Grid item>
							{' '}
							<Typography variant="h2">&nbsp;Sign up ?</Typography>{' '}
						</Grid>
					</Grid>
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						sx={{ mb: 1, ml: 1 }}
						xs
					>
						<Grid item>
							{' '}
							<Typography variant="h1">Or &nbsp;</Typography>{' '}
						</Grid>
						<Grid item>
							{' '}
							<u>
								<Typography variant="h3">continue as guest</Typography>{' '}
							</u>{' '}
						</Grid>
					</Grid>
				</Grid>
			</ThemeProvider>
		</Grid>
	);
};
