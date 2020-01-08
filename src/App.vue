<template>
  <div id="app">
    <el-input v-model="mydata['1']"></el-input>
    <yh-query :model="model" model-name="model" :config="config" @search="search"></yh-query>
    <yh-dashboard-card>
      <p slot="title">测试标题</p>
      <p>556</p>
      <small slot="desc">我是测试的描述信息</small>
    </yh-dashboard-card>
    <yh-block-title title="测试标题"></yh-block-title>
    <yh-block-title title="测试插槽标题">
      <i slot="icon" class="el-icon-edit slot-icon"></i>
    </yh-block-title>
    <yh-switch-datepicker
      v-model="timeValue"
      :element-config="weekConfig"
      @change-type="changeType"
    ></yh-switch-datepicker>
    <yh-card shadow="hover">
      <div slot="header">
        <yh-block-title title="测试标题"></yh-block-title>
      </div>
      <p>测试的内容</p>
    </yh-card>
    <yh-week-range :week-times.sync="weekTimes" :week-config="weekConfig"></yh-week-range>
    <el-button @click="showValue">showValue</el-button>
    <el-button @click="setCounts">setValue</el-button>
    <el-button @click="nextCounts">nextCounts</el-button>
    <yh-num-counts v-model="counts" :duration="1"></yh-num-counts>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      counts: 733,
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
          elementConfig: {
            placeholder: '请输入姓名',
          },
        },
        {
          type: 'input',
          prop: 'age',
          elementConfig: {
            placeholder: '请输入年龄',
          },
        },
        {
          type: 'select',
          prop: 'sexy',
          optionGroup: false,
          elementConfig: {
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
          elementConfig: {
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
      weekTimes: '',
      mydata: new Map(),
      weekConfig: {
        pickerOptions: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          },
          firstDayOfWeek: 1,
        },
      },
      timeValue: Date.now(),
    };
  },
  created() {
    this.mydata['1'] = 'aaa';
    this.mydata.set('2', '111');
    console.log(this.mydata);
  },
  methods: {
    search(params) {
      const vm = this;
      const { queryParams } = params;
      vm.model = {
        ...queryParams,
      };
    },
    showValue() {
      console.log(this.timeValue);
    },
    changeType(val) {
      console.log(val);
    },
    setCounts() {
      const vm = this;
      vm.counts = 0;
    },
    nextCounts() {
      const vm = this;
      vm.counts = 733;
    },
  },
};
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
