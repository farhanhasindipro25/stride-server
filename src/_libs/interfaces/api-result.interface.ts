export interface Result {
  status: number;
  message: string;
  total?:number;
  data?: any;
  error?: string;
  context?: string;
}
