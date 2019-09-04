<template>
  <div id="app">
    <yh-query :model="model" :config="config" @search="search"></yh-query>
    <yh-dashboard-card>
      <h3 slot="title">测试标题</h3>
      <p>我是测试的内容</p>
      <small slot="desc">我是测试的描述信息</small>
    </yh-dashboard-card>
    <yh-block-title title="测试标题"></yh-block-title>
    <yh-block-title title="测试插槽标题">
      <i slot="icon" class="el-icon-edit slot-icon"></i>
    </yh-block-title>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      model: {
        name: '',
        age: '',
        sexy: '',
        loveCity: '',
      },
      config: [
        {
          type: 'input',
          prop: 'name',
          config: {
            placeholder: '请输入姓名',
          },
        },
        {
          type: 'input',
          prop: 'age',
          config: {
            placeholder: '请输入年龄',
          },
        },
        {
          type: 'select',
          prop: 'sexy',
          optionGroup: false,
          config: {
            placeholder: '请选择性别',
          },
          value: 'id',
          key: 'name',
          options: [
            {
              name: '男',
              id: 1,
            },
            {
              name: '女',
              id: 2,
            },
          ],
        },
        {
          type: 'select',
          prop: 'loveCity',
          config: {
            placeholder: '请选择喜爱的城市',
          },
          optionGroup: true,
          options: [
            {
              label: '西部',
              options: [
                {
                  label: '成都',
                  value: 1,
                },
                {
                  label: '重庆',
                  value: 2,
                },
              ],
            },
            {
              label: '东部',
              options: [
                {
                  label: '上海',
                  value: 3,
                },
                {
                  label: '杭州',
                  value: 4,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    search(params) {
      console.log(params);
    },
  },
};
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
