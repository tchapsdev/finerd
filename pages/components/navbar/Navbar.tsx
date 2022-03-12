import React , {}from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { Panel } from '../panels/Panel';

const indexToProps = (index: number) => ({
    id: `navbar-tab-${index}`,
    'aria-controls': `panel-${index}`,
});

// const temp = [
//     {
//
//     }
// ]

export const Navbar = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <div>
                <Tabs className="tabs tabs-boxed" value={value} onChange={handleChange} centered>
                    <Tab className="tab" label="Expenses" {...indexToProps(0)} />
                    <Tab className="tab" label="Savings" {...indexToProps(1)} />
                    <Tab className="tab" label="Income" {...indexToProps(2)} />
                </Tabs>
            </div>
            <Panel value={value} index={0}>
                Item One
            </Panel>
            <Panel value={value} index={1}>
                Item Two
            </Panel>
            <Panel value={value} index={2}>
                Item Three
            </Panel>
        </div>
    );
};
