export interface IWellMeasurement {
  well_name: string;
  start_time: number;
  reference_rate: number;
  pressure: number;
  temperature: number;
  wpi: number;
  rpi: number;
  cpi: number;
  well_id: number;
  rpi_alarm_lower_limit: number;
  rpi_alarm_upper_limit: number;
  cpi_alarm_lower_limit: number;
  cpi_alarm_upper_limit: number;
  wpi_alarm_lower_limit: number;
  wpi_alarm_upper_limit: number;
  wpi_trend: number[]; // slope, y-intercept
  rpi_trend: number[]; // slope, y-intercept
  cpi_trend: number[]; // slope, y-intercept

  wpi_slope_1: number | undefined;
  wpi_intercept_1: number | undefined;
  wpi_r_squared_1: number[] | undefined;
  cpi_slope_1: number | undefined;
  cpi_intercept_1: number | undefined;
  cpi_r_squared_1: number[] | undefined;
  rpi_slope_1: number | undefined;
  rpi_intercept_1: number | undefined;
  rpi_r_squared_1: number[] | undefined;

  wpi_slope_pressure_1: number | undefined;
  wpi_intercept_pressure_1: number | undefined;
  wpi_r_squared_pressure_1: number[] | undefined;
  cpi_slope_pressure_1: number | undefined;
  cpi_intercept_pressure_1: number | undefined;
  cpi_r_squared_pressure_1: number[] | undefined;
  rpi_slope_pressure_1: number | undefined;
  rpi_intercept_pressure_1: number | undefined;
  rpi_r_squared_pressure_1: number[] | undefined;
}
