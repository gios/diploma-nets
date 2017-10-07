import { Context } from 'koa';

import { UserService } from './service';

const userService = new UserService();

export async function login(ctx: Context) {
  ctx.body = { token: await userService.login(ctx) };
}

export async function registration(ctx: Context) {
  ctx.body = { token: await userService.registration(ctx) };
}
