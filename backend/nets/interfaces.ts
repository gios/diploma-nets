interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransition extends ITimestamps {
  id: number;
  name: string;
  time: number;
  x: number;
  y: number;
}

export interface IPinnacle extends ITimestamps {
  id: number;
  name: string;
  value: number;
  x: number;
  y: number;
}

export interface ILinkConnection extends ITimestamps {
  id: number;
  pinnacleId: number;
  transitionId: number;
  from: number;
  value: number;
  connect?: any[];
}

export interface INetAttributes {
  transitions: ITransition[];
  pinnacles: IPinnacle[];
  connections: ILinkConnection[];
}
