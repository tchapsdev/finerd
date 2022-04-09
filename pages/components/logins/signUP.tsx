import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Typography from '@mui/material/Typography';




let theme = createTheme({
    typography: {
      h1: {
        fontSize: 50,
        fontWeight: 600,
        color: 'black',
      },
      h2: {
        fontSize: 15,
        fontWeight: 550,
        color: 'black',
      },
      h3: {
        fontSize: 15,
        fontWeight: 550,
        fontStyle: 'italic',
      },
      h4: {
        fontSize: 15,
        fontWeight: 550,
        color: 'green',
      },
      button: {
        fontWeight: 800,
      },
    },
  });

  theme = responsiveFontSizes(theme);

  interface State {
    email: string;
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

  
export default function signUP() {
  const [values, setValues] = React.useState<State>({
    email: '',
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid 
    container 
    columns={{ xs: 4, md: 12}}
    direction="column"
    justifyContent="center"
    alignItems="flex-start"
    sx={{m:2}}
    >
        <ThemeProvider theme={theme}>
        
       
    <Grid item > <Typography variant="h1">Create an account &nbsp;</Typography> </Grid>


        <Grid item xs={2} >
            <TextField sx={{ m: 1, width: '80vh' }}
            required
            id="outlined-search" 
            label="Email"
            type="search" 
            value={values.email}

            />  

        <FormControl sx={{ m: 1, width: '80vh' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                required
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
                
            />
        </FormControl>
        <FormControl sx={{ m: 1, width: '80vh' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                required
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
                
            />
        </FormControl>

        <Grid 
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ mt: 2 }}
        >
            <Grid item > <Typography variant="h2">By signin up on this app you're also agreeing to our &nbsp;</Typography> </Grid>
            <Grid item > <u><Typography variant="h3">Term of Service</Typography> </u> </Grid>
            <Grid item > <Typography variant="h2"> &nbsp; and  &nbsp;</Typography> </Grid>
            <Grid item > <u><Typography variant="h3">Privacy Policy </Typography> </u> </Grid>
        </Grid>
        <Button variant="contained" color="success" sx={{m:1, width:"80vh"}}>
            Sign up
        </Button>

        
    </Grid>




    <Grid 
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{ my: 1 }}
    >
        <Grid item > <Typography variant="h2">Already have an account &nbsp;</Typography> </Grid>
        <Grid item > <Typography variant="h4">Sign in &nbsp;</Typography> </Grid>
    </Grid>


    </ThemeProvider>

        
</Grid>
  );
}
