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
      .leftJoin('pinnacles', 'link_connections.pinnacle_id', 'pinnacles.id')
      .leftJoin('transitions', 'link_connections.transition_id', 'transitions.id');
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
