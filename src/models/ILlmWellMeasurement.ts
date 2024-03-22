export interface ILlmWellMeasurement {
  well_id: number;
  well_name: string;
  start_time?: number;
  reference_rate?: number;
  pressure?: number;
  temperature?: number;
  wpi?: number;
  rpi?: number;
  cpi?: number;
}
