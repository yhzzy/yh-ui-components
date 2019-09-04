<template>
  <div class="yh-week-range">
    <el-date-picker
      v-model="weekTimesNum"
      type="daterange"
      range-separator="至"
      format="yyyy"
      start-placeholder="开始周数"
      end-placeholder="结束周数"
      v-bind="{ ...weekConfig }"
      @change="changeWeeks"
    >
    </el-date-picker>
    <span class="yh-week-range-start-mask">{{ startWeek }}</span>
    <span class="yh-week-range-end-mask">{{ endWeek }}</span>
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
    weekConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      weekTimesNum: this.$props.weekTimes,
      startWeek: '',
      endWeek: '',
    };
  },
  methods: {
    changeWeeks(value) {
      const vm = this;
      vm.$emit('update:weekTimes', value.join(','));
      vm.getYearWeek(value);
    },
    getYearWeek(date) {
      const vm = this;
      const start = date[0];
      const end = date[1];
      vm.startWeek = moment(start).format('YYYY 第 WW 周');
      vm.endWeek = moment(end).format('YYYY 第 WW 周');
    },
  },
};
</script>
