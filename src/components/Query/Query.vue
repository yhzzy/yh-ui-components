<template>
  <div class="yh-ui yh-query">
    <el-form :inline="true" :model="queryParams" v-bind="{ ...elementFormConfig }">
      <el-form-item
        v-for="(item, index) in config"
        :key="index"
        :label="item.label"
        v-bind="{ ...elementFormItemConfig }"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="queryParams[item.prop]"
          v-bind="{ ...item.elementConfig }"
        ></el-input>
        <el-select
          v-if="item.type === 'select'"
          v-model="queryParams[item.prop]"
          v-bind="{ ...item.elementConfig }"
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
        <el-date-picker
          v-if="item.type === 'datetimeRange'"
          v-model="queryParams[item.prop]"
          v-bind="{ ...item.elementConfig }"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
        <el-date-picker
          v-if="item.type === 'dateRange'"
          v-model="queryParams[item.prop]"
          v-bind="{ ...item.elementConfig }"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-bind="{ ...elementBtnConfig }" @click="searchForm(false)">
          查询
        </el-button>
        <el-button type="primary" v-bind="{ ...elementBtnConfig }" @click="searchForm(true)">
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
    modelName: {
      type: String,
      required: true,
    },
    config: {
      type: Array,
      required: true,
    },
    elementFormConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    elementFormItemConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    elementBtnConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      queryParams: {
        ...this.model,
      },
    };
  },
  methods: {
    searchForm(isReset) {
      const vm = this;
      if (isReset) {
        Object.assign(vm.$data.queryParams, vm.$parent.$options.data()[vm.modelName]);
      }
      const { queryParams } = vm;
      vm.$emit('search', {
        queryParams,
        isReset,
      });
    },
  },
};
</script>
