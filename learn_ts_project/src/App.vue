<script setup lang="ts">
import { ref } from 'vue'
import type { LayerItem } from '@/types/layer'
import LayerCard from './components/LayerCard.vue'
const layers=ref<LayerItem[]>([
    {name:'图层1',visible:true,opacity:0.5},
    {name:'图层2',visible:false,opacity:0.8},
    {name:'图层3',visible:true,opacity:1}
])

function handleToggleVisible(value:boolean,index:number){
    layers.value[index].visible=value
}
</script>

<template>
    <div v-for="(layer, index) in layers" :key="index">
      <LayerCard
        :name="layer.name"
        :visible="layer.visible"
        :opacity="layer.opacity"
        @toggle-visible="(value: boolean) => handleToggleVisible(value, index)"
      />
    </div>
</template>

<style scoped></style>
