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

import { AccountService } from '../../service/AccountService';
import { Account } from '../../types';

let theme = createTheme({
	typography: {
		button: {
			fontWeight: 800,
		},
		h1: {
			color: 'black',
			fontSize: 50,
			fontWeight: 600,
		},
		h2: {
			color: 'black',
			fontSize: 15,
			fontWeight: 550,
		},
		h3: {
			fontSize: 15,
			fontStyle: 'italic',
			fontWeight: 500,
		},
		h4: {
			color: 'green',
			fontSize: 15,
			fontStyle: 'italic',
			fontWeight: 550,
		},
	},
});

theme = responsiveFontSizes(theme);

interface State {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	showPassword: boolean;
}

export default function signUP() {
	const [values, setValues] = React.useState<State>({
		confirmPassword: '',
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		showPassword: false,
	});

	const account: Account = values || { confirmPassword: '', email: '', firstName: '', lastName: '', password: '' };

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

	const handleSignUp = () => {
		let service = new AccountService();
		service.signUp(account);
	};

	return (
		<Grid container columns={{ xs: 4, md: 12 }} direction="column" sx={{ m: 2 }}>
			<ThemeProvider theme={theme}>
				<Grid item sx={{ mb: 4, mt: 2 }} xs={2} sm={4} md={4}>
					{' '}
					<Typography variant="h1">Create an account &nbsp;</Typography>{' '}
				</Grid>

				<Grid container spacing={-10} columns={16} justifyContent="flex-start">
					<Grid item xs={8} sm={8} md={4}>
						<TextField
							sx={{ ml: 1, width: '95%', mb: 1 }}
							required
							id="firstName"
							label="First Name"
							value={values.firstName}
							onChange={handleChange('firstName')}
						/>
					</Grid>
					<Grid item xs={8} sm={8} md={4}>
						<TextField
							sx={{ width: '95%', ml: 1, mb: 1 }}
							required
							id="lastName"
							label="Last Name"
							value={values.lastName}
							onChange={handleChange('lastName')}
						/>
					</Grid>
				</Grid>
				<Grid item>
					<Grid item xs={2} sm={4} md={4}>
						<TextField
							sx={{ m: 1, width: '176%' }}
							required
							id="outlined-search"
							label="email"
							type="email"
							value={values.email}
							onChange={handleChange('email')}
						/>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<FormControl sx={{ m: 1, width: '176%' }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
							<OutlinedInput
								required
								id="outlined-adornment-password"
								type={values.showPassword ? 'text' : 'password'}
								value={values.password}
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

					<Grid item xs={2} sm={4} md={4}>
						<FormControl sx={{ m: 1, width: '176%' }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Repeat password *</InputLabel>
							<OutlinedInput
								required
								id="outlined-adornment-password"
								type={values.showPassword ? 'text' : 'password'}
								value={values.confirmPassword}
								onChange={handleChange('confirmPassword')}
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
								label=" Password"
							/>
						</FormControl>
					</Grid>
					<Grid
						container
						sx={{ pr: 2, ml: 1 }}
						sm={4}
						md={4}
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						spacing={0}
						xs={3}
					>
						<Grid item>
							{' '}
							<Typography variant="h2">
								By signin up on this app you're also agreeing to our &nbsp;
							</Typography>{' '}
						</Grid>
						<Grid item>
							{' '}
							<u>
								<Typography variant="h3">
									<a href="http://google.ca">Term of Service</a>
								</Typography>{' '}
							</u>{' '}
						</Grid>
						<Grid item>
							{' '}
							<Typography variant="h2"> &nbsp; and &nbsp;</Typography>{' '}
						</Grid>
						<Grid item>
							{' '}
							<u>
								<Typography variant="h3">
									<a href="http://google.ca"> Privacy Policy </a>{' '}
								</Typography>{' '}
							</u>{' '}
						</Grid>
					</Grid>

					<Grid
						container
						xs
						sm={3}
						md={8}
						lg={3}
						justifyContent="flex-start"
						alignItems="center"
						sx={{ ml: 1 }}
					>
						<Button variant="contained" color="success" sx={{ my: 2, width: '80%' }} onClick={handleSignUp}>
							Sign up
						</Button>
					</Grid>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						sx={{ ml: 1, mb: 1 }}
						xs
					>
						<Grid item>
							{' '}
							<Typography variant="h2">Already have an account : &nbsp;</Typography>{' '}
						</Grid>
						<Grid item>
							{' '}
							<Typography variant="h4">Sign in &nbsp;</Typography>{' '}
						</Grid>
					</Grid>
				</Grid>
			</ThemeProvider>
		</Grid>
	);
}
