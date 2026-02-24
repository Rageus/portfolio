import { notFound } from "next/navigation";

export async function fetchUser(id: string) {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

	if (!response.ok) {
		return null
	}

	const users = await response.json();
	return users
}

export default async function UserPage({
	params,
}: {
	params: Promise<{userId: string}>;
}) {

	const {userId} = await params
	const user = await fetchUser(userId)

	if (!user) {
		notFound();
	}
	return (
		<div>
			<h1>{user.name}</h1>
			<p><strong>Email:</strong> {user.email}</p>
			<p><strong>Phone:</strong> {user.phone}</p>
			<p><strong>Company:</strong> {user.company.name}</p>
			<p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
		</div>
	);
}