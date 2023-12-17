import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import { OAuth2Client } from 'google-auth-library';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async () => {
		const oAuth2Client = new OAuth2Client(
			SECRET_CLIENT_ID,
			SECRET_CLIENT_SECRET,
			'http://localhost:5173/oauth'
		);

		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.email profile openid',
			prompt: 'consent'
		});
		throw redirect(302, authorizeUrl);
	}
};
