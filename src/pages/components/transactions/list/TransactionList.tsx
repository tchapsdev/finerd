import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

export const TransactionList = ({ transactions }) => (
    <List>
        {
            transactions?.map((transaction) => (
                <ListItem key={transaction.id}>
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
                        secondary={transaction.createdAt}
                    />
                </ListItem>
            ))
        }
    </List>
);
