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
import { ChangeEvent, useContext, useRef } from 'react';

import variables from '../../../../styles/variables.module.scss';
import { Transaction } from '../../../../types/@finerd';
import { supportedCategories, supportedPaymentMethods } from '../../../constants';
import { actions, Context } from '../../../context/Context';
import { TransactionService } from '../../../service/TransactionService';
import { WheelPicker } from '../picker/WheelPicker';

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

export const TransactionForm = () => {
	const {
		state: { currentTransaction, currentPanel, supportedTransactions },
		dispatch,
	} = useContext(Context);

	const closeModal = () => {
		dispatch({ data: false, type: actions.SET_IS_TRANSACTION_MODAL_OPENED });
		dispatch({ data: undefined, type: actions.SET_CURRENT_TRANSACTION });
	};

	const transactionType = supportedTransactions[currentPanel];
	const transaction: Transaction = currentTransaction || { id: 0, type: transactionType };

	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleCameraButtonClick = () => {
		if (imageInputRef.current) {
			imageInputRef.current.click();
		}
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				transaction.photo = reader.result as string;
			};
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		new TransactionService().save(transaction);
	};

	const handleDeleteTransaction = event => {
		event.preventDefault();
		new TransactionService().deleteById(transaction.id);
	};

	return (
		<Container component="main" maxWidth="md" sx={{ height: '100%' }}>
			<Grid container alignItems="center" sx={{ pb: 2, pt: 1 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '5%' }}>
					<IconButton edge="start" onClick={closeModal}>
						<ArrowBackIosSharpIcon />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
					<Typography variant="h6" align="center">
						{transactionType.toUpperCase()}
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
					<WheelPicker
						data={supportedCategories[transactionType]}
						type={'category'}
						transaction={transaction}
						onChange={value => {
							transaction.category = value;
						}}
					/>
					<Input
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						margin="normal"
						required
						fullWidth
						id="amount"
						label="AMOUNT"
						name="amount"
						value={transaction?.amount}
						autoComplete="off"
						sx={{ mt: 3 }}
						onChange={event => {
							transaction.amount = +event.target.value;
						}}
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
						value={transaction?.description}
						autoComplete="off"
						sx={{ mb: 2 }}
						onChange={event => {
							transaction.description = event.target.value;
						}}
					/>
					<Typography variant="subtitle1" sx={{ pb: 1 }}>
						PAYMENT METHOD
					</Typography>
					<WheelPicker
						data={supportedPaymentMethods}
						type={'paymentMethod'}
						transaction={transaction}
						onChange={value => {
							transaction.paymentMethod = value;
						}}
					/>
					<input
						type="file"
						accept="image/*"
						style={{ visibility: 'hidden' }}
						ref={imageInputRef}
						onChange={handleImageChange}
					/>
					{transaction?.photo && (
						<Card variant="outlined" sx={{ maxHeight: '150px', mb: 3 }}>
							<CardMedia
								component="img"
								height="auto"
								width="100%"
								image={transaction.photo}
								alt="invoice"
								sx={{ objectFit: 'cover' }}
							/>
						</Card>
					)}
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
								{transaction.id !== 0 && (
									<Button className="danger" onClick={handleDeleteTransaction}>
										DELETE
									</Button>
								)}
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
