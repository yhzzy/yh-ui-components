<template>
  <div class="yh-ui yh-switch-datepicker clear">
    <div class="yh-switch-datepicker-input">
      <el-date-picker
        :key="activeType"
        v-model="timeValue"
        :clearable="false"
        size="small"
        v-bind="{ ...dateTypes[activeType], ...elementConfig }"
        @change="changeTime"
      >
      </el-date-picker>
      <el-time-select
        v-if="activeType === 'hour'"
        v-model="hourValue"
        size="small"
        :picker-options="{
          start: '00:00',
          step: '01:00',
          end: '23:00',
        }"
        placeholder="选择时间"
        @change="changeHour"
      >
      </el-time-select>
    </div>
    <div class="yh-switch-datepicker-type">
      <el-button
        v-for="item in types"
        :key="item"
        :class="{ active: activeType === item }"
        class="yh-switch-datepicker-type-btn"
        plain
        @click="changeType(item)"
      >
        {{ btnName[item] }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchDatepicker',
  props: {
    value: {
      type: [String, Number, Date],
      required: true,
    },
    hour: {
      type: String,
      default: '',
    },
    types: {
      type: Array,
      default: () => {
        return ['date', 'week', 'month'];
      },
    },
    elementConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      timeValue: this.value,
      hourValue: this.hour,
      dateTypes: {
        hour: {
          type: 'date',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          placeholder: '请选择日期',
        },
        date: {
          type: 'date',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          placeholder: '请选择日期',
        },
        week: {
          type: 'week',
          format: 'yyyy 第 WW 周',
          valueFormat: 'yyyy-MM-dd',
          placeholder: '请选择周数',
        },
        month: {
          type: 'month',
          format: 'yyyy-MM',
          valueFormat: 'yyyy-MM-dd',
          placeholder: '请选择月份',
        },
        year: {
          type: 'year',
          format: 'yyyy',
          valueFormat: 'yyyy-MM-dd',
          placeholder: '请选择年份',
        },
      },
      btnName: {
        hour: '时',
        date: '日',
        week: '周',
        month: '月',
        year: '年',
      },
      activeType: this.types[0],
    };
  },
  methods: {
    changeHour(val) {
      const vm = this;
      const { timeValue } = vm;
      const dateTime = timeValue.split(' ')[0];
      const currentTime = `${dateTime} ${val}`;
      vm.$emit('update:hour', val);
      vm.$emit('input', currentTime);
    },
    changeType(item) {
      const vm = this;
      if (vm.activeType === item) return;
      vm.activeType = item;
      vm.$emit('change-type', item);
    },
    changeTime() {
      const vm = this;
      const { activeType, timeValue, hourValue } = vm;
      const currentTime = activeType !== 'hour' ? timeValue : `${timeValue} ${hourValue}`;
      vm.$emit('input', currentTime);
    },
    updateVal(val) {
      const vm = this;
      vm.timeValue = val;
      vm.$emit('input', vm.timeValue);
    },
  },
};
</script>
