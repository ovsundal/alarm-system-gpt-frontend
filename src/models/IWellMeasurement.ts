export interface IWellMeasurement {
  CPI: string;
  P_26hr: string;
  P_58hr: string;
  RPI: string;
  T_26hr: string;
  T_58hr: string;
  WPI: string;
  derivative_std: string;
  "duration/hr": string;
  "end timestamp": string;
  is_prev_shutin: string;
  is_shutin: string;
  pressure_std: string;
  q: string;
  "reference rate": string;
  "start timestamp": string;
  well_id: number;
}
