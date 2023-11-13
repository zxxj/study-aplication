<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getMenuList } from '/@/api/demo/system';
  import { createMenu, updateMenu } from '/@/api/sys/menu';
  import { checkAllChildrenMenuDisable } from '/@/utils/disableMenu';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      let menuList; // 保存菜单列表,用于编辑菜单时获取id
      const { createMessage } = useMessage();

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getMenuList();
        menuList = treeData;
        updateSchema({
          field: 'parentMenu',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          if (!values.parentMenu) {
            delete values.parentMenu;
          } else {
            values.pid = values.parentMenu;
          }

          if (values.status || values.active) {
            values.active = Number(values.status) || Number(values.active);
            delete values.status;
          }

          if (getTitle.value === '编辑菜单') {
            const { id } = menuList.find((menu) => menu.name === values.name);
            values.id = id;
            const res = checkAllChildrenMenuDisable(menuList, values);

            if (res) {
              await updateMenu(values);
            } else {
              createMessage.error('先禁用所有子菜单后才能禁用父菜单');
            }
          } else {
            await createMenu(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
