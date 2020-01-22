<template>
  <div class="App">
    <Search
      :query="query"
      :activeQuery="activeQuery"
      v-on:form-submit="handleSearchFormSubmit"
      v-on:form-reset="handleSearchFormReset"
      v-on:search-input-change="handleSearchInputChange"
    />
    <div class="App__selected-locations-count">
      Selected options: {{ selectedLocationsCount }}
    </div>
    <Trees
      :locationsTrees="locationsTrees"
      :selectedNodesIds="selectedNodesIds"
      :nodesWithVisibleChildrenIds="nodesWithVisibleChildrenIds"
      v-on:leaf-select-toggle="handleLeafSelectToggle"
      v-on:leaf-children-visiblity-toggle="handleLeafChildrenVisibility"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Trees from "./components/Trees.vue";
import Search from "./components/Search.vue";

import LOCATIONS_TREES from "./mocks/locations.json";
import TreeLeaf from "@/components/TreeLeaf.vue";

@Component({
  components: {
    Search,
    Trees
  }
})
export default class App extends Vue {
  /**
   * Form state
   */
  query: string = "";

  /**
   * Used to filter companies by name
   */
  activeQuery: string = "";

  locationsTrees: TreeLeaf[] = LOCATIONS_TREES;

  selectedNodesIds: number[] = [];

  nodesWithVisibleChildrenIds: number[] = [];

  deselectChildrenOfSelectedNode(_locationId: number) {
    // TODO: if theres a node selected, and its child gets selected, we should remove the child from the selected list
  }
  handleLeafSelectToggle(locationId: number) {
    if (this.selectedNodesIds.includes(locationId)) {
      this.selectedNodesIds.splice(
        this.selectedNodesIds.indexOf(locationId),
        1
      );
    } else {
      this.deselectChildrenOfSelectedNode(locationId);
      this.selectedNodesIds.push(locationId);
    }
  }
  handleLeafChildrenVisibility(locationId: number) {
    if (this.nodesWithVisibleChildrenIds.includes(locationId)) {
      this.nodesWithVisibleChildrenIds.splice(
        this.nodesWithVisibleChildrenIds.indexOf(locationId),
        1
      );
    } else {
      this.nodesWithVisibleChildrenIds.push(locationId);
    }
  }

  handleSearchInputChange(event: any) {
    this.query = event.target.value;
  }

  handleSearchFormSubmit() {
    this.activeQuery = this.query;
  }

  handleSearchFormReset() {
    this.activeQuery = "";
    this.query = "";
  }

  get selectedLocationsCount() {
    return this.selectedNodesIds.length;
  }
}
</script>

<style>
.App {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  width: 800px;
  margin: 60px auto;
}

.App__selected-locations-count {
  padding-bottom: 8px;
}
</style>
