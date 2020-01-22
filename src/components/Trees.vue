<template>
  <div class="Tree">
    <div v-for="locationNode in locationsTrees" :key="locationNode.uuid">
      <TreeNode
        :selectedNodesIds="selectedNodesIds"
        :nodesWithVisibleChildrenIds="nodesWithVisibleChildrenIds"
        v-on:leaf-select-toggle="handleLeafSelectToggle"
        v-on:leaf-children-visiblity-toggle="handleLeafChildrenVisibilityToggle"
        :locationNode="locationNode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TreeNode from "./TreeNode.vue";
import { Component, Prop } from "vue-property-decorator";

type Company = {
  uuid: string;
  name: string;
  identifier: string;
  id: number;
  depth: number;
  children: Company[];
  ancestry: number[];
};

@Component({
  components: {
    TreeNode
  }
})
export default class Trees extends Vue {
  @Prop({
    required: true
  })
  locationsTrees!: Company[];

  @Prop({
    required: true
  })
  selectedNodesIds!: number[];

  @Prop({
    required: true
  })
  nodesWithVisibleChildrenIds!: number[];

  handleLeafSelectToggle(companyId: number) {
    this.$emit("leaf-select-toggle", companyId);
  }

  handleLeafChildrenVisibilityToggle(companyId: number) {
    this.$emit("leaf-children-visiblity-toggle", companyId);
  }
}
</script>

<style>
.Tree {
  /* Offsetting root node padding */
  margin-left: -20px;
  margin-right: -20px;
}
</style>
