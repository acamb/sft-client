<script setup lang="ts">
import router from '../router';
const props = defineProps({
    back: String
})
function back(){
    if(props.back){
        router.push(props.back);
    }
    else{
        router.go(-1)
    }
}

</script>
<template>
    <button class="btn btn-outline-secondary" @click="back">{{$t('back')}}</button>
</template>