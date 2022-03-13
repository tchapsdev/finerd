import { SyntheticEvent, useContext } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { actions, Context } from '../../context/Context';

const indexToProps = (index: number) => ({
    id: `navbar-tab-${index}`,
    'aria-controls': `panel-${index}`,
    key: `navbar-tab-${index}`,
});

export const Navbar = () => {
    const {
        state: { currentPanel: current, supportedTransactions: tabs },
        dispatch,
    } = useContext(Context);


    const handleChange = (event: SyntheticEvent, tabIndex: number) => {
        dispatch({ type: actions.SET_CURRENT_PANEL, data: tabIndex });
    };

    return (
        <div>
            <Tabs className="tabs tabs-boxed" value={current} onChange={handleChange} centered>
                {
                    tabs.map((tab, index) => (
                        <Tab className="tab" label={tab} {...indexToProps(index)} />
                    ))
                }
            </Tabs>
        </div>
    );
};
