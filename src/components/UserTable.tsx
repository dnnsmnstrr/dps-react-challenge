import { useState } from 'react';
import { User } from '../types';
import SearchField from './SearchField';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';

export default function UserTable({ users }: { users: User[] }) {
	const [searchParam, setSearchParam] = useState('');
	const [filterParam, setFilterParam] = useState('');
	const [highlightOldestPerCity, setHighlightOldest] = useState(false);
	const citiesOldest: Record<string, number> = {}
	const filteredUsers = users.filter((user) => {
		const birthTimestamp = new Date(user.birthDate).getTime()
		if (!citiesOldest[user.address.city] || birthTimestamp < citiesOldest[user.address.city]) {
			citiesOldest[user.address.city] = birthTimestamp
		}
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
				user.address.city === filterParam &&
				(!searchParam || matchesFirstName || matchesLastName)
			);

		return matchesFirstName || matchesLastName;
	});

	const cities = users.reduce<string[]>((acc, currentUser) => {
		if (acc.some((city) => city === currentUser.address.city)) return acc;
		return [...acc, currentUser.address.city];
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
					placeholder={filterParam ? "All cities" : "Select city"}
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
			<table style={{ width: '100%', marginTop: 10 }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user, index) => (
						<tr key={index} style={{ background: highlightOldestPerCity && citiesOldest[user.address.city] >= new Date(user.birthDate).getTime() ? '#646cff' : '' }}>
							<td>
								{user.firstName} {user.lastName}
							</td>
							<td>{user?.address?.city || '-'}</td>
							<td>{user.birthDate}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
