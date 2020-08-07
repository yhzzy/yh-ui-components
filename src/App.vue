<template>
  <div id="app">
    <el-input v-model="mydata['1']"></el-input>
    <yh-query
      :model.sync="model"
      model-name="model"
      :config.sync="config"
      @search="search"
    ></yh-query>
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
      ref="switchDatepicker"
      v-model="timeValue"
      :element-config="weekConfig"
      :types="['hour', 'date', 'week', 'month']"
      @change-type="changeType"
    ></yh-switch-datepicker>
    <el-button type="primary" @click="testTime">testTime</el-button>
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
    <yh-count-to :config="countsConfig"></yh-count-to>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      counts: 733,
      countsConfig: {
        startVal: 0,
        endVal: 25678.3556,
        duration: 3000,
        decimals: 2,
        suffix: '万',
        prefix: '￥',
      },
      model: {
        name: '',
        time: '',
        timeType: 2,
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
        {
          type: 'switchDateType',
          prop: 'time',
          switchDateType: {
            prop: 'timeType',
            currentType: 'daterange',
            currentTip: '日期',
            types: [
              {
                label: '月',
                typeValue: 'monthrange',
                value: 1,
                placeholderTip: '月份',
                format: 'yyyy-MM',
              },
              {
                label: '日',
                typeValue: 'daterange',
                value: 2,
                placeholderTip: '日期',
                format: 'yyyy-MM-dd',
              },
            ],
          },
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
      timeValue: '',
      hour: '',
      formatTime: {
        date: val => this.$moment(val).format('YYYY-MM-DD'),
        week: val =>
          this.$moment(val)
            .endOf('isoWeek')
            .format('YYYY-MM-DD'),
        month: val =>
          this.$moment(val)
            .endOf('month')
            .format('YYYY-MM-DD'),
        hour: val => `${this.$moment(val).format('YYYY-MM-DD')} ${this.hour}`,
      },
    };
  },
  created() {
    this.mydata['1'] = 'aaa';
    this.mydata.set('2', '111');
    this.timeValue = this.$moment(Date.now()).format('YYYY-MM-DD HH:00');
    this.hour = this.$moment(Date.now()).format('HH:00');
  },
  methods: {
    testTime() {
      const vm = this;
      console.log(vm.timeValue);
    },
    search(params) {
      const vm = this;
      const { queryParams } = params;
      console.log(queryParams);
      vm.model = {
        ...queryParams,
      };
    },
    showValue() {
      console.log(this.timeValue);
    },
    changeType(type) {
      const vm = this;
      console.log(type);
      console.log(vm.timeValue);
      console.log(vm.hour);
      vm.type = type;
      const timeValueOf = vm.$moment(vm.timeValue).valueOf();
      const now = Date.now();
      let time;
      if ((type === 'date' || type === 'week') && timeValueOf > now) {
        time = vm.formatTime[type](now);
      } else {
        time = vm.formatTime[type](vm.timeValue);
      }
      vm.$refs.switchDatepicker.updateVal(time);
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
