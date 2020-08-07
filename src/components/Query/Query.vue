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
          v-bind="convertItem(item, 'elementConfig')"
          v-on="convertItem(item, 'eventConfig')"
        ></el-input>
        <el-select
          v-if="item.type === 'select'"
          v-model="queryParams[item.prop]"
          v-bind="convertItem(item, 'elementConfig')"
          v-on="convertItem(item, 'eventConfig')"
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
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          v-bind="convertItem(item, 'elementConfig')"
          v-on="convertItem(item, 'eventConfig')"
        >
        </el-date-picker>
        <el-date-picker
          v-if="item.type === 'dateRange'"
          v-model="queryParams[item.prop]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-bind="convertItem(item, 'elementConfig')"
          v-on="convertItem(item, 'eventConfig')"
        >
        </el-date-picker>
        <el-date-picker
          v-if="item.type === 'switchDateType'"
          v-model="queryParams[item.prop]"
          :type="switchDateType[item.switchDateType.prop].currentType"
          range-separator="至"
          :start-placeholder="`开始${switchDateType[item.switchDateType.prop].currentTip}`"
          :end-placeholder="`结束${switchDateType[item.switchDateType.prop].currentTip}`"
          :value-format="switchDateType[item.switchDateType.prop].format"
          v-bind="convertItem(item, 'elementConfig')"
          v-on="convertItem(item, 'eventConfig')"
        >
        </el-date-picker>
        <div
          v-if="item.switchDateType"
          style="display: inline-block; vertical-align: bottom;"
          class="yh-switch-datepicker-type"
        >
          <el-radio-group
            v-model="queryParams[item.switchDateType.prop]"
            @change="changeDateType($event, item.switchDateType)"
          >
            <el-radio-button
              v-for="type in item.switchDateType.types"
              :key="type.value"
              :label="type.value"
            >
              {{ type.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="!customSearch"
          type="primary"
          v-bind="{ ...elementBtnConfig }"
          @click="searchForm(false)"
          v-on="{ ...eventBtnConfig }"
        >
          查询
        </el-button>
        <el-button
          v-if="!customReset"
          type="primary"
          v-bind="{ ...elementBtnConfig }"
          @click="searchForm(true)"
          v-on="{ ...eventBtnConfig }"
        >
          重置
        </el-button>
        <slot name="moreBtn"></slot>
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
    customSearch: {
      type: Boolean,
      default: false,
    },
    customReset: {
      type: Boolean,
      default: false,
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
    eventConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    eventBtnConfig: {
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
      switchDateType: {},
    };
  },
  async created() {
    const vm = this;
    const { config } = vm;
    await config.forEach(d => {
      if (d.type === 'switchDateType') {
        const {
          switchDateType: { prop, currentType, currentTip, format },
        } = d;
        vm.$set(vm.switchDateType, prop, {
          currentType,
          currentTip,
          format,
        });
      }
    });
  },
  methods: {
    convertItem(item, type) {
      if (item[type]) {
        return { ...item[type] };
      }
      return {};
    },
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
    changeDateType(value, item) {
      const vm = this;
      const { prop, types } = item;
      let type;
      for (let i = 0, len = types.length; i < len; i += 1) {
        if (types[i].value === value) {
          type = types[i];
          break;
        }
      }
      const { typeValue, placeholderTip } = type;
      if (!vm.switchDateType[prop]) {
        vm.switchDateType[prop] = {};
      }
      vm.switchDateType[prop].currentType = typeValue;
      vm.switchDateType[prop].currentTip = placeholderTip;
      vm.$emit('update:model', {
        ...vm.queryParams,
      });
    },
    updateQuery(attr, val) {
      const vm = this;
      vm.queryParams[attr] = val;
    },
  },
};
</script>
