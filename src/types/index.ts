export interface Transaction {
  position?: number;
  gas_used: number;
  events_count: number;
  messages_count: number;
  fee: string;
  time: string;
  signers: Array<{hash: string}>;
  message_types: string[];
  status: string;
}
