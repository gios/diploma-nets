import * as knexInstance from 'knex';
import * as crypto from 'crypto';
import * as winston from 'winston';
import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';

import * as knexConfig from '../knexfile';
const knex = knexInstance(Object.assign(knexConfig, { connection: process.env.DATABASE_URL }));
const cipherType = 'aes-256-cbc';
const saltWord = 'salt';
const SHARED_SECRET = 'nets';

export class UserService {

  async login(ctx: Context): Promise<string> {
    const { username, password } = ctx.request.body;
    const foundUserPassword = await knex('users')
      .where('username', username)
      .first('id', 'password');

    if (!foundUserPassword) {
      ctx.throw('User is not found', 404);
    }

    const isCorrectPassword = (this.encryptoPassword(foundUserPassword.password) === password ? true : false);

    if (!isCorrectPassword) {
      ctx.throw('Password is not correct', 404);
    }

    const foundUser = await knex('users')
      .where('id', foundUserPassword.id)
      .first('username', 'id');

    return jwt.sign({ id: foundUser.id, username: foundUser.username }, SHARED_SECRET, { expiresIn: '10h' });
  }

  async registration(ctx: Context): Promise<string> {
    const { username, password } = ctx.request.body;
    const passwordHash = this.cryptoPassword(password);

    const usernameExist = await knex('users').first('id').where('username', username);

    if (usernameExist) {
      ctx.throw('Username should be unique', 409);
    }

    const userId = await knex('users')
      .returning('id')
      .insert({
        username,
        password: passwordHash,
        created_at: new Date(),
        updated_at: new Date()
      });

    const user = await knex('users')
      .where('id', userId[0])
      .first('username', 'id');

    return jwt.sign({ id: user.id, username: user.username }, SHARED_SECRET, { expiresIn: '10h' });
  }

  private cryptoPassword(password: Buffer) {
    const cipher = crypto.createCipher(cipherType, saltWord);
    cipher.update(password);
    try {
      return cipher.final('hex');
    } catch (error) {
      winston.error(error);
      return;
    }
  }

  private encryptoPassword(hash: string) {
    const decipher = crypto.createDecipher(cipherType, saltWord);
    decipher.update(hash, 'hex');
    try {
      return decipher.final('utf8');
    } catch (error) {
      winston.error(error);
      return;
    }
  }
}
