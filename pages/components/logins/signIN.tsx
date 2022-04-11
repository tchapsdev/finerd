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
  email: string;
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
    email: '',
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
      columns={{ xs: 8, md: 12 }}
      direction="column"
      sx={{ m: 2 }}
    >
      <ThemeProvider theme={theme}>


        <Grid item sx={{ m:1 }} xs={2} sm={4} md={4} > <Typography variant="h1">finerd &nbsp;</Typography> </Grid>


        <Grid item >
          <Grid item xs={8} sm={12} md={11} >
            <TextField sx={{ m: 1, width: '91%' }}
              required
              id="outlined-search"
              label="Email"
              type="search"
              value={values.email}
            />
          </Grid>





          <Grid item xs={8} sm={12} md={11} >
            <FormControl sx={{ m: 1, width: '91%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
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
          </Grid>

          

          <Grid container xs={6} sm={8} md={10} justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ ml: 1 }}
          >
            <Button variant="contained" color="success" sx={{ my: 2, width: "100%" }}>
              Sign up
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Grid item > <Typography variant="h1">Don't have an account yet ?</Typography> </Grid>
            <Grid item > <Typography variant="h2">&nbsp;Sign up ?</Typography> </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ ml: 1, mb: 1 }}
            xs
          >
            <Grid item > <Typography variant="h1">Or &nbsp;</Typography> </Grid>
            <Grid item > <u><Typography variant="h3">continue as guest</Typography> </u> </Grid>
          </Grid>
        </Grid>




      </ThemeProvider>


    </Grid>


  );
}
