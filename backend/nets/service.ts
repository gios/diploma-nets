import * as knexInstance from 'knex';
import { camelCase, mapKeys } from 'lodash';

import * as knexConfig from '../knexfile';
import { ITransition, IPinnacle, ILinkConnection, INetAttributes } from './interfaces';
const knex = knexInstance(Object.assign(knexConfig, { connection: process.env.DATABASE_URL }));

export class NetService {

  async getNetTransitions(): Promise<ITransition[]> {
    const transitions = await knex.select('*').from('transitions');
    return this.transformResponse(transitions);
  }

  async getNetPinnacles(): Promise<IPinnacle[]> {
    const pinnacles = await knex.select('*').from('pinnacles');
    return this.transformResponse(pinnacles);
  }

  async getNetConnections(): Promise<ILinkConnection[]> {
    const connections = await knex.select('*').from('link_connections');
    return this.transformLinkConnections(this.transformResponse(connections));
  }

  async getNetAttributes(): Promise<INetAttributes> {
    return {
      transitions: await this.getNetTransitions(),
      pinnacles: await this.getNetPinnacles(),
      connections: await this.getNetConnections()
    };
  }

  private transformResponse(data: any[]): any[] {
    return data.map(item => mapKeys(item, (_, key: string) => camelCase(key)));
  }

  private transformLinkConnections(data: ILinkConnection[]) {
    return data.map((item) => {
      if (item.from - 1) {
        item.connect = [{ transitionId: item.transitionId }, { pinnacleId: item.pinnacleId }];
      } else {
        item.connect = [{ pinnacleId: item.pinnacleId }, { transitionId: item.transitionId }];
      }
      delete item.pinnacleId;
      delete item.transitionId;
      return item;
    });
  }
}
