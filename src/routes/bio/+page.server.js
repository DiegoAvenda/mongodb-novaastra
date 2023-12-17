import { redirect } from '@sveltejs/kit';
import { dbConn } from '$lib/utils/mongo';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/signup');
	}

	const db = await dbConn();
	const query = { email: locals.user.email };
	const options = {
		projection: { _id: 0, name: 1, address: 1 }
	};
	let user = await db.collection('users').findOne(query, options);
	return { user };
};

export const actions = {
	editAddress: async ({ locals, request }) => {
		const data = await request.formData();
		const address = data.get('address');

		const db = await dbConn();
		const filter = { email: locals.user.email };
		const options = { upsert: true };
		const updateDoc = {
			$set: {
				address
			}
		};

		db.collection('users').updateOne(filter, updateDoc, options);
	}
};
