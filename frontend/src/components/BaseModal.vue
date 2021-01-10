<template>
  <v-row justify="center" data-jest="modal">
    <v-dialog
      v-model="showModal"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{ header }}
        </v-card-title>
        <v-card-text>
          {{ body }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-for="x in actions"
            :data-jest="`modal-btn`"
            :key="x.text"
            color="green darken-1"
            text
            @click="x.action"
          >
            {{ x.text }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';


interface BaseModalActionProp {
  text: string;
  action: Function;
}

interface BaseModalProps {
  showModal: Boolean;
  actions: BaseModalActionProp[]
}

function defaultPropFactory(): BaseModalActionProp[]  {
  return {default: [{ text: 'Nooo', action: (): void => { console.log('noo'); }}, { text: 'Yeah', action: (): void => { console.log('Yeah'); }}]};
}

export default defineComponent({
  name: 'BaseModal',

  props: {
    header: {default: 'This header', type: String},
    body: {default: 'This body', type: String},
    showModal: {default: false, type: Boolean},
    actions: defaultPropFactory(),
  },
});
</script>
