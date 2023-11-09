// import { LAYOUT } from './constant';
import { asyncRoutes } from './routes';

// export const ROUTE_MAP = {
//   Dashboard: LAYOUT,
//   Analysis: () => import('/@/views/dashboard/analysis/index.vue'),
//   Workbench: () => import('/@/views/dashboard/workbench/index.vue'),
// };

const routesList = {};
export const generateRouteMap = (routes) => {
  return routes.map((route) => {
    if (route.children && route.children.length > 0) {
      generateRouteMap(route.children);
    }

    routesList[route.name] = route.component;
  });
};

generateRouteMap(asyncRoutes);

console.log(routesList, 111);

export const ROUTE_MAP = routesList;
