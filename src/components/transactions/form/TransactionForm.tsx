import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
	AppBar,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardMedia,
	Container,
	Grid,
	IconButton,
	styled,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useRef } from 'react';

import variables from '../../../../styles/variables.module.scss';
import { supportedExpenses } from '../../../constants';
import { WheelPicker } from '../picker/WheelPicker';
import AlertDialog from '../../popup/popupDelete'

const CameraButton = styled(Button)(`
    border: 1px solid rgba(0, 0, 0, 0.23);
    broder-radius: 4;
    color: ${variables.secondary};
    
    .Mui-focused, :focus, :hover {
        border: 1px solid rgba(0, 0, 0, 0.23);
    }
`);

const Input = styled(TextField)({
	'& .MuiInput-underline:after': {
		borderBottomColor: 'rgba(0, 0, 0, 0.23)',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'rgba(0, 0, 0, 0.23)',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'rgba(0, 0, 0, 0.23)',
		},
		'&:hover fieldset': {
			borderColor: 'rgba(0, 0, 0, 0.23)',
		},
	},
	'& label.Mui-focused': {
		color: variables.secondary,
	},
});

const Actions = styled(ButtonGroup)({
	'& button, & button:focus, & button:hover': {
		'&.danger': {
			color: variables.danger,
		},

		'&.success': {
			color: variables.success,
		},

		borderColor: 'rgba(0, 0, 0, 0.23)',
		color: variables.secondary,
	},
});

const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
	const file = event.target.files?.[0];
	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			console.log(reader.result); // transaction image
		};
	}
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
	event.preventDefault();
	const data = new FormData(event.currentTarget);
	console.log({
		email: data.get('email'),
		password: data.get('password'),
	});
};

export const TransactionForm = () => {
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleCameraButtonClick = () => {
		if (imageInputRef.current) {
			imageInputRef.current.click();
		}
	};

	return (
		<Container component="main" maxWidth="md" sx={{ height: '100%' }}>
			<Grid container alignItems="center" sx={{ pb: 2, pt: 1 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '5%' }}>
					<IconButton edge="start">
						<ArrowBackIosSharpIcon />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
					<Typography variant="h6" align="center">
						Expenses
					</Typography>
				</Box>
			</Grid>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
				}}
			>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Typography variant="subtitle1" sx={{ pb: 1 }}>
						CATEGORY
					</Typography>
					<WheelPicker data={supportedExpenses} type={'category'} />
					<Input
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						margin="normal"
						required
						fullWidth
						id="amount"
						label="AMOUNT"
						name="amount"
						value={undefined}
						autoComplete="off"
						sx={{ mt: 3 }}
					/>
					<Input
						margin="normal"
						fullWidth
						multiline
						rows={2}
						name="description"
						label="DESCRIPTION"
						type="text"
						id="description"
						autoComplete="off"
						sx={{ mb: 2 }}
					/>
					<Typography variant="subtitle1" sx={{ pb: 1 }}>
						PAYMENT METHOD
					</Typography>
					<WheelPicker data={supportedExpenses} type={'paymentMethod'} />
					<input
						type="file"
						accept="image/*"
						style={{ visibility: 'hidden' }}
						ref={imageInputRef}
						onChange={handleImageChange}
					/>
					<Card sx={{ maxHeight: '150px', mb: 3 }}>
						<CardMedia
							component="img"
							height="auto"
							width="100%"
							image={
								'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
							}
							alt="green iguana"
							sx={{ objectFit: 'cover' }}
						/>
					</Card>
					<CameraButton
						fullWidth
						variant="outlined"
						startIcon={<CameraAltIcon />}
						onClick={handleCameraButtonClick}
					>
						PHOTO
					</CameraButton>
					<AppBar
						position="fixed"
						color="inherit"
						elevation={0}
						sx={{ bottom: 10, boxShadow: 'none', top: 'auto' }}
					>
						<Toolbar sx={{ justifyContent: 'center' }}>
							<Actions size="large" fullWidth>
							<AlertDialog />
								
								<Button className="success" type="submit">
									SAVE
								</Button>
							</Actions>
						</Toolbar>
					</AppBar>
				</Box>
			</Box>
		</Container>
	);
};
