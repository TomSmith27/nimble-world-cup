<script lang="ts" setup>
import Team from './Team.vue'
import { PropType } from "vue";

defineProps({
  teams: Array as PropType<String[]>,
  group: String
})

</script>

<template>
  <div>
    <h2>Group {{ group }}</h2>
    <Team v-for="team in teams" :team="team" />
  </div>
</template>

<style scoped>
h2 {
  width: 100%;
  text-align: center;
  margin-bottom: 0.2em;
}
</style>
