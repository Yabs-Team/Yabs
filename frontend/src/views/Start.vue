<template lang="pug">
    CanvasGenerator(v-bind:barcodeString='this.userID')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CanvasGenerator from '@/components/CanvasGenerator.vue';

@Component({
    components:{
        CanvasGenerator
    }
})
export default class Start extends Vue {
    userID = "test";
}
</script>
