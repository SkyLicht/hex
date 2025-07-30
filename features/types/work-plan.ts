export type PlatformModel = {
  f_n: number;
  platform: string;
  uph: number;
  in_service: boolean;
  components_list_id: string;
  height: number;
  id: string;
  sku: string;
  cost: number;
  components: number;
  width: number;
};

export type WorkPlanModel = {
  id: string;
  platform_id: string;
  line_id: string;
  planned_hours: number;
  target_oee: number;
  uph: number;
  start_hour: number;
  end_hour: number;
  str_date: string;
  week: number;
  head_count: number;
  ft: number;
  ict: number;
  line: string;
  factory: string;
  uph_meta: number;
  commit: number;
  commit_full: number;
  platform: PlatformModel;
};
