<template>
  <form @submit.prevent="$emit('form-submit')" class="Search">
    <label class="Search__label" for="tree-node-search">
      Location search:
    </label>

    <div class="Search__row">
      <input
        @change="handleSearchInputChange"
        class="Search__input"
        :value="query"
        id="tree-node-search"
        type="search"
      />
      <button type="submit">
        Search
      </button>
      <button @click="$emit('form-reset')" type="reset">
        Reset
      </button>
    </div>

    <div class="Search__status" v-if="activeQuery.length > 0">
      Searching for: {{ activeQuery }}
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  @Prop({ required: true })
  query!: string;

  @Prop({ required: true })
  activeQuery!: string;

  // not sure whats the correct event type in vue
  handleSearchInputChange(event: any) {
    this.$emit("search-input-change", event);
  }
}
</script>

<style>
.Search {
  padding-bottom: 8px;
}

.Search__label {
  display: block;
  padding-bottom: 8px;
}

.Search__input {
  margin-right: 8px;
}

.Search__status {
  padding-top: 8px;
}
</style>
