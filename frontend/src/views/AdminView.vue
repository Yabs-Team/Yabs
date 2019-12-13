<template>
  <div class="main-container">
    <div class="left">
      <v-card
        elevation="6"
        width="256"
      >
        <v-navigation-drawer
          floating
          permanent
        >
          <v-list
            dense
            rounded
          >
            <router-link
              v-for="item in items"
              :key="item.title"
              :to="item.path"
              class="d-flex router-link"
            >
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
    <div class="right">
      <v-card elevation="6" class="pa-10">
        <v-content>
          <router-view />
        </v-content>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class AdminView extends Vue {
  private items: any = [
    { title: 'Dashboard', icon: 'dashboard', path: '/admin' },
    { title: 'Loans', icon: 'library_books', path: '/admin/loans' },
    { title: 'Titles', icon: 'title', path: '/admin/titles' },
    { title: 'Books', icon: 'book', path: '/admin/books' },
    { title: 'Cards', icon: 'account_box', path: '/admin/cards' }
  ];
}
</script>

<style>
.main-container{display: flex !important}
.left{margin-right: 50px}
.right{flex: 1}
.router-link{color: black}
.router-link:hover{text-decoration: none !important}
</style>
