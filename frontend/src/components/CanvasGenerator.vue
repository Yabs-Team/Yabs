<template lang="pug">
    barcode(v-bind:value="barcodeString" tag="img" :options="{displayValue: true, height:25}")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CanvasGenerator extends Vue {
    @Prop({default: ''})
    barcodeString: string;
}
</script>

