import * as knexInstance from 'knex';

import * as knexConfig from '../knexfile';
const knex = knexInstance(Object.assign(knexConfig, { connection: process.env.DATABASE_URL }));

export class NetService {

  async getNetTransitions() {
    return await knex.select('*').from('transitions');
  }

  async getNetPinnacles() {
    return await knex.select('*').from('pinnacles');
  }

  async getNetConnections() {
    return await knex.select('*').from('link_connections');
  }

  async getNetAttributes() {
    return {
      transitions: await this.getNetTransitions(),
      pinnacles: await this.getNetPinnacles(),
      connections: await this.getNetConnections()
    };
  }
}
