import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { lowerCase, truncate, upperCase } from 'lodash';

import { Transaction } from '../../../../types/@finerd';

// todo: add onClick handler to open edit transaction dialog
export const TransactionList = ({ transactions }: { transactions: Transaction[] }) => (
    <Grid container alignItems="center" justifyContent="space-between" sx={{ pb: 13, px: 1, rowGap: 2 }}>
        {transactions?.map(transaction => (
            <Grid item xs={12} md={6} key={`${transaction.type}-transaction-${transaction.id}`}>
                <CardActionArea>
                    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'row', width: 'inherit' }}>
                        <CardMedia
                            component="img"
                            sx={{ height: '20%', mb: 1, ml: 1, mt: 1.3, width: '20%' }}
                            image={`/images/${transaction.category}.svg`}
                            alt={transaction.category}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {upperCase(transaction.category)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {lowerCase(truncate(transaction.description, { length: 8 }))}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                            <CardContent sx={{ textAlign: 'right' }}>
                                <Typography component="div" variant="h5">
                                    {new Intl.NumberFormat('en-CA', {
                                        currency: 'CAD',
                                        style: 'currency',
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
        ))}
    </Grid>
);
