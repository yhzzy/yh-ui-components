<template>
  <span class="yh-ui yh-num-counts">{{ counts }}</span>
</template>

<script>
export default {
  name: 'NumCounts',
  props: {
    duration: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      required: true,
    },
    decimal: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      counts: 0,
    };
  },
  watch: {
    value(newValue) {
      const vm = this;
      vm.numberGrow(newValue);
    },
  },
  mounted() {
    const vm = this;
    vm.numberGrow(vm.value);
  },
  methods: {
    numberGrow(num) {
      const vm = this;
      const { decimal } = vm;
      const step = (num * 10) / (vm.duration * 1000);
      let current = 0;
      let start = 0;
      let t = setInterval(() => {
        start += step;
        if (start > num) {
          clearInterval(t);
          start = num;
          t = null;
        }
        if (current === start) {
          return;
        }
        current = start;
        vm.counts = current.toFixed(decimal);
      }, 10);
    },
  },
};
</script>
