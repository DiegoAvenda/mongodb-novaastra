import { MongoClient } from 'mongodb';
import { SECRET_MONGO_DB } from '$env/static/private';

export async function dbConn() {
	const client = new MongoClient(SECRET_MONGO_DB);
	await client.connect();
	const db = client.db('novastra');
	return db;
}
