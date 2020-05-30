import faunadb from 'faunadb';
import jwt from 'jsonwebtoken';

// your secret hash
const secret = `fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`;
export const q = faunadb.query;

export const client = new faunadb.Client({ secret });

export const verifyToken = (token) => jwt.verify(token, process.env.jwt_secret);
import jwt from 'jsonwebtoken';

module.exports = async (req, res) => {
    try {
        // let res;
        // try {
        //     res = await client.query(
        //         q.Get(q.Match(q.Index('find_user_by_login'), req?.body?.login))
        //     );
        // } catch (e) {}

        // if (res?.data) {
        //     throw new Error('User already exist');
        // }

        const dbs: any = await client.query(
            q.Create(q.Ref(q.Collection('users'), q.NewId()), {
                data: { ...req.body, id: q.NewId() },
            })
        );
        // ok
        const user = {
            userId: dbs?.data?.id,
            login: dbs?.data?.login,
            name: dbs?.data?.name,
        };
        const token = jwt.sign({ user }, process.env.jwt_secret);
        res.status(200).json({ ...user, token });
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
