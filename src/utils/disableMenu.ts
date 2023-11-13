// 禁用父级菜单时,必须要先校验所有子菜单是否全部处于禁用状态
export const checkAllChildrenMenuDisable = (menuList, updateMenu) => {
  const id = updateMenu.id;
  let isCloseAllMenu = true;

  // 所有二级菜单
  const subMenuList = menuList.filter((menu) => menu.pid === id);

  // 判断所有二级菜单是否全部是禁用状态
  subMenuList.forEach((subItem) => {
    if (Number(subItem.active) === 1) {
      isCloseAllMenu = false;
      return;
    }
  });

  return isCloseAllMenu;
};
