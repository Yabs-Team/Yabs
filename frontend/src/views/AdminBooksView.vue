<template>
  <div>
    <h1 class="display-2">
      Books
    </h1>
    <div class="flex">
      <div style="margin-right: 50px">
        <BookFormComponent />
      </div>
      <div>
        <BookListComponent />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BooksModule from '../store/modules/BooksModule';
import BookFormComponent from '@/components/BookFormComponent.vue';
import BookListComponent from '@/components/BookListComponent.vue';
import TitlesModule from '../store/modules/TitlesModule';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AdminBooksView',
  components: {
    BookFormComponent,
    BookListComponent
  },
  setup(): void{
    function created(): void {
      BooksModule.fetchAll();
      TitlesModule.fetchAll();
    }
    created();
  }
});
</script>

<style scoped>
.flex {
  display: flex;
}

.flex > div {
  flex: 1;
}
</style>
