<script setup lang="ts">
import Match from './components/Match.vue'
import Group from './components/Group.vue'
import Team from './components/Team.vue'
import groups from './lib/groups'


import { computed, onMounted, ref } from "vue";
import { IMatch } from "./lib/models";

const api = ref<IMatch[]>([]);

onMounted(async () => {
  const response = await fetch('https://worldcupjson.net/matches')
  api.value = await response.json() as IMatch[];
})

const round16 = computed(() => api.value.filter((c) => c.stage_name === "Round of 16")!);
const quaterFinals = computed(() => api.value.filter((c) => c.stage_name === "Quarter-final")!);
const semiFinals = computed(() => api.value.filter((c) => c.stage_name === "Semi-final")!);
const final = computed(() => api.value.filter((c) => c.stage_name === "Final").pop()!);
const next = computed(() => api.value.filter((c) => new Date(c.datetime) > new Date()).shift()!);

</script>

<template>
  <main v-if="api && api.length > 0">
    <h1>Nimble World Cup Sweepstake</h1>
    <div class="container">
      <div class="col">
        <Group :group="group" :teams="groups[group]" v-for="group in ['A', 'B', 'C', 'D']"></Group>
      </div>
      <div class="col">
        <Match v-for="match in round16.slice(0,4)" :match="match" />
      </div>
      <div class="col">
        <Match v-for="match in quaterFinals.slice(0,2)" :match="match" />
      </div>
      <div class="col">
        <Match v-for="match in semiFinals.slice(0,1)" :match="match" />
      </div>
      <div class="col">
        <Match :match="final" />
      </div>
      <div class="col">
        <Match v-for="match in semiFinals.slice(1,2)" :match="match" />
      </div>
      <div class="col">
        <Match v-for="match in quaterFinals.slice(2,4)" :match="match" />
      </div>
      <div class="col">
        <Match v-for="match in round16.slice(4,8)" :match="match" />
      </div>
      <div class="col">
        <Group :group="group" :teams="groups[group]" v-for="group in ['E', 'F', 'G', 'H']"></Group>
      </div>
    </div>
    <div class="next-panel" v-if="next">
      <h2>Next Game</h2>
      <p class="datetime">{{ new Date(next.datetime.split('T')[0]).toString().substring(0, 10) }}
        {{ next.datetime.split('T')[1].substring(0, 5) }}</p>
      <p>{{ next.location }}</p>
      <div class="next">
        <Team :team="next.home_team_country" />
        <h2>VS</h2>
        <Team :team="next.away_team_country" />
      </div>
    </div>
  </main>

</template>

<style scoped>
main {
  position: relative;
}

h1 {
  position: absolute;
  top: 20px;
  font-size: 2em;
  line-height: 1;
}

h2 {
  line-height: 1;
  width: 100%;
}

.container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
}

.col {
  display: flex;
  flex-direction: column;
  width: calc(100% / 9);
  padding: 0 0.8em;
  flex-grow: 1;
  justify-content: space-around;
}

.next {
  display: flex;
  flex-direction: row;
}

.next h2 {
  margin: 1em;
  padding: 0 0 0.5em 0;
}

.next-panel {
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 25%;
}

.next-panel h2 {
  background: transparent;
  -webkit-background-clip: initial;
  background-clip: initial;
  -webkit-text-fill-color: initial;
  color: #22b094;
}

.datetime {
  color: grey
}
</style>


