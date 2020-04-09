<template>
  <b-container class="contacts pt-3" fluid>
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

    <h3 class="float-left">Contacts</h3>
    <b-button
      v-if="isAdmin"
      :to="{ name: 'AddContact' }"
      class="btn btn-secondary float-right"
    >Add Contact</b-button>

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
        <template
          v-slot:cell(name)="row"
        >{{ row.value.data.firstName }} {{ row.value.data.lastName }}</template>

        <template v-slot:cell(sn)="row">{{ row.index + 1 }}</template>
        <template v-if="isAdmin" v-slot:cell(inviteStatus)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
            variant="info"
            v-if="!row.item.data.inviteStatus"
            :disabled="row.item.data.inviteStatus"
          >
            Invite
            <b-icon-person-plus variant="light" />
          </b-button>
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
            variant="success"
            v-if="row.item.data.inviteStatus"
            :disabled="row.item.data.inviteStatus"
          >
            Invited
            <b-icon-person-plus variant="light" />
          </b-button>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-1">
            <b-icon-arrows-expand variant="light" />
          </b-button>
          <b-button
            size="sm"
            :to="{ name: 'EditContact', params: { id: row.item.data.id }}"
            class="mr-1"
            variant="dark"
            v-if="isAdmin"
          >
            <b-icon-pencil-square variant="light" />
          </b-button>
          <b-button
            v-if="isAdmin"
            size="sm"
            @click="deleteConfirmDialog(row.item)"
            variant="danger"
          >
            <b-icon-trash variant="light" />
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item.data" :key="key">{{ key }}: {{ value }}</li>
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
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-title="Invite"
      ok-variant="info"
      @hide="resetInfoModal"
      @ok="inviteUser"
    >
      <!-- <pre>{{ infoModal.content }}</pre> -->
      <b-list-group>
        <b-list-group-item
          v-for="(value, key) in infoModal.content"
          :key="key"
        >{{ key }}: {{ value }}</b-list-group-item>
      </b-list-group>
      <b-form-group id="input-role" label="Invite As:" label-for="input-role" class="pt-3">
        <b-form-select id="input-role" v-model="inviteAs" :options="roles" required></b-form-select>
      </b-form-group>

      <h5>Note:</h5>
      <p>User Name: email address</p>
      <p>Password: "cms123" will be used for invited user!</p>
    </b-modal>
  </b-container>
</template>

<script>
/* eslint-disable */

import { authService, contactService, userService } from "@/_services";
import { Role, defaultInvitePassword } from "@/_helpers";

export default {
  name: "Contacts",
  data() {
    return {
      isLoading: false,
      error: null,
      fetchInfo: null,
      dismissCountDown: 10,
      inviteAs: Role.Normal,
      items: [],
      roles: [{ text: "Select Role", value: null }, Role.Admin, Role.Normal],
      fields: [
        {
          key: "sn",
          label: "SN",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "name",
          label: "Person Full name",
          sortable: true,
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item;
          }
        },
        {
          key: "firstName",
          label: "Person First name",
          sortable: true,
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.data.firstName;
          }
        },
        {
          key: "lastName",
          label: "Person Last name",
          sortable: true,
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.data.lastName;
          }
        },
        {
          key: "email",
          label: "Person Email",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return item.data.email;
          }
        },
        {
          key: "phone",
          label: "Person Contact Number",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return item.data.phoneNumber;
          }
        },
        { key: "actions", label: "Actions" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: true,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        contact: null,
        title: "",
        content: ""
      },
      currentUser: null
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
    },
    isAdmin() {
      let isAdmim = this.currentUser && this.currentUser.role === Role.Admin;
      if (isAdmim) {
        this.fields.splice(6, 0, {
          key: "inviteStatus",
          label: "Invite Status",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return item.data.inviteStatus ? "Invited" : "Not Invited";
          }
        });
      }
      return isAdmim;
    }
  },
  created: function() {
    authService.currentUser.subscribe(x => (this.currentUser = x));
    this.getContacts();
  },
  methods: {
    showToast(variant, title, msg = null) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true,
        "auto-hide-delay": 3000
      });
    },
    async getContacts() {
      try {
        this.loading = true;

        await contactService.getContacts().then(response => {
          // console.log(
          //   "getContacts -> response",
          //   JSON.parse(JSON.stringify(response.data))
          // );
          this.loading = false;

          if (response) {
            this.fetchInfo = `Contacts list updated successfully!`;
            let responseData = response.data;
            this.contacts = responseData;
            this.totalRows = responseData.totalDocs;
            this.items =
              responseData && responseData.docs ? responseData.docs.data : [];
          }
        });
      } catch (error) {
        this.loading = false;
        this.fetchInfo = null;

        this.error =
          error.response && error.response.data.message
            ? error.response.data.message
            : `We're sorry, we're not able to retrieve this information at the moment, please try back later`;

        // if (error && error.response && error.response.status == 401) {

        // }
      }
    },
    deleteConfirmDialog(contact) {
      this.$bvModal
        .msgBoxConfirm(
          `Please confirm that you want to delete "name: ${contact.data.firstName} - email: ${contact.data.email}" contact.`,
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
            this.deleteContact(contact.data.id);
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    info(item, index, button) {
      const { id, ...userInfo } = item.data;
      this.infoModal.title = `Invite Contact: ${item.data.firstName}`;
      this.infoModal.content = userInfo;
      this.infoModal.contactId = item.data.id;
      // this.infoModal.content = JSON.stringify(userInfo, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    async deleteContact(id) {
      try {
        await contactService
          .deleteContactById(id)
          .then(() => (this.fetchInfo = `Contact deleted successfully!`));
        this.getContacts();
      } catch (error) {
        this.fetchInfo = null;
        this.error =
          error.response && error.response.data.message
            ? error.response.data.message
            : `We're sorry, we're not able complete your request. Please try back later`;
      }
    },
    async inviteUser() {
      let newUserData = {
        firstName: this.infoModal.content.firstName,
        lastName: this.infoModal.content.lastName,
        email: this.infoModal.content.email,
        isAdmin: this.inviteAs == Role.Admin ? true : false,
        password: defaultInvitePassword,
        userId: this.currentUser.uid
      };
      try {
        await userService.registerUser(newUserData).then(async () => {
          this.showToast("success", "Success", `Contact invited successfully!`);
          await this.udpateContact().then(async () => {
            await this.getContacts();
          });
        });
      } catch (error) {
        this.fetchInfo = null;
        let errorMsg =
          error.response && error.response.data.message
            ? error.response.data.message
            : `We're sorry, we're not able complete your request. Please try back later`;
        this.showToast("danger", "Error", errorMsg);
      }
    },
    async udpateContact() {
      await contactService.updateContactById(this.infoModal.contactId, {
        inviteStatus: true
      });
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
.contacts {
}
</style>
