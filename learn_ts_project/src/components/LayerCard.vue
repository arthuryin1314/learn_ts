<script setup lang="ts">
import type { LayerItem } from '@/types/layer'
const layerItem=defineProps<LayerItem>()
const emit = defineEmits<{
    "toggle-visible":[value: boolean]
}>()
function handleEmit(){
    emit('toggle-visible',!layerItem.visible)
}
</script>
<template>
    <button @click="handleEmit">{{layerItem.name}}-{{layerItem.visible ? '可见' : '隐藏'}}-{{layerItem.opacity}}</button>
</template>
<style></style>