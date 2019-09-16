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
  mounted() {
    const vm = this;
    vm.numberGrow();
  },
  methods: {
    numberGrow() {
      const vm = this;
      const { decimal } = vm;
      const step = (vm.value * 10) / (vm.duration * 1000);
      let current = 0;
      let start = 0;
      let t = setInterval(() => {
        start += step;
        if (start > vm.value) {
          clearInterval(t);
          start = vm.value;
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
