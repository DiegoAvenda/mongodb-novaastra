import { dbConn } from '$lib/utils/mongo';

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');

	if (!session) {
		//if there is no session load page as normal
		return await resolve(event);
	}

	const db = await dbConn();

	const user = await db.collection('users').findOne({
		userAuthToken: session
	});

	if (user) {
		event.locals.user = {
			email: user.email,
			name: user.name,
			image: user.image
		};
	}

	return await resolve(event);
}
