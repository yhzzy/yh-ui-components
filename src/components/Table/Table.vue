<template>
  <div class="yh-ui yh-table">
    <el-table :data="tableData" v-bind="{ ...elementConfig }" style="width: 100%">
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        v-bind="{ ...column.elementConfig }"
      ></el-table-column>
      <slot name="temp"></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    elementConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    columns: {
      type: Array,
      required: true,
    },
  },
};
</script>
