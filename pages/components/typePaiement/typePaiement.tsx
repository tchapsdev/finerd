import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup() {
  return (
    <FormControl style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    }}
    margin-top= {150}
    
    >
      <FormLabel id="demo-radio-buttons-group-label"
        >Payment method</FormLabel>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        
      >
        <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
        <FormControlLabel value="Credit card" control={<Radio />} label="Credit card" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}
