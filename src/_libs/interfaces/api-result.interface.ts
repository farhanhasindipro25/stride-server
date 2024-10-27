export interface Result {
  status: number;
  message: string;
  data?: any;
  error?: string;
  context?: string;
}
