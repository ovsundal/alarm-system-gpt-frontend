export interface IWellMeasurement {
  start_timestamp: string;
  end_timestamp: string;
  duration_hr: string;
  reference_rate: string;
  q: string;
  P_26hr: string;
  T_26hr: string;
  P_58hr: string;
  T_58hr: string;
  wpi: string;
  rpi: string;
  cpi: string;
  is_shutin: string;
  is_prev_shutin: string;
  pressure_std: string;
  derivative_std: string;
  well_id: number;
}
