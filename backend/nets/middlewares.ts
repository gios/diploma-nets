import { Context } from 'koa';

import { NetService } from './service';

const netService = new NetService();

export async function getNetTransitions(ctx: Context) {
  ctx.body = await netService.getNetTransitions(ctx);
}

export async function getNetPinnacles(ctx: Context) {
  ctx.body = await netService.getNetPinnacles(ctx);
}

export async function getNetConnections(ctx: Context) {
  ctx.body = await netService.getNetConnections(ctx);
}

export async function getNet(ctx: Context) {
  ctx.body = await netService.getNetAttributes(ctx);
}

export async function putNetTransition(ctx: Context) {
  ctx.body = await netService.putNetTransition(ctx);
}

export async function putNetPinnacle(ctx: Context) {
  ctx.body = await netService.putNetPinnacle(ctx);
}

export async function putNetConnection(ctx: Context) {
  ctx.body = await netService.putNetConnection(ctx);
}

export async function postNetTransition(ctx: Context) {
  ctx.body = await netService.postNetTransition(ctx);
}

export async function postNetPinnacle(ctx: Context) {
  ctx.body = await netService.postNetPinnacle(ctx);
}

export async function postNetConnection(ctx: Context) {
  ctx.body = await netService.postNetConnection(ctx);
}

export async function deleteNetTransition(ctx: Context) {
  ctx.body = await netService.deleteNetTransition(ctx);
}

export async function deleteNetPinnacle(ctx: Context) {
  ctx.body = await netService.deleteNetPinnacle(ctx);
}

export async function deleteNetConnection(ctx: Context) {
  ctx.body = await netService.deleteNetConnection(ctx);
}

export async function startHistory(ctx: Context) {
  ctx.body = await netService.startHistory(ctx);
}

export async function postHistory(ctx: Context) {
  ctx.body = await netService.postHistory(ctx);
}

export async function getHistory(ctx: Context) {
  ctx.body = await netService.getHistory(ctx);
}
