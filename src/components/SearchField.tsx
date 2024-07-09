import { useState, useEffect, ChangeEvent } from 'react';

type SearchFieldProps = {
	label: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	debounceTimeout?: number; // seconds
};

const SearchField = ({
	label,
	value,
	placeholder,
	onChange,
	debounceTimeout = 1,
}: SearchFieldProps) => {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			onChange(inputValue);
		}, debounceTimeout * 1000);

		return () => {
			clearTimeout(handler);
		};
	}, [inputValue, debounceTimeout, onChange]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	return (
		<div>
			<label
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
				}}
			>
				{label}
				<input
					type="text"
					value={inputValue}
					onChange={handleChange}
					placeholder={placeholder || 'Search'}
				/>
			</label>
		</div>
	);
};

export default SearchField;
