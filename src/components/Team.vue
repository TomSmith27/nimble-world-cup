<script setup lang="ts">import { computed } from 'vue';

const props = defineProps({
  team: { required: true, type: String }
})
import nimblers from '../lib/nimbler';

const name = computed(() => nimblers[props.team]);
</script>

<template>
  <div class="team">
    <img :src="`https://nimble-world-cup.vercel.app/${team}.webp`" alt="" />
    <span>{{ name }}</span>
  </div>
</template>

<style>
.team {
  display: flex;
  align-items: center;
  padding: 0 0 0.5em 0;
  width: 100%;
}

span {
  padding: 0 0.5em;
}
</style>
