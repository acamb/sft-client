<script setup lang="ts">
const props = defineProps<{
    page: number,
    totalItems: number,
    totalPages: number,
    size: number
}>();
const emits = defineEmits<{
    (e: 'change',page: number): void
}>();
</script>
<template>

</template>