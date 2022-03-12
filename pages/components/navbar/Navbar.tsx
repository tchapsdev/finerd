import { SyntheticEvent } from 'react';
import { capitalize } from 'lodash';
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

export const Navbar = ({ tabs, current }) => {
    let value = tabs.indexOf(current);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        value = newValue;
    };

    return (
        <div>
            <div>
                <Tabs className="tabs tabs-boxed" value={value} onChange={handleChange} centered>
                    {/*<Tab className="tab" label="Expenses" {...indexToProps(0)} />*/}
                    {/*<Tab className="tab" label="Savings" {...indexToProps(1)} />*/}
                    {/*<Tab className="tab" label="Income" {...indexToProps(2)} />*/}
                    {
                        tabs.map((tab, index) => (
                            <Tab className="tab" label={capitalize(tab)} {...indexToProps(index)} />
                        ))
                    }
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
