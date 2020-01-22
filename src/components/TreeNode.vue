<template>
  <div class="TreeNode">
    <div class="TreeNode__wrapper">
      <div class="TreeNode__visiblity-indicator">
        <button
          class="TreeNode__toggle-visibility-button"
          @click="$emit('leaf-children-visiblity-toggle', locationNode.id)"
          v-if="locationNode.children.length > 0"
        >
          <span v-if="isChildrenSubtreeVisible">
            ⌄
          </span>
          <span v-else>
            >
          </span>
        </button>
        <div v-else class="TreeNode__no-children-indicator">
          -
        </div>
      </div>
      <div
        @click="
          !isCheckboxDisabled && $emit('leaf-select-toggle', locationNode.id)
        "
        class="TreeNode__content"
      >
        <TreeNodeCheckbox
          :checked="isLeafSelected"
          :disabled="isCheckboxDisabled"
        />

        <span class="TreeNode__item-identifier">
          {{ locationNode.identifier }}
        </span>
        <span class="TreeNode__item-name">
          {{ locationNode.name }}
        </span>
      </div>
    </div>

    <TreeNode
      v-show="isChildrenSubtreeVisible"
      v-for="childLocationNode in locationNode.children"
      :key="childLocationNode.uuid"
      :location-node="childLocationNode"
      :selectedNodesIds="selectedNodesIds"
      :nodesWithVisibleChildrenIds="nodesWithVisibleChildrenIds"
      v-on:leaf-select-toggle="handleLeafSelectToggle"
      v-on:leaf-children-visiblity-toggle="handleLeafChildrenVisibilityToggle"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import TreeNodeCheckbox from "./TreeNodeCheckbox.vue";

type Location = {
  uuid: string;
  name: string;
  identifier: string;
  id: number;
  depth: number;
  children: Location[];
  ancestry: number[];
};

/**
 * Note that this is a recursive component - it renders itself,
 *  and it accepts a tree structure as a prop.
 */
@Component({
  name: "TreeNode",
  components: {
    TreeNodeCheckbox
  }
})
export default class TreeNode extends Vue {
  @Prop({
    required: true
  })
  locationNode!: Location;

  @Prop({
    required: true
  })
  selectedNodesIds!: number[];

  @Prop({
    required: true
  })
  nodesWithVisibleChildrenIds!: number[];

  handleLeafSelectToggle(locationId: number) {
    this.$emit("leaf-select-toggle", locationId);
  }

  handleLeafChildrenVisibilityToggle(locationId: number) {
    this.$emit("leaf-children-visiblity-toggle", locationId);
  }

  get isChildrenSubtreeVisible(): boolean {
    return this.nodesWithVisibleChildrenIds.includes(this.locationNode.id);
  }

  get isLeafSelected(): boolean {
    return this.selectedNodesIds.includes(this.locationNode.id);
  }

  get isAncestorSelected(): boolean {
    const hasAncestors =
      this.locationNode.ancestry && this.locationNode.ancestry.length > 0;

    if (!hasAncestors) return false;

    // Intersecting two arrays
    const selectedAncestors = this.locationNode.ancestry.filter(value =>
      this.selectedNodesIds.includes(value)
    );

    return selectedAncestors.length > 0;
  }

  get isCheckboxDisabled(): boolean {
    return this.isAncestorSelected;
  }
}
</script>

<style>
.TreeNode {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 20px;
}

.TreeNode__wrapper {
  display: flex;
}

.TreeNode__toggle-visibility-button {
  width: 20px;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.TreeNode__no-children-indicator {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
}

.TreeNode__item-identifier {
  padding-left: 8px;
}

.TreeNode__item-name {
  padding-left: 8px;
}

.TreeNode__content {
  user-select: none;
  display: flex;
  align-items: center;
  padding-left: 8px;
  line-height: 18px;
}

.TreeNode__content:hover {
  color: blue;
  cursor: pointer;
}
</style>
