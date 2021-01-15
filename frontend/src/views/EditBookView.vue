<template>
  <div>
    <!-- Todo: add cover to title interface and implement the code below for setting image src -->
    <!-- :src="book.title.cover" -->
    <v-img
      lazy-src="https://picsum.photos/id/11/100/60"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="500"
      max-height="300"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular 
            indeterminate 
            color="grey lighten-5" 
          />
        </v-row>
      </template>
    </v-img>
    <BookConditionComponent 
      v-if="book != null"
      :title="book.title.name" 
      :title_id="book.title.id"
      :status="book.condition" 
      :barcode="book.barcode"
      :note="book.note"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, Ref } from '@vue/composition-api';
import BooksModule from '../store/modules/BooksModule';
import BookConditionComponent from '../components/BookConditionComponent.vue';
import { Book } from '@/types';

export default defineComponent({
  name: 'EditBookView',
  components: {
    BookConditionComponent
  },
  setup(_: object, { root }: SetupContext){
    let book: Ref<Book | null> = ref(null);

    BooksModule.fetchSingle(root.$route.params.id).then((response: Book) => {
      book.value = response;
    });
    return {
      book
    };
  }
});
</script>
