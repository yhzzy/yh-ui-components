<template>
  <div class="yh-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-never-shadow'">
    <div v-if="$slots.header" class="yh-card-header" :style="headerStyle">
      <slot name="header"></slot>
    </div>
    <div class="yh-card-body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    shadow: {
      type: String,
      default: 'never',
    },
    headerStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    bodyStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
