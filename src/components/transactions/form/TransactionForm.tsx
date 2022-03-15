import { Avatar, Box, Button, Card, CardContent, Grid, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	color: theme.palette.text.secondary,
	padding: theme.spacing(1),
	textAlign: 'center',
	...theme.typography.body2,
}));

let transaction = {
	Amount: 19.99,
	Category: 'Food',
	Date: '2022-03-14',
	Name: 'Uber Eats',
	Payementmethod: 'Card',
};

export const TransactionForm = () => (
	<Box sx={{ width: '100%' }}>
		<Stack spacing={2}>
			<Card sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<Box sx={{ flexDirection: 'column' }}>
					<CardContent>
						<Typography component="div" variant="h5">
							{transaction['Name']}
						</Typography>
						<Typography variant="subtitle1" color="text.secondary" component="div">
							{transaction['Date']}
						</Typography>
					</CardContent>
				</Box>
				<Avatar alt="Dépense" src="/public/icons/icon-96x96.png" sx={{ height: 90, width: 90 }} />
			</Card>
			<Stack spacing={2} sx={{ flexDirection: 'column' }}>
				<h1> Category : {transaction['Category']} </h1>
				<h4> Amount : {transaction['Amount']}</h4>
				<h1> Payement Method : {transaction['Payementmethod']} </h1>
			</Stack>
		</Stack>
		<Box sx={{ width: '100%' }}>
			<Grid container rowSpacing={1} columnSpacing={{ md: 3, sm: 2, xs: 1 }}>
				<Grid item xs={6}>
					<Item>
						{' '}
						<Button size="medium" variant="contained" color="error">
							Delete
						</Button>{' '}
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						{' '}
						<Button size="medium" variant="contained" color="success">
							Edit
						</Button>{' '}
					</Item>
				</Grid>
			</Grid>
		</Box>
	</Box>
);
