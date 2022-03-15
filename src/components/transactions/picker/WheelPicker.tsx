import { Paper, styled } from '@mui/material';
import { useState } from 'react';
import ReactWheelPicker from 'react-simple-wheel-picker';

import variables from '../../../../styles/variables.module.scss';
import { Transaction } from '../../../../types/@finerd';

type WheelPickerProps = {
	data: Readonly<string[]>;
	type: 'category' | 'paymentMethod';
	transaction?: Transaction;
};

const FormCard = styled(Paper)(`
    border: 1px solid rgba(0, 0, 0, 0.23);
    broder-radius: 4;
    
    p {
        font-family: ${variables.baseFontFamily};
        font-size: ${variables.baseFontNumber};
    }
`);

export const WheelPicker = ({ data, type, transaction }: WheelPickerProps) => {
	const content = data.map(datum => ({
		id: datum.toLowerCase(),
		value: datum.toLowerCase(),
	}));

	const selectedId = transaction
		? content[data.indexOf(transaction[type])]?.id
		: content[Math.floor(content.length / 2)].id;

	const [value, setValue] = useState('');

	const handleOnChange = target => {
		setValue(target.value);
	};

	return (
		<FormCard variant="outlined">
			<ReactWheelPicker
				data={content}
				onChange={handleOnChange}
				selectedID={selectedId}
				height={120}
				itemHeight={30}
				color={variables.secondaryFaded2}
				activeColor={variables.secondary}
				focusColor={variables.secondaryFaded1}
				backgroundColor="background.paper"
				shadowColor="none"
				fontSize={+variables.baseFontNumber}
			/>
			<input type="hidden" name={type} value={value} />
		</FormCard>
	);
};
