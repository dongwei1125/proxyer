<template>
  <div class="action">
    <div class="action-left">
      <slot name="left">
        <div class="action-back" @click="handleBack">
          <i class="el-icon-back" />
          <span>返回</span>
        </div>

        <span v-if="subTitle" class="subtitle">{{ subTitle }}</span>
      </slot>
    </div>

    <div class="action-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Action',
  props: {
    subTitle: {
      type: String,
      default: '',
    },
    onBack: {
      type: Function,
      default: undefined,
    },
  },
  methods: {
    handleBack() {
      if (this.onBack) return this.onBack()

      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.action {
  height: 70px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.action-left {
  display: flex;
  align-items: center;
}

.action-back {
  display: flex;
  align-items: center;
  cursor: pointer;

  .el-icon-back {
    font-size: 18px;
    margin-right: 6px;
  }
}

.subtitle {
  margin-left: 40px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 16px;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: currentColor;
  }
}
</style>
