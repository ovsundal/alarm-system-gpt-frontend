export interface IWellMeasurement {
  start_time: number;
  reference_rate: number;
  pressure: number;
  temperature: number;
  wpi: number;
  rpi: number;
  cpi: number;
  well_id: number;
  rpi_alarm_lower_limit: number | null;
  rpi_alarm_upper_limit: number | null;
  cpi_alarm_lower_limit: number | null;
  cpi_alarm_upper_limit: number | null;
  wpi_alarm_lower_limit: number | null;
  wpi_alarm_upper_limit: number | null;
  wpi_trend: number[]; // slope, y-intercept
  rpi_trend: number[]; // slope, y-intercept
  cpi_trend: number[]; // slope, y-intercept
}
