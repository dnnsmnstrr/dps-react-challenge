import { useState } from 'react';
import { User } from '../types';
import SearchField from './SearchField';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';

export default function UserTable({ users }: { users: User[] }) {
	const [searchParam, setSearchParam] = useState('');
	const [filterParam, setFilterParam] = useState('');
	const [highlightOldestPerCity, setHighlightOldest] = useState(false);
	const filteredUsers = users.filter((user) => {
		if (!searchParam && !filterParam) return true;
		const matchesFirstName =
			searchParam &&
			user.firstName &&
			user.firstName
				.toLocaleLowerCase()
				.includes(searchParam.toLocaleLowerCase());
		const matchesLastName =
			searchParam &&
			user.lastName &&
			user.lastName
				.toLocaleLowerCase()
				.includes(searchParam.toLocaleLowerCase());

		if (filterParam)
			return (
				user.city === filterParam &&
				(!searchParam || matchesFirstName || matchesLastName)
			);

		return matchesFirstName || matchesLastName;
	});

	const cities = users.reduce<string[]>((acc, currentUser) => {
		if (acc.some((city) => city === currentUser.city)) return acc;
		return [...acc, currentUser.city];
	}, []);
	return (
		<div>
			<div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
				<SearchField
					label="Name"
					value={searchParam}
					onChange={(event) => setSearchParam(event.target.value)}
				/>
				<Dropdown
					label="City"
					placeholder="Select city"
					options={cities}
					value={filterParam}
					onChange={(event) => setFilterParam(event.target.value)}
				/>
				<Checkbox
					label="Highlight oldest per city"
					checked={highlightOldestPerCity}
					onChange={(event) =>
						setHighlightOldest(event.target.checked)
					}
				/>
			</div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user, index) => (
						<tr key={index}>
							<td>
								{user.firstName} {user.lastName}
							</td>
							<td>{user.city}</td>
							<td>{user.birthday}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
