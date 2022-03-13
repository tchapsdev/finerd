import ImageIcon from '@mui/icons-material/Image';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { Transaction } from '../../../../../types/@finerd';

// todo: transform to a container with cards
// todo: adjust layout
export const TransactionList = ({ transactions }: { transactions: Transaction[] }) => (
    <List sx={{ width: '100%' }}>
        {
            transactions?.map((transaction) => (
                <ListItem alignItems="flex-start" sx={{ justifyContent: 'space-between' }} key={transaction.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={transaction.category}
                        secondary={transaction.paymentMethod}
                    />
                    <ListItemText
                        primary={new Intl.NumberFormat('en-CA', {
                            style: 'currency',
                            currency: 'CAD'
                        }).format(transaction.amount)}
                        secondary={new Intl.DateTimeFormat('en-CA').format(transaction.createdAt)}
                    />
                </ListItem>
            ))
        }
    </List>
);
