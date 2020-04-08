<template>
  <b-container class="users pt-3" fluid>
    <b-alert v-if="error" :show="dismissCountDown" dismissible variant="danger" fade>{{error}}</b-alert>
    <b-alert v-if="fetchInfo" :show="dismissCountDown" dismissible variant="info" fade>{{fetchInfo}}</b-alert>

    <!-- User Interface controls -->
    <b-row class="pt-4 pb-4">
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
              <template v-slot:first>
                <option value>-- none --</option>
              </template>
            </b-form-select>
            <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="initialSortSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="sortDirection"
            id="initialSortSelect"
            size="sm"
            :options="['asc', 'desc', 'last']"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <h3 class="float-left">Sub-Users</h3>
    <b-button :to="{ name: 'AddUser' }" class="btn btn-secondary float-right">Add User</b-button>

    <!-- Main table element -->
    <div class="pt-5">
      <b-table
        striped
        show-empty
        small
        stacked="md"
        bordered
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
        :busy="isLoading"
        head-variant="dark"
      >
        <template v-slot:cell(name)="row">{{row.value}}</template>

        <template v-slot:cell(sn)="row">{{ row.index + 1 }}</template>

        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            <b-icon-info-circle variant="light" />
          </b-button>
          <b-button size="sm" class="mr-1" @click="row.toggleDetails">
            <b-icon-arrows-expand variant="light" />
          </b-button>
          <b-button
            size="sm"
            :to="{ name: 'EditUser', params: { id: row.item.uid }}"
            class="mr-1"
            variant="dark"
          >
            <b-icon-pencil-square variant="light" />
          </b-button>
          <b-button size="sm" @click="deleteConfirmDialog(row.item)" variant="danger">
            <b-icon-trash variant="light" />
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>

        <template v-slot:table-busy>
          <div class="text-center text-dark my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>{{` ${' Loading...'}`}}</strong>
          </div>
        </template>
      </b-table>

      <div v-if="!isLoading && items.length" class="mt-6 pt-4">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
        ></b-pagination>
      </div>
    </div>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <!-- <pre>{{ infoModal.content }}</pre> -->
      <b-list-group>
        <b-list-group-item
          v-for="(value, key) in infoModal.content"
          :key="key"
        >{{ key }}: {{ value }}</b-list-group-item>
      </b-list-group>
    </b-modal>
  </b-container>
</template>

<script>
/* eslint-disable */
import { userService } from "@/_services";

export default {
  name: "Users",
  data() {
    return {
      isLoading: false,
      error: null,
      fetchInfo: null,
      dismissCountDown: 10,
      items: [],
      fields: [
        {
          key: "sn",
          label: "SN",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "name",
          label: "User Full name",
          sortable: true,
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.displayName;
          }
        },
        {
          key: "email",
          label: "Person Email",
          sortable: true,
          class: "text-center"
        },
        {
          key: "isActive",
          label: "Active Status",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return !item.disabled ? "Yes" : "No";
          }
        },
        {
          key: "Role",
          label: "User Role",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return item.customClaims ? item.customClaims.role : ` - `;
          }
        },
        { key: "actions", label: "Actions" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  created: function() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        this.loading = true;

        await userService.getAllUsers().then(response => {
          this.loading = false;

          if (response) {
            this.fetchInfo = `Users list updated successfully!`;
            let responseData = response.data;
            this.items =
              responseData && responseData.users ? responseData.users : [];
            this.totalRows = this.items.length;
          }
        });
      } catch (error) {
        this.loading = false;
        this.fetchInfo = null;

        this.error =
          error.response && error.response.data.message
            ? error.response.data.message
            : `We're sorry, we're not able to retrieve this information at the moment, please try back later`;
      }
    },
    deleteConfirmDialog(user) {
      this.$bvModal
        .msgBoxConfirm(
          `Please confirm that you want to delete "name: ${user.displayName} - email: ${user.email}" contact.`,
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          if (value) {
            this.deleteUser(user.uid);
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    async deleteUser(id) {
      try {
        await userService
          .deleteUserById(id)
          .then(() => (this.fetchInfo = `User deleted successfully!`));
        this.getUsers();
      } catch (error) {
        this.fetchInfo = null;
        this.error =
          error.response && error.response.data.message
            ? error.response.data.message
            : `We're sorry, we're not able complete your request. Please try back later`;
      }
    },
    info(item, index, button) {
      const { uid, ...userInfo } = item;
      this.infoModal.title = `User info: ${item.displayName}`;
      this.infoModal.content = item;
      // this.infoModal.content = JSON.stringify(userInfo, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped lang="scss">
.users {
}
</style>
