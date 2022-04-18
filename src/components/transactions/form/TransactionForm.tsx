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
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	IconButton,
	styled,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { ChangeEvent, useContext, useRef, useState } from 'react';

import variables from '../../../../styles/variables.module.scss';
import { supportedCategories } from '../../../constants';
import { actions, Context } from '../../../context/Context';
import { TransactionService } from '../../../service/TransactionService';
import { Transaction, TransactionType } from '../../../types';
import { WheelPicker } from '../picker/WheelPicker';

const CameraButton = styled(Button)(`
    border: 1px solid rgba(0, 0, 0, 0.23);
    broder-radius: 4;
    color: ${variables.secondary};
    text-transform: none;
    
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

export const TransactionForm = ({ isLoading }: { isLoading: boolean }) => {
	const {
		state: { currentTransaction, currentPanel, supportedTransactions },
		dispatch,
	} = useContext(Context);

	const closeModal = () => {
		dispatch({ data: false, type: actions.SET_IS_TRANSACTION_MODAL_OPENED });
		dispatch({ data: !isLoading, type: actions.SET_IS_LOADING });
		dispatch({ data: undefined, type: actions.SET_CURRENT_TRANSACTION });
	};

	const transactionType: TransactionType = supportedTransactions[currentPanel];
	const [transaction, setTransaction] = useState<Transaction>(
		currentTransaction || {
			amount: 0,
			id: 0,
			type: transactionType,
		}
	);

	const transactionService = new TransactionService();
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleChange = (key: keyof Transaction, value: any) => {
		setTransaction({ ...transaction, [key]: value });
	};

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
				setTransaction({ ...transaction, photo: reader.result as string });
			};
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		transactionService.save(transaction).then(() => closeModal());
	};

	const handleDeleteTransaction = event => {
		event.preventDefault();
		transactionService.deleteById(transaction.id).then(() => {
			setOpenDeleteConfirmationDialog(false);
			closeModal();
		});
	};

	const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);

	const handleOpenDeleteConfirmationDialog = () => {
		setOpenDeleteConfirmationDialog(true);
	};

	const handleCloseDeleteConfirmationDialog = () => {
		setOpenDeleteConfirmationDialog(false);
	};

	return (
		<Container component="main" maxWidth="md" sx={{ height: '100%' }}>
			<Grid container alignItems="center" sx={{ pb: 1, pt: 1 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '5%' }}>
					<IconButton edge="start" onClick={closeModal}>
						<ArrowBackIosSharpIcon fontSize="small" />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
					<Typography variant="subtitle1" align="center">
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
					overflowY: 'scroll',
				}}
			>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Typography variant="subtitle1">category</Typography>
					<WheelPicker
						data={supportedCategories[transactionType]}
						type={'category'}
						transaction={transaction}
						onChange={value => handleChange('category', value)}
					/>
					<Input
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						margin="normal"
						required
						fullWidth
						id="amount"
						label="amount"
						name="amount"
						defaultValue={transaction.amount !== 0 ? transaction.amount : ''}
						autoComplete="off"
						sx={{ mb: 0, mt: 2 }}
						onChange={event => handleChange('amount', +event.target.value)}
					/>
					<Input
						margin="normal"
						fullWidth
						multiline
						rows={2}
						name="description"
						label="description"
						type="text"
						id="description"
						defaultValue={transaction?.description}
						autoComplete="off"
						sx={{ mb: 2, mt: 2 }}
						onChange={event => handleChange('description', event.target.value)}
					/>
					<input
						type="file"
						accept="image/*"
						style={{ visibility: 'hidden' }}
						ref={imageInputRef}
						onChange={handleImageChange}
					/>
					{transaction?.photo && (
						<Card variant="outlined" sx={{ maxHeight: '150px', mb: 0, mt: -4 }}>
							<CardMedia
								component="img"
								height="auto"
								width="100%"
								image={transaction.photo}
								alt="invoice"
								sx={{ mb: 0, mt: 0, objectFit: 'cover' }}
							/>
						</Card>
					)}
					<CameraButton
						fullWidth
						variant="outlined"
						startIcon={<CameraAltIcon />}
						onClick={handleCameraButtonClick}
						sx={transaction?.photo ? { mb: 0, mt: 1 } : { mb: 0, mt: -4 }}
					>
						<Typography variant="subtitle1">photo</Typography>
					</CameraButton>
					<AppBar
						position="fixed"
						color="inherit"
						elevation={0}
						sx={{ bottom: 0, boxShadow: 'none', left: 0, m: 'auto', maxWidth: 'md', p: 0, top: 'auto' }}
					>
						<Toolbar sx={{ justifyContent: 'center', mb: 1 }}>
							<Actions size="large" fullWidth>
								{transaction.id !== 0 && (
									<Button className="danger" onClick={handleOpenDeleteConfirmationDialog}>
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
			<Dialog
				open={openDeleteConfirmationDialog}
				onClose={handleCloseDeleteConfirmationDialog}
				aria-describedby="transaction-form-dialog-description"
			>
				<DialogContent>
					<DialogContentText id="transaction-form-dialog-description">
						Do you really want to delete this transaction?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDeleteConfirmationDialog} autoFocus sx={{ color: variables.secondary }}>
						Cancel
					</Button>
					<Button onClick={handleDeleteTransaction} sx={{ color: variables.danger }}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};
