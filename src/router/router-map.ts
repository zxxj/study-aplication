import { LAYOUT } from './constant';

export const ROUTE_MAP = {
  Dashboard: LAYOUT,
  Analysis: () => import('/@/views/dashboard/analysis/index.vue'),
  Workbench: () => import('/@/views/dashboard/workbench/index.vue'),
};
