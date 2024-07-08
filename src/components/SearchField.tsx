import { ChangeEventHandler } from "react";

type SearchFieldProps = {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const SearchField = ({ label, value, onChange }: SearchFieldProps) => {
	return (
		<div>
			<label style={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
				{label}
				<input type="text" value={value} onChange={onChange} />
			</label>
		</div>
	);
};

export default SearchField;
