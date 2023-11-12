import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
  GetBackActiveMenuList = '/menu/active', // 获取当前可用的菜单
  CreateMenu = '/menu',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

export const getBackActiveMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetBackActiveMenuList });
};

export const createMenu = (data) => {
  return defHttp.post({ url: Api.CreateMenu, data });
};
