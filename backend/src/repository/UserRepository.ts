import getDB from "../config/db";
import { User } from "../models/User";

export class UserRepository {
    async getAll(): Promise<User[]> {
        const db = await getDB();
        const rows = await db.query('SELECT * FROM `users` WHERE `name` = ? AND `age` > ?', ['Page', 45]);

        if (!Array.isArray(rows)) {
          throw new Error('Expected rows to be an array');
        }
        // 'rows' is the array containing the result data
        return rows as User[];
    }
}