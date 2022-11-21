<script lang="ts" setup>
import Team from './Team.vue'
import { PropType } from "vue";
import { IMatch } from "../lib/models";

defineProps({
  match: { type: Object as PropType<IMatch>, required: true }
})
</script>

<template>
  <div class="container2">
    <h2>{{ match.stage_name }}</h2>
    <span>{{
        new Date(match.datetime.split('T')[0]).toString().substring(0, 10)
      }} {{ match.datetime.split('T')[1].substring(0, 5) }}</span>
    <Team v-if="match.home_team_country" :team="match.home_team_country" />
    <p v-else>{{ match.home_team.name }}</p>
    <Team v-if="match.away_team_country" :team="match.away_team_country" />
    <p v-else>{{ match.away_team.name }}</p>
  </div>
</template>
<style scoped>
.container2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

span {
  color: grey;
  text-align: center;
}
</style>
