import { Paper, styled } from '@mui/material';
import ReactWheelPicker from 'react-simple-wheel-picker';

import variables from '../../../../styles/variables.module.scss';
import { Transaction } from '../../../../types/@finerd';

type WheelPickerProps = {
	data: Readonly<string[]>;
	type: 'category' | 'paymentMethod';
	transaction?: Transaction;
	onChange: (value: string) => void;
};

const FormCard = styled(Paper)(`
    border: 1px solid rgba(0, 0, 0, 0.23);
    broder-radius: 4;
    
    p {
        font-family: ${variables.baseFontFamily};
        font-size: ${variables.baseFontNumber};
    }
`);

export const WheelPicker = ({ data, type, transaction, onChange }: WheelPickerProps) => {
	const content = data.map(datum => ({
		id: datum.toLowerCase(),
		value: datum.toLowerCase(),
	}));

	const selectedId =
		transaction.id !== 0
			? content[data.indexOf(transaction[type])]?.id
			: content[Math.floor(content.length / 2)].id;

	const handleOnChange = target => {
		onChange(target.value);
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
		</FormCard>
	);
};
