import faunadb from 'faunadb';
import jwt from 'jsonwebtoken';

// your secret hash
const secret = `fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`;
export const q = faunadb.query;

export const client = new faunadb.Client({ secret });

export const verifyToken = (token) => jwt.verify(token, process.env.jwt_secret);
