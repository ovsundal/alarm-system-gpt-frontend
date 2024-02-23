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

  wpi_slope_1: number | undefined;
  wpi_intercept_1: number | undefined;
  wpi_r_squared_1: number[] | undefined;
  cpi_slope_1: number | undefined;
  cpi_intercept_1: number | undefined;
  cpi_r_squared_1: number[] | undefined;
  rpi_slope_1: number | undefined;
  rpi_intercept_1: number | undefined;
  rpi_r_squared_1: number[] | undefined;

  wpi_slope_2: number | undefined;
  wpi_intercept_2: number | undefined;
  wpi_r_squared_2: number[] | undefined;
  cpi_slope_2: number | undefined;
  cpi_intercept_2: number | undefined;
  cpi_r_squared_2: number[] | undefined;
  rpi_slope_2: number | undefined;
  rpi_intercept_2: number | undefined;
  rpi_r_squared_2: number[] | undefined;

  wpi_slope_3: number | undefined;
  wpi_intercept_3: number | undefined;
  wpi_r_squared_3: number[] | undefined;
  cpi_slope_3: number | undefined;
  cpi_intercept_3: number | undefined;
  cpi_r_squared_3: number[] | undefined;
  rpi_slope_3: number | undefined;
  rpi_intercept_3: number | undefined;
  rpi_r_squared_3: number[] | undefined;

  wpi_slope_4: number | undefined;
  wpi_intercept_4: number | undefined;
  wpi_r_squared_4: number[] | undefined;
  cpi_slope_4: number | undefined;
  cpi_intercept_4: number | undefined;
  cpi_r_squared_4: number[] | undefined;
  rpi_slope_4: number | undefined;
  rpi_intercept_4: number | undefined;
  rpi_r_squared_4: number[] | undefined;
}
