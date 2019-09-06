<template>
  <div class="yh-week-range">
    <el-date-picker
      v-model="weekTimesNumData"
      type="daterange"
      range-separator="至"
      format="yyyy"
      start-placeholder="开始周数"
      end-placeholder="结束周数"
      v-bind="{ ...elementConfig }"
      @change="changeWeeks"
    >
    </el-date-picker>
    <span class="yh-week-range-start-mask">{{ weekData.startWeek }}</span>
    <span class="yh-week-range-end-mask">{{ weekData.endWeek }}</span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'WeekRange',
  props: {
    weekTimes: {
      type: String,
      required: true,
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
      weekTimesNumData: '',
      weekData: {
        startWeek: '',
        endWeek: '',
      },
    };
  },
  computed: {
    weekTimesNum: {
      get() {
        const vm = this;
        vm.weekTimesNumData = vm.$props.weekTimes;
        return vm.weekTimesNumData;
      },
      set(newValue) {
        const vm = this;
        vm.weekTimesNumData = newValue;
      },
    },
  },
  methods: {
    changeWeeks(value) {
      const vm = this;
      if (value === null || value === '') {
        return Object.assign(vm.$data.weekData, vm.$options.data().weekData);
      }
      vm.$emit('update:weekTimes', value.join(','));
      return vm.getYearWeek(value);
    },
    getYearWeek(date) {
      const vm = this;
      const start = date[0];
      const end = date[1];
      vm.weekData.startWeek = moment(start).format('YYYY 第 WW 周');
      vm.weekData.endWeek = moment(end).format('YYYY 第 WW 周');
    },
  },
};
</script>
