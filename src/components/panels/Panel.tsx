import { ReactNode } from 'react';

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

export const Panel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`panel-${index}`}
			aria-labelledby={`navbar-tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
};
