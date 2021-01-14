<template>
  <v-alert
    v-model="show"
    class="onTop"
    :color="color"
    dense
    rounded
    dismissible
    elevation="6"
    prominent
    :type="type"
    :icon="icon"
    transition="scale-transition"
  >
    {{ text }}
  </v-alert>
</template>

<script lang="ts">
import { Ref, computed, watch, defineComponent, ref, SetupContext } from '@vue/composition-api';
import StatusModule from '@/store/modules/StatusModule';
import { StatusMessage } from '@/types';

export default defineComponent({
  name: 'AlertComponent',
  setup(_ : object, ctx: SetupContext): object {
    const show = ref(false);

    const obj = computed(() => StatusModule.allAsArray);

    const color = ref('');
    const type = ref('info');
    const icon: Ref<string | boolean> = ref('mdi-information');
    const text = ref('');

    let timer : ReturnType<typeof setTimeout>;

    // Tries to update the ref properties with data from the latest statusMessage
    watch(obj, (val, prevValue) => {
      if (val && obj.value.length > 0) {
        let temp: StatusMessage;
        try {
          temp = obj.value[obj.value.length - 1];
        } catch{return;} // Invalid data was passed; abort

        color.value = temp.color == undefined ? '' : temp.color;
        text.value = temp.text == undefined ? '' : temp.text;
        type.value = temp.type == undefined ? 'info' : temp.type;
        if (temp.type == undefined) {
          // Valid types are: success, info, warning, and error.
          icon.value = temp.icon == undefined ? 'mdi-information' : temp.icon;
        } else {
          // TODO: Fix prop validation for vuetify icon
          icon.value = true;
        }

        show.value = true;
        if (temp.timeout !== undefined) {
          // Avoids flickering alerts
          clearTimeout(timer);
          timer = setTimeout(() => {
            show.value = false;
          }, temp.timeout);
        }
      }
    });

    return { color, type, icon, text, show };
  },
});
</script>

<style scoped>
.onTop {
  z-index: 99;
  position: fixed;
  top: 66px;
  width: 80vw;
  left: 10vw;
}
</style>
