import * as knexInstance from 'knex';
import { camelCase, mapKeys, first } from 'lodash';
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
      'transitions.name as transition_name',
      'pinnacles.id as pinnacle_id',
      'transitions.id as transition_id'
    )
      .from('link_connections')
      .where('link_connections.user_id', user.id)
      .leftJoin('pinnacles', 'link_connections.pinnacle_id', 'pinnacles.id')
      .leftJoin('transitions', 'link_connections.transition_id', 'transitions.id');
    return this.transformLinkConnections(this.transformResponse(connections));
  }

  async getNetAttributes(ctx: Context): Promise<INetAttributes> {
    return {
      pinnacles: await this.getNetPinnacles(ctx),
      transitions: await this.getNetTransitions(ctx),
      connections: await this.getNetConnections(ctx)
    };
  }

  async putNetTransition(ctx: Context) {
    const id = ctx.params.id;
    const user = ctx.state.user;
    const {
      name,
      time,
      x,
      y,
    } = ctx.request.body;

    const transitionExist = await knex('transitions').first('id').where('name', name);

    if (transitionExist) {
      ctx.throw('Transition should be unique', 409);
    }

    const response = await knex('transitions')
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

    return this.transformResponse(response, true);
  }

  async putNetPinnacle(ctx: Context) {
    const id = ctx.params.id;
    const user = ctx.state.user;
    const {
      name,
      value,
      x,
      y,
    } = ctx.request.body;

    const pinnacleExist = await knex('pinnacles').first('id').where('name', name);

    if (pinnacleExist) {
      ctx.throw('Pinnacle should be unique', 409);
    }

    const response = await knex('pinnacles')
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
    return this.transformResponse(response, true);
  }

  async putNetConnection(ctx: Context) {
    const id = ctx.params.id;
    const user = ctx.state.user;
    const {
      value,
      connect
    } = ctx.request.body;

    let transitionId;
    let pinnacleId;
    const from = connect[0].type === 'transition' ? 2 : 1;

    connect.forEach(item => {
      if (item.type === 'transition') {
        transitionId = item.id;
      } else {
        pinnacleId = item.id;
      }
    });

    await knex('link_connections')
      .where('user_id', user.id)
      .andWhere('id', id)
      .update({
        value,
        from,
        pinnacle_id: pinnacleId,
        transition_id: transitionId,
        updated_at: new Date()
      });

    const connection = await knex.select(
      'link_connections.id',
      'link_connections.from',
      'link_connections.value',
      'link_connections.created_at',
      'link_connections.updated_at',
      'pinnacles.name as pinnacle_name',
      'transitions.name as transition_name',
      'pinnacles.id as pinnacle_id',
      'transitions.id as transition_id'
    )
      .from('link_connections')
      .where('link_connections.user_id', user.id)
      .andWhere('link_connections.id', id)
      .leftJoin('pinnacles', 'link_connections.pinnacle_id', 'pinnacles.id')
      .leftJoin('transitions', 'link_connections.transition_id', 'transitions.id');
    return first(this.transformLinkConnections(this.transformResponse(connection)));
  }

  async postNetTransition(ctx: Context) {
    const user = ctx.state.user;
    const {
      name,
      time,
      x,
      y,
    } = ctx.request.body;

    const transitionExist = await knex('transitions').first('id').where('name', name);

    if (transitionExist) {
      ctx.throw('Transition should be unique', 409);
    }

    const response = await knex('transitions')
      .returning([
        'id',
        'name',
        'time',
        'x',
        'y',
        'created_at',
        'updated_at'])
      .insert({
        name,
        time,
        x,
        y,
        user_id: user.id
      });

    return this.transformResponse(response, true);
  }

  async postNetPinnacle(ctx: Context) {
    const user = ctx.state.user;
    const {
      name,
      value,
      x,
      y,
    } = ctx.request.body;

    const pinnacleExist = await knex('pinnacles').first('id').where('name', name);

    if (pinnacleExist) {
      ctx.throw('Pinnacle should be unique', 409);
    }

    const response = await knex('pinnacles')
      .returning([
        'id',
        'name',
        'value',
        'x',
        'y',
        'created_at',
        'updated_at'])
      .insert({
        name,
        value,
        x,
        y,
        user_id: user.id
      });
    return this.transformResponse(response, true);
  }

  async postNetConnection(ctx: Context) {
    const user = ctx.state.user;
    const {
      value,
      connect
    } = ctx.request.body;

    let transitionId;
    let pinnacleId;
    const from = connect[0].type === 'transition' ? 2 : 1;

    connect.forEach(item => {
      if (item.type === 'transition') {
        transitionId = item.id;
      } else {
        pinnacleId = item.id;
      }
    });

    const linkId = await knex('link_connections')
      .returning('id')
      .insert({
        value,
        from,
        pinnacle_id: pinnacleId,
        transition_id: transitionId,
        user_id: user.id
      });

    const connection = await knex.select(
      'link_connections.id',
      'link_connections.from',
      'link_connections.value',
      'link_connections.created_at',
      'link_connections.updated_at',
      'pinnacles.name as pinnacle_name',
      'transitions.name as transition_name',
      'pinnacles.id as pinnacle_id',
      'transitions.id as transition_id'
    )
      .from('link_connections')
      .where('link_connections.user_id', user.id)
      .andWhere('link_connections.id', linkId[0])
      .leftJoin('pinnacles', 'link_connections.pinnacle_id', 'pinnacles.id')
      .leftJoin('transitions', 'link_connections.transition_id', 'transitions.id');
    return first(this.transformLinkConnections(this.transformResponse(connection)));
  }

  async deleteNetTransition(ctx: Context) {
    const id = ctx.params.id;

    if (!id) {
      ctx.throw('id should be specified.', 406);
    }
    await knex('transitions').where('id', id).del();
    return { message: 'Transition has deleted' };
  }

  async deleteNetPinnacle(ctx: Context) {
    const id = ctx.params.id;

    if (!id) {
      ctx.throw('id should be specified.', 406);
    }
    await knex('pinnacles').where('id', id).del();
    return { message: 'Pinnacle has deleted' };
  }

  async deleteNetConnection(ctx: Context) {
    const id = ctx.params.id;

    if (!id) {
      ctx.throw('id should be specified.', 406);
    }
    await knex('link_connections').where('id', id).del();
    return { message: 'Connection has deleted' };
  }

  async startHistory(ctx: Context) {
    const user = ctx.state.user;

    const response = await knex('net_records_history')
      .returning(['id'])
      .insert({
        user_id: user.id
      });
    return first(response);
  }

  async postHistory(ctx: Context) {
    const user = ctx.state.user;
    const {
      historyId,
      time,
      ids,
      values
    } = ctx.request.body;

    const saveObj = ids.map((id, index) => {
      return {
        time,
        pinnacle_id: id,
        value: values[index],
        net_record_history_id: historyId,
        user_id: user.id
      };
    });

    const pinnacleNames = await knex('pinnacles').select('name').whereIn('id', ids);
    await knex('net_records').insert(saveObj);

    return { message: `${pinnacleNames.map(item => item.name)} state has saved` };
  }

  async getHistory(ctx: Context) {
    const user = ctx.state.user;
    const historyId = ctx.params.id;
    const pinnacleId = ctx.request.query ? ctx.request.query.pinnacleId : null;
    let response;

    if (pinnacleId) {
      response = await knex('net_records')
        .select(
        'net_records.id',
        'net_records.time',
        'net_records.value',
        'net_records.created_at',
        'net_records.updated_at',
        'pinnacles.name'
        )
        .where('net_records.net_record_history_id', historyId)
        .andWhere('net_records.user_id', user.id)
        .andWhere('net_records.pinnacle_id', pinnacleId)
        .leftJoin('pinnacles', 'net_records.pinnacle_id', 'pinnacles.id');
    } else {
      response = await knex('net_records')
        .select(
        'net_records.id',
        'net_records.time',
        'net_records.value',
        'net_records.created_at',
        'net_records.updated_at',
        'pinnacles.name'
        )
        .where('net_records.net_record_history_id', historyId)
        .andWhere('net_records.user_id', user.id)
        .leftJoin('pinnacles', 'net_records.pinnacle_id', 'pinnacles.id');
    }
    return this.transformResponse(response);
  }

  private transformResponse(data: any[], single = false): any[] {
    const transformed: any[] = data.map(item => mapKeys(item, (_, key: string) => camelCase(key)));
    if (single) {
      return first(transformed);
    } else {
      return transformed;
    }
  }

  private transformLinkConnections(data: ILinkConnection[]) {
    return data.map((item) => {
      if (item.from - 1) {
        item.connect = [
          { type: 'transition', name: item.transitionName, id: item.transitionId },
          { type: 'pinnacle', name: item.pinnacleName, id: item.pinnacleId }
        ];
      } else {
        item.connect = [
          { type: 'pinnacle', name: item.pinnacleName, id: item.pinnacleId },
          { type: 'transition', name: item.transitionName, id: item.transitionId }
        ];
      }
      delete item.pinnacleName;
      delete item.transitionName;
      delete item.pinnacleId;
      delete item.transitionId;
      delete item.from;
      return item;
    });
  }
}
