<template>
  <div id="barcodeScanner" />
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext, onMounted, onBeforeUnmount } from '@vue/composition-api';

export default defineComponent({
  name: 'BarcodeReaderComponent',
  setup(props: {}, { emit }: SetupContext) {
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
    const Quagga = require('@te4-adrian-almetun-smeds/quagga2').default;
    onMounted(() => {
      if (validateBrowser()) {
        console.log('mounted');
        let lastSeenCode: null | string = null;

        Quagga.onDetected((data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          const newCode = data.codeResult.code;
          console.log(data);
          if (validResponse(data.codeResult.decodedCodes)) {
            if (newCode !== lastSeenCode) {
              emit('newCodeDetected', newCode);
              lastSeenCode = data.codeResult.code;
              console.log(data.codeResult.code);
            } else {
              emit('codeDetected', newCode);
            }
          } else {
            console.log('Invalid code found');
          }
        });

        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: document.querySelector('#barcodeScanner') // Or '#yourElement' (optional)
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
            Quagga.start();
          }
        );
      } else {
        console.log('No browser support');
      }
    });

    onBeforeUnmount(()=> {
      Quagga.stop();
    });
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
