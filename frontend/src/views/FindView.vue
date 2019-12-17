<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-chip-group mandatory>
            <v-chip
              v-model="users"
              class="ma-2"
              color="success"
              outlined
            >
              <v-icon left>
                mdi-account-outline
              </v-icon>
              Users
            </v-chip>

            <v-chip
              v-model="loans"
              class="ma-2"
              color="deep-purple"
              outlined
            >
              <v-icon left>
                mdi-handshake
              </v-icon>
              Loans
            </v-chip>
            <v-chip
              v-model="books"
              class="ma-2"
              color="light-blue"
              outlined
            >
              <v-icon left>
                mdi-library
              </v-icon>
              Books
            </v-chip>
          </v-chip-group>

          <ListComponent 
            v-if="loans"
            :items="mockupLoans" 
            :headers="loanHeaders"
          />
          <ListComponent 
            v-if="books"
            :items="mockupBooks" 
            :headers="bookHeaders"
            :use-actions="true"
            :route-path="'books'"
          />
          <ListComponent 
            v-if="users"
            :items="mockupUsers" 
            :headers="userHeaders"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

import LoansModule from '../store/modules/LoansModule';
import ListComponent from '@/components/ListComponent.vue';

@Component({
  components: {
    ListComponent
  },
})
export default class FindView extends Vue {
  users:boolean = false;
  loans:boolean = false;
  books:boolean = false;

  loanHeaders: object[] = [
    { text: 'Utlånad till', value: 'loanedBy' },
    { text: 'Utlånad av', value: 'lentBy' },
    { text: 'Material', value: 'book' },
    { text: 'Utgångsdatum', value: 'expirationDate' },
  ];
  bookHeaders: object[] = [
    { text: 'Titel', value: 'title' },
    { text: 'Status', value: 'status' },
    { text: 'Barcode', value: 'barcode' },
  ];
  userHeaders: object[] = [
    { text: 'Namn', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Klass', value: 'klass' },
  ];

  // MOCKUP DATA (Can be removed when fetch function in implemented)
  mockupLoans: object[] = [
    {
      loanedBy: 'Simon Johannesson',
      book: 'The Hobbit',
      lentBy: 'Daniel Berg',
      expirationDate: '01-01-2019'
    },
    {
      loanedBy: 'Eric Persson',
      book: 'Lord of the flies',
      lentBy: 'David Lundholm',
      expirationDate: '01-01-2019'
    },
    {
      loanedBy: 'Filip Gustavsson',
      book: 'The hitchhiker\'s guide to the galaxy',
      lentBy: 'Fredrik Kronhamn',
      expirationDate: '01-01-2019'
    },
    {
      loanedBy: 'Alex henryz',
      book: 'Moby Dick',
      lentBy: 'Daniel Berg',
      expirationDate: '01-01-2019'
    },
    {
      loanedBy: 'Linus Styrén',
      book: 'Harry Potter 3',
      lentBy: 'David Lundholm',
      expirationDate: '01-01-2019'
    }
  ];

  mockupUsers: object[] = [
    {
      name: 'Simon Johannesson',
      email: 'The.Hobbit@gmail.ru',
      klass: '1983',
    },
    {
      name: 'Eric Persson',
      email: 'The.Hobbit@gmail.su',
      klass: 'TE212344',
    },
    {
      name: 'Filip Gustavsson',
      email: 'The.Hobbit@gmail.eu',
      klass: 'DB',
    },
    {
      name: 'Alex henryz',
      email: 'The.Hobbit@gmail.pu',
      klass: '3Cypress',
    },
    {
      name: 'Walter',
      email: 'fire@trucklover.com',
      klass: '28a',
    },
  ];

  mockupBooks: object[] = [
    {
      title: 'The Hobbit',
      barcode: '123123bleh31231',
      status: 'One book to rule them all',
      routeSpecifier: '123123bleh31231'
    },
    {
      title: 'Lord of the flies',
      barcode: '1337',
      status: 'flew away',
      routeSpecifier: '1337'
    },
    {
      title: 'nallepuupupupup',
      barcode: '80085',
      status: 'Stroke',
      routeSpecifier: '80085'
    }
  ];
}
</script>
