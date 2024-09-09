<template>
  <div class="input-plus">
    <el-input :value="value" v-bind="$attrs" @input="onInput" />
    <slot name="append" />
  </div>
</template>

<script>
export default {
  name: 'InputPlus',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
@mixin active {
  &:active,
  &:focus,
  &:hover {
    z-index: 1;
  }
}

.input-plus {
  display: inline-flex;
  align-items: center;
}

.el-input {
  height: 36px;
  position: relative;

  @include active;
}

.el-button {
  height: 36px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: -1px !important;
  position: relative;

  @include active;
}

.el-button:has(+ .el-button) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

::v-deep {
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
