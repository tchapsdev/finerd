import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';





export const TransactionInfo = () => transactionInfo() ; 
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
let transaction = { "Name":"Uber Eats","Date":"2022-03-14","Category":"Food","Amount":19.99,"Payementmethod":"Card" }; 

export function transactionInfo() {

  return (
    
    <Box sx={{ width: "100%"}}>
      <Stack spacing={2}>
            <Card sx={{ display: 'flex',  justifyContent:"space-around"}}>
                <Box sx={{  flexDirection: 'column'}}>
                    <CardContent>
                    <Typography component="div" variant="h5">
                        {transaction["Name"]}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {transaction["Date"]}
                    </Typography>
                    </CardContent>
                </Box>
                <Avatar
                alt="Dépense"
                src="/public/icons/icon-96x96.png"
                sx={{ width: 90, height: 90  }}
                />
            </Card>
          
            <Stack  spacing={2} sx={{  flexDirection: 'column'}}>
                <h1> Category : {transaction["Category"]}  </h1>
                <h4> Amount :  {transaction["Amount"]}</h4>
                <h1> Payement Method : {transaction["Payementmethod"]} </h1>
            </Stack>
        </Stack> 

        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                <Item> <Button size="medium"  variant="contained" color="error" >Delete</Button> </Item>
                </Grid>
                <Grid item xs={6}>
                <Item> <Button size="medium"  variant="contained" color="success" >Edit</Button> </Item>
                </Grid>
            </Grid>
        </Box>

    </Box>

    


        


// image={require("/public/icons/icon-16x16.png")} // require image

    
  );
}
