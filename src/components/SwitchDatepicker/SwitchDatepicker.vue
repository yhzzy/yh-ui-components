<template>
  <div class="yh-switch-datepicker clear">
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
      dateTypes: {
        date: {
          type: 'date',
          format: 'yyyy-MM-dd',
          placeholder: '请选择日期',
        },
        week: {
          type: 'week',
          format: 'yyyy 第 WW 周',
          placeholder: '请选择周数',
        },
        month: {
          type: 'month',
          format: 'yyyy-MM',
          placeholder: '请选择月份',
        },
        year: {
          type: 'year',
          format: 'yyyy',
          placeholder: '请选择年份',
        },
      },
      btnName: {
        date: '日',
        week: '周',
        month: '月',
        year: '年',
      },
      activeType: 'date',
    };
  },
  methods: {
    changeType(item) {
      const vm = this;
      if (vm.activeType === item) return;
      vm.activeType = item;
      vm.$emit('change-type', item);
    },
    changeTime() {
      const vm = this;
      vm.$emit('input', vm.timeValue);
    },
    updateVal(val) {
      const vm = this;
      vm.timeValue = val;
    },
  },
};
</script>
