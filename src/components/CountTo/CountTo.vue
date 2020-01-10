<template>
  <span class="yh-ui yh-num-counts">
    <count-to v-bind="{ ...config }"></count-to>
  </span>
</template>

<script>
import countTo from 'vue-count-to';

export default {
  name: 'CountTo',
  components: {
    countTo,
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
};
</script>
