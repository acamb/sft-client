<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import BackButton from './BackButton.vue';
const route = useRoute();
const i18n = useI18n();
const getMessage = computed ( ()=> route.query.message ? i18n.t('errors.'+route.query.message) : 'Generic error')
</script>
<template>
    <div class="alert alert-danger">{{getMessage}}</div>
    <BackButton back="/"></BackButton>
</template>