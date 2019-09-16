<template>
  <div class="yh-ui yh-block-title">
    <slot class="yh-block-title-icon__slot" name="icon">
      <span class="yh-block-title-icon"></span>
    </slot>
    <span class="yh-block-title-text" :style="titleStyle">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'BlockTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
    titleStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
