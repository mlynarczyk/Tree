<template>
  <div class="TreeNodeCheckbox" :class="classNames"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class TreeNodeCheckbox extends Vue {
  @Prop({
    required: true
  })
  checked!: boolean;

  @Prop({
    required: true
  })
  disabled!: boolean;

  get classNames() {
    if (this.disabled) return "TreeNodeCheckbox--disabled";
    if (this.checked) return "TreeNodeCheckbox--checked";

    return undefined;
  }
}
</script>

<style>
.TreeNodeCheckbox {
  width: 12px;
  height: 12px;
  border: 1px solid #000;
  cursor: pointer;
}

.TreeNodeCheckbox--checked {
  background-color: #46da42;
}

.TreeNodeCheckbox--disabled {
  background-color: #dddddd;
}
</style>
