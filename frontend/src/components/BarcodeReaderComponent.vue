<template>
  <div id="barcodeScanner" data-jest="barcodeReader">
    <span v-if="!loaded">Initializing..</span><span v-if="invalidBrowser">Your browser doesn't support this.</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext, onMounted, onBeforeUnmount } from '@vue/composition-api';
import Quagga from '@te4-adrian-almetun-smeds/quagga2';

export default defineComponent({
  name: 'BarcodeReaderComponent',
  setup(props: {}, { emit }: SetupContext) {
    const loaded = ref(false);
    const invalidBrowser = ref(false);

    // Checks if the browser is compatible
    function validateBrowser(): Boolean {
      return (
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === 'function'
      );
    }

    // Tries to limit the amount of false positives by checking each codes error rating
    function validResponse(codes: [any]): Boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
      let countDecodedCodes = 0;
      let err = 0;
      for (let code of codes) {
        if (code.error != undefined) {
          countDecodedCodes++;
          err += parseFloat(code.error);
        }
      }
      if (err / countDecodedCodes < 0.1) {
        // probably correct code detected
        return true;
      } else {
        // probably wrong code
        return false;
      }
    }

    onMounted(() => {
      if (validateBrowser()) {
        let lastSeenCode: null | string = null;

        Quagga.onDetected((data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          const newCode = data.codeResult.code;
          if (validResponse(data.codeResult.decodedCodes)) {
            if (newCode !== lastSeenCode) {
              emit('newCodeDetected', newCode);
              lastSeenCode = data.codeResult.code;
            } else {
              emit('codeDetected', newCode);
            }
          } else {
            // Found a invalid code
          }
        });

        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: document.querySelector('#barcodeScanner')!
            },
            decoder: {
              readers: ['ean_reader']
            },
            debug: false
          },
          function(err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            if (err) {
              console.log(err);
              return;
            }
            console.log('Initialization finished. Ready to start');
            loaded.value = true;
            Quagga.start();
          }
        );
      } else {
        invalidBrowser.value = false;
      }
    });

    onBeforeUnmount(()=> {
      Quagga.stop();
    });
    return { loaded, invalidBrowser };
  }
});
</script>

<style lang="scss" scoped></style>

<style lang="scss">
#barcodeScanner {
  position: relative;
  width: 40vh;
  height: 40vh;
}
span {
  position: absolute;
  top:0;
  left: 0;
}
#barcodeScanner * {
  width: 100%;
  height: 100%;
}
#barcodeScanner canvas,
#barcodeScanner video {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
