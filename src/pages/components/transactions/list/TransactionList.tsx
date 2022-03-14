import { capitalize, lowerCase } from 'lodash';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import { Transaction } from '../../../../../types/@finerd';

// todo: transform to a container with cards
// todo: adjust layout
export const TransactionList = ({ transactions }: { transactions: Transaction[] }) => (
    <Grid container alignItems="center" justifyContent="space-between" sx={{ rowGap: 2, px: 1 }}>
        {
            transactions?.map((transaction) => (
                <Grid item xs={12} md={6} key={`${transaction.type}-transaction-${transaction.id}`}>
                    <CardActionArea>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'row' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: '20%', height: '20%', mt: 1.3, ml: 1 }}
                                image={`/images/${transaction.category}.svg`}
                                alt={transaction.category}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {capitalize(transaction.category)}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {lowerCase(transaction.description)}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', mr: 0 }}>
                                <CardContent sx={{ textAlign: 'right' }}>
                                    <Typography component="div" variant="h5" >
                                        {new Intl.NumberFormat('en-CA', {
                                            style: 'currency',
                                            currency: 'CAD'
                                        }).format(transaction.amount)}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {new Intl.DateTimeFormat('en-CA').format(transaction.createdAt)}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </CardActionArea>
                </Grid>
            ))
        }
    </Grid>
);
