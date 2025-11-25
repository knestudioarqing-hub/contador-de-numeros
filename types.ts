export interface HistoryItem {
  id: string;
  value: number;
  timestamp: Date;
  action: 'increment' | 'decrement' | 'reset' | 'set';
}

export enum FactStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}