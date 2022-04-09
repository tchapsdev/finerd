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


interface State {
  email:string;
  password: string;
  showPassword: boolean;
}

let theme = createTheme({
    typography: {
      h1: {
        fontSize: 15,
        fontWeight: 550,
      },
      h2: {
        fontSize: 15,
        fontWeight: 600,
        color: 'green',
      },
      h3: {
        fontSize: 15,
        fontWeight: 540,
        fontStyle: 'italic',
      },
      button: {
        fontWeight: 800,
      },
    },
  });

  theme = responsiveFontSizes(theme);

export default function signIN() {
  const [values, setValues] = React.useState<State>({
    email:'',
    password: '',
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

        <Button variant="contained" color="success" sx={{m:1, width:"80vh"}}>
            Sign in
        </Button>

        
    </Grid>



    <Grid 
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{ mt: 2 }}
    >
        <Grid item > <Typography variant="h1">Don't have an account yet ?</Typography> </Grid>
        <Grid item > <Typography variant="h2">&nbsp;Sign up ?</Typography> </Grid>
    </Grid>
    <Grid 
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{ mb: 1 }}
    
    >
        <Grid item > <Typography variant="h1">Or &nbsp;</Typography> </Grid>
        <Grid item > <u><Typography variant="h3">continue as guest</Typography> </u> </Grid>
    </Grid>


    </ThemeProvider>

        
</Grid>

    
  );
}
