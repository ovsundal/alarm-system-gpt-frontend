export interface ILlmWellMeasurement {
  well_id: number;
  well_name: string;
  start_time: number;
  reference_rate?: number;
  pressure: number;
  wpi?: number;
  rpi?: number;
  cpi?: number;
  rpi_slope_1: number;
  rpi_intercept_1: number;
  rpi_r_squared_1: number[];
}
