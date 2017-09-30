import { Context } from 'koa';

import { NetService } from './service';

const netService = new NetService();

export async function getNetTransitions(ctx: Context) {
  ctx.body = await netService.getNetTransitions();
}

export async function getNetPinnacles(ctx: Context) {
  ctx.body = await netService.getNetPinnacles();
}

export async function getNetConnections(ctx: Context) {
  ctx.body = await netService.getNetConnections();
}

export async function getNet(ctx: Context) {
  ctx.body = await netService.getNetAttributes();
}
