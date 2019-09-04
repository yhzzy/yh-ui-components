<template>
  <div class="yh-card">
    <el-card class="box-card" :shadow="shadow">
      <div class="yh-card-title yh-normal-font-color" :style="titleStyle">
        <slot name="title"></slot>
      </div>
      <div class="yh-card-content yh-main-font-color" :style="contentStyle">
        <slot></slot>
      </div>
      <div class="yh-card-desc yh-normal-font-color" :style="descStyle">
        <slot name="desc"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    titleStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    contentStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    descStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    shadow: {
      type: String,
      default: 'hover',
    },
  },
};
</script>
