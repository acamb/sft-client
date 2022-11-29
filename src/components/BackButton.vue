<script setup lang="ts">
import router from '../router';

function back(){
    router.go(-1)
}

</script>
<template>
    <button class="btn btn-outline-secondary" @click="back">{{$t('back')}}</button>
</template>