export interface IWellMeasurement {
  start_time: number;
  reference_rate: number;
  pressure: number;
  temperature: number;
  wpi: number;
  rpi: number;
  cpi: number;
  well_id: number;
  alarm_lower_limit: number | null;
  alarm_upper_limit: number | null;
}
