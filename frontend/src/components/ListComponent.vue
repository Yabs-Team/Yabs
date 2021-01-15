<template>
  <v-card data-cy="table">
    <v-card-title>
      <v-text-field
        v-model="search"
        data-jest="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      data-jest="table"
      :headers="headers"
      :items="items"
      :search="search"
      :items-per-page="itemsPerPage"
    >
      <template
        v-if="useActions"
        v-slot:item.action="{ item }"
      >
        <v-icon
          small
          class="mr-2"
          data-cy="formAction"
          @click="route($event, item)"
        >
          edit
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from '@vue/composition-api';

interface Header {
  text: string;
  value: string;
  sortable?: boolean;
}

// /**
//  * Lists items in a datatable.
//  *
//  * @param {Header[]} headers - An array of headers the item data can be mapped to.
//  * @param {object[]} items - An array of objects to be displayed.
//  * @param {boolean} useActions - Controls whether there should be an edit button or not next to the item.
//  * @param {string} routePath - The path the user should be routed to when pressing the edit button.
//  * @param {string} routeSpecifier - The item field that should be used when appending a specifier to the route path (when pressing the edit button).
//  * @param {number} itemsPerPage - The amount of items that should be displayed in the list by default.
//  */

interface ListComponentProps {
  headers: Header[];
  items: Object; //eslint-disable-line camelcase
  useActions: Boolean;
  routePath: string;
  routeSpecifier: string;
  itemsPerPage: number;
}

export default defineComponent({
  name: 'ListComponent',
  props: {
    headers: { type: Array },
    items: { type: Array },
    useActions: { type: Boolean, default: false },
    routePath: { type: String },
    routeSpecifier: { type: String },
    itemsPerPage: { type: Number, default: 5 }
  },
  setup(props: ListComponentProps, { root }: SetupContext) {
    const search = ref('');

    /**
     * Adds the header "Actions" into headers if useActions is true.
     */
    function created(): void {
      if (props.useActions && !contains(props.headers, 'Action')) {
        props.headers.push({
          text: 'Actions',
          value: 'action',
          sortable: false
        });
      }
    }

    created();

    /**
     * Checks if the given array contains a header containing the text "text"
     *
     * @param {Header[]} headers - Is the array of Header objects to be searched. (See Header interface)
     * @param {string} headerText - The text/title of the header to be searched for.
     * @return {boolean} Returns true if the array of headers contain an object with the given header text/title that is the same as headerText.
     */
    function contains(headers: Header[], headerText: string): boolean {
      let i = 0;
      let result = false;
      while (i < headers.length) {
        if (headers[i].text == headerText) result = true;
        i += 1;
      }

      return result;
    }

    /**
     * Routes the user to an items info page. `host:port/${routePath}/${item[routeSpecifier]}`
     * routePath and routeSpecifier is provided as Prop().
     * @param {Event} event - The event that triggered the method.
     * @param {object} item - The item used to navigate to the items info page.
     * @example
     *    props.routePath = "books";
     *    props.routeSpecifier = "id";
     *
     *    host:port/${"books"}/${item["id"]}
     *
     *    This could potentially result in the the user routing to "locahost:8080/books/1001".
     */
    // route is called with the arguments event and item. Item contains the barcode of the current book
    function route(event: Event, item: any): void { //eslint-disable-line @typescript-eslint/no-explicit-any
      event.preventDefault();
      if (item[props.routeSpecifier]) {
        root.$router.push(`/${props.routePath}/${item[props.routeSpecifier]}`);
      } else if (item.barcode) {
        root.$router.push(`/${props.routePath}/${item.barcode}`);
      }
    }

    return { route, contains, search };
  }
});
</script>
