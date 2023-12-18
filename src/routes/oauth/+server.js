import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { SECRET_GOOGLE_CLIENT_ID, SECRET_GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { dbConn } from '$lib/utils/mongo';

async function getUserData(access_token, setUserAuthToken) {
	const response = await fetch(
		`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
	);
	const data = await response.json();
	console.log('data :', data);
	try {
		const db = await dbConn();
		const filter = { email: data.email };
		const options = { upsert: true };
		const updateDoc = {
			$set: {
				email: data.email,
				userAuthToken: setUserAuthToken,
				name: data.given_name,
				image: data.picture
			}
		};

		db.collection('users').updateOne(filter, updateDoc, options);
	} catch (error) {
		console.log('Error connecting to DB', error);
	}
}

export const GET = async ({ url, cookies }) => {
	const code = await url.searchParams.get('code');
	try {
		const oAuth2Client = new OAuth2Client(
			SECRET_GOOGLE_CLIENT_ID,
			SECRET_GOOGLE_CLIENT_SECRET,
			'http://localhost:5173/oauth'
		);
		const resp = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(resp.tokens);
		const user = oAuth2Client.credentials;

		let setUserAuthToken = crypto.randomUUID();

		cookies.set('session', setUserAuthToken, {
			maxAge: 60 * 60 * 24 * 5 * 1000, //5 days
			httpOnly: true,
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax'
		});

		await getUserData(user.access_token, setUserAuthToken);
	} catch (err) {
		console.log('Error logging in with OAuth2 user', err);
	}

	throw redirect(303, '/bio');
};
