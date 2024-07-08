import { ChangeEventHandler } from 'react';

type DropdownProps = {
	label: string;
	placeholder: string;
	value: string;
	options: string[];
	onChange: ChangeEventHandler<HTMLSelectElement>;
};

const Dropdown = ({
	label,
	placeholder,
	options,
	value,
	onChange,
}: DropdownProps) => {
	return (
		<div>
			<label style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', minWidth: 200 }}>
				{label}
				<select value={value} onChange={onChange}>
					<option value="">{placeholder || ('Select ' + label)}</option>
					{options.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

export default Dropdown;
