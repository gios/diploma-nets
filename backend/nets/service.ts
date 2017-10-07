import * as knexInstance from 'knex';
import { camelCase, mapKeys } from 'lodash';
import { Context } from 'koa';

import * as knexConfig from '../knexfile';
import { ITransition, IPinnacle, ILinkConnection, INetAttributes } from './interfaces';
const knex = knexInstance(Object.assign(knexConfig, { connection: process.env.DATABASE_URL }));

export class NetService {

  async getNetTransitions(ctx: Context): Promise<ITransition[]> {
    const user = ctx.state.user;
    const transitions = await knex.select(
      'id',
      'name',
      'time',
      'x',
      'y',
      'created_at',
      'updated_at'
    ).from('transitions').where('user_id', user.id);
    return this.transformResponse(transitions);
  }

  async getNetPinnacles(ctx: Context): Promise<IPinnacle[]> {
    const user = ctx.state.user;
    const pinnacles = await knex.select(
      'id',
      'name',
      'value',
      'x',
      'y',
      'created_at',
      'updated_at'
    ).from('pinnacles').where('user_id', user.id);
    return this.transformResponse(pinnacles);
  }

  async getNetConnections(ctx: Context): Promise<ILinkConnection[]> {
    const user = ctx.state.user;
    const connections = await knex.select(
      'link_connections.id',
      'link_connections.from',
      'link_connections.value',
      'link_connections.created_at',
      'link_connections.updated_at',
      'pinnacles.name as pinnacle_name',
      'transitions.name as transition_name'
    )
      .from('link_connections')
      .where('link_connections.user_id', user.id)
      .leftJoin('pinnacles', 'link_connections.pinnacle_id', 'pinnacles.id')
      .leftJoin('transitions', 'link_connections.transition_id', 'transitions.id');
    return this.transformLinkConnections(this.transformResponse(connections));
  }

  async getNetAttributes(ctx: Context): Promise<INetAttributes> {
    return {
      transitions: await this.getNetTransitions(ctx),
      pinnacles: await this.getNetPinnacles(ctx),
      connections: await this.getNetConnections(ctx)
    };
  }

  async putNetTransition(ctx: Context) {
    const user = ctx.state.user;
    const {
      id,
      name,
      time,
      x,
      y,
    } = ctx.request.body;

    return await knex('transitions')
      .returning([
        'id',
        'name',
        'time',
        'x',
        'y',
        'created_at',
        'updated_at'])
      .where('user_id', user.id)
      .andWhere('id', id)
      .update({
        name,
        time,
        x,
        y,
        updated_at: new Date()
      });
  }

  async putNetPinnacle(ctx: Context) {
    const user = ctx.state.user;
    const {
      id,
      name,
      value,
      x,
      y,
    } = ctx.request.body;

    return await knex('pinnacles')
      .returning([
        'id',
        'name',
        'value',
        'x',
        'y',
        'created_at',
        'updated_at'])
      .where('user_id', user.id)
      .andWhere('id', id)
      .update({
        name,
        value,
        x,
        y,
        updated_at: new Date()
      });
  }

  private transformResponse(data: any[]): any[] {
    return data.map(item => mapKeys(item, (_, key: string) => camelCase(key)));
  }

  private transformLinkConnections(data: ILinkConnection[]) {
    return data.map((item) => {
      if (item.from - 1) {
        item.connect = [
          { type: 'transition', name: item.transitionName },
          { type: 'pinnacle', name: item.pinnacleName }
        ];
      } else {
        item.connect = [
          { type: 'pinnacle', name: item.pinnacleName },
          { type: 'transition', name: item.transitionName }
        ];
      }
      delete item.pinnacleName;
      delete item.transitionName;
      delete item.from;
      return item;
    });
  }
}
