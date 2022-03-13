import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';

export const TransactionList = () => FolderList() ; 

export function FolderList() {
  return (

    // <Box
    //   sx={{
    //     width: "100%",
    //     height: 300,
    //     backgroundColor: "primary.dark"
    //   }}
    // >
    //   <Box
    //     sx={{
    //       width: "50%",
    //       height: "50%",
    //       backgroundColor: "red"
    //     }}
    //   ></Box>
    // </Box>
    
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      {/* item 1  */}
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Clothing" secondary="credit card">  </ListItemText>
        <div>
        <ListItemText primary="-250.78 $" secondary="Jan 9, 2014">  </ListItemText>
        </div>
      </ListItem>
      {/* item 2  */}
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Mc Donalds" secondary="credit card">  </ListItemText>
        <div>
        <ListItemText primary="-150.78 $" secondary="Jan 9, 2015">  </ListItemText>
        </div>
      </ListItem>

      {/* item 3  */}
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Nike" secondary="cash">  </ListItemText>
        <div>
        <ListItemText primary="-500.78 $" secondary="Jan 9, 2014">  </ListItemText>
        </div>
      </ListItem>
    </List>
  );
}
