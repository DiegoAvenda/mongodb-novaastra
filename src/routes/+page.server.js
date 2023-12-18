/* 
import { dbConn } from '$lib/utils/mongo';

export async function load() {
	try {
		const db = await dbConn();
		const users = await db.collection('user').find();
		return users;
	} catch (error) {
		console.log('error conecting to db', error);
	}
}

*/

export const actions = {
	logout: ({ locals, cookies }) => {
		cookies.delete('session', { path: '/' });
		locals.user = null;
	}
};
