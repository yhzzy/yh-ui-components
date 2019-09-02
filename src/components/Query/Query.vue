<template>
  <div class="yh-query">
    <el-form :inline="true" :model="queryParams" v-bind="{ ...formConfig }">
      <el-form-item
        v-for="(item, index) in config"
        :key="index"
        :label="item.label"
        v-bind="{ ...formItemConfig }"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="queryParams[item.prop]"
          v-bind="{ ...item.config }"
        ></el-input>
        <el-select
          v-if="item.type === 'select'"
          v-model="queryParams[item.prop]"
          v-bind="{ ...item.config }"
        >
          <div v-if="!item.optionGroup">
            <el-option
              v-for="(option, indexSelect) in item.options"
              :key="option[item.value] || indexSelect"
              :label="option[item.key] || option.label"
              :value="option[item.value] || option.value"
              :disabled="item.disabled || false"
            >
            </el-option>
          </div>
          <div v-else>
            <el-option-group
              v-for="(group, indexGroup) in item.options"
              :key="group[item.key] || indexGroup"
              :label="group[item.key] || group.label"
            >
              <el-option
                v-for="(option, indexSelect) in group.options"
                :key="option[item.value] || indexSelect"
                :label="option[item.key] || option.label"
                :value="option[item.value] || option.value"
                :disabled="item.disabled || false"
              >
              </el-option>
            </el-option-group>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-bind="{ ...btnConfig }" @click="searchForm(false)">
          查询
        </el-button>
        <el-button type="primary" v-bind="{ ...btnConfig }" @click="searchForm(true)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Query',
  props: {
    model: {
      type: Object,
      required: true,
    },
    config: {
      type: Array,
      required: true,
    },
    formConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formItemConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    btnConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      queryParams: {
        ...this.$props.model,
      },
    };
  },
  methods: {
    searchForm(isReset) {
      const vm = this;
      if (isReset) {
        Object.assign(vm.$data.queryParams, vm.$options.propsData.model);
      }
      const { queryParams } = vm;
      vm.$emit('search', queryParams);
    },
  },
};
</script>
