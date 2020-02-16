<template>
  <svg :class="svgClass" aria-hidden="true">
    <use v-bind:xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "SvgIcon"
})
export default class extends Vue {
  @Prop()
  iconClass!: string;
  @Prop()
  className!: string;

  get iconName() {
    return `#icon-${this.iconClass}`;
  }
  get svgClass() {
    if (this.className) {
      return "svg-icon " + this.className;
    } else {
      return "svg-icon";
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  &.logo {
    width: 40px;
    height: 40px;
  }
}
</style>
