interface ITimestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

interface IConnect {
  type: 'transition' | 'pinnacle';
  name: string;
  id: number;
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
  value: number;
  connect: [IConnect, IConnect];
}

export interface INetAttributes {
  transitions: ITransition[];
  pinnacles: IPinnacle[];
  connections: ILinkConnection[];
}

export interface ISaveRecordData {
  ids: number[];
  values: number[];
}
