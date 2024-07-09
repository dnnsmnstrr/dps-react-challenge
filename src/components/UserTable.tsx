import { useState } from 'react';
import { User } from '../types';
import SearchField from './SearchField';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';

export default function UserTable({ users }: { users: User[] }) {
	const [searchParam, setSearchParam] = useState('');
	const [filterParam, setFilterParam] = useState('');
	const [highlightOldestPerCity, setHighlightOldest] = useState(false);
	const citiesOldest: Record<string, number> = {};
	const filteredUsers = users.filter((user) => {
		const birthTimestamp = new Date(user.birthDate).getTime();
		if (
			!citiesOldest[user.address.city] ||
			birthTimestamp < citiesOldest[user.address.city]
		) {
			citiesOldest[user.address.city] = birthTimestamp;
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

	const highlightRadius = 8;
	return (
		<div>
			<div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
				<SearchField
					label="Name"
					value={searchParam}
					onChange={setSearchParam}
				/>
				<Dropdown
					label="City"
					placeholder={filterParam ? 'All cities' : 'Select city'}
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
			<table
				style={{
					width: '100%',
					marginTop: 10,
					textAlign: 'left',
					borderCollapse: 'separate',
					borderSpacing: '0 10px',
				}}
			>
				<thead>
					<tr>
						<th style={{ paddingLeft: 10 }}>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>
				<tbody>
					{!filteredUsers ||
						(!filteredUsers.length && (
							<tr>
								<td
									style={{ paddingTop: 20, opacity: 0.5, textAlign: 'center' }}
									colSpan={3}
								>
									No Results
								</td>
							</tr>
						))}
					{filteredUsers.map((user, index) => (
						<tr
							key={index}
							style={{
								background:
									highlightOldestPerCity &&
									citiesOldest[user.address.city] >=
										new Date(user.birthDate).getTime()
										? '#646cff'
										: '',
								padding: 20,
								borderRadius: 10,
								overflow: 'hidden',
							}}
						>
							<td
								style={{
									paddingLeft: 10,
									borderTopLeftRadius: highlightRadius,
									borderBottomLeftRadius: highlightRadius,
									width: 249,
								}}
							>
								{user.firstName} {user.lastName}
							</td>
							<td style={{ minWidth: 120 }}>
								{user?.address?.city || '-'}
							</td>
							<td
								style={{
									borderTopRightRadius: highlightRadius,
									borderBottomRightRadius: highlightRadius,
									width: 168,
								}}
								title={user.age + ' years old'}
							>
								{user.birthDate}
							</td>
						</tr>
					))}
					{!!(filteredUsers && filteredUsers.length) && (
						<tr>
							<td
								style={{ paddingTop: 20, opacity: 0.5, textAlign: 'center' }}
								colSpan={3}
							>
								{filteredUsers.length} Result
								{filteredUsers.length === 1 ? '' : 's'}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
