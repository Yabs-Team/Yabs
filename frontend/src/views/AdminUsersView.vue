<template>
  <div>
    <v-text-field 
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
    />
    <v-data-table
      :headers="headers"
      :items="convertListToA(allUsers)"
      :items-per-page="5"
      :search="search"
    >
      <template v-slot:item.role="{ item }">
        <v-select
          v-model="allUsers[item.uid].assignedRoles"
          :items="selectRoles"
          multiple
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn 
          color="primary"
          @click="updateUserRoles(allUsers[item.uid])"
        >
          Save
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { SetupContext, defineComponent, computed, ref } from '@vue/composition-api';
import UsersModule from '@/store/modules/UsersModule';
import RoleChecker from '@/helpers/RoleChecker';
import { User, UserCollection } from '@/types';
import convertListToN from '@/helpers/convertArrayToNested';
import convertListToA from '@/helpers/convertNestedToArray';

export default defineComponent({
  name: 'AdminUsersView',
  setup(_: object, { root }: SetupContext): object {
    const search = ref('');
    const headers: object[] = [
      { text: 'Namn', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Roller', value: 'role' },
      { text: '', value: 'actions' },
    ];

    const allUsers = computed ((): UserCollection => {
      let users = convertListToN(UsersModule.allAsArray
        .map((user) => {
          user.assignedRoles = RoleChecker.assignedRoles(user).map((number) => { return number.toString(); });
          return user;
        }), 'uid');
      return users;
    });

    const selectRoles = computed ((): object[] => {
      return Object.keys(RoleChecker.roles()).map((key) => {
        return {
          value: key, 
          text: RoleChecker.roles()[Number(key)] 
        }; 
      }).filter(selectRole => Number(selectRole.value));
    });

    function created(): void {
      UsersModule.fetchAll();
    }

    function updateUserRoles(user: User): void {
      if (user.assignedRoles!.length >= 1) {
        user.role = user.assignedRoles!.reduce((acc, num) => acc += Number(num), 0);
        UsersModule.update(user);
      }
    }

    return {
      search,
      headers,
      allUsers,
      selectRoles,
      created,
      updateUserRoles,
      convertListToA
    };
  }
});
</script>

<style scoped>
</style>
