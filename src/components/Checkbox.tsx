import { ChangeEventHandler } from 'react';

type CheckboxProps = {
	label: string;
	checked: boolean;
	onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
	return (
		<div >
			<label style={{ display: 'flex', gap: 10, alignItems: 'center', paddingBottom: 8 }}>
				<span style={{ maxWidth: 140 }}>{label}</span>
				<input style={{ width: 20 }} type="checkbox" checked={checked} onChange={onChange} />
			</label>
		</div>
	);
};

export default Checkbox;
