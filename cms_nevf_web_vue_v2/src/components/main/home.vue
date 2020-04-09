<template>
  <div class="home container-scroller">
    <b-container class="summary-panel pt-2" fluid>
      <b-alert :show="dismissCountDown" dismissible variant="success" fade>Welcome back!</b-alert>
      <b-alert v-if="error" :show="dismissCountDown" dismissible variant="danger" fade>{{error}}</b-alert>
      <!-- <b-alert v-if="info" :show="dismissCountDown" dismissible variant="info" fade>{{info}}</b-alert> -->

      <b-jumbotron header="CMS - NEVF" lead="Contact Management Application">
        <p>This application is a prototype build using (NEVF Stack) Node.js, Express.js, Vue.js and Firebase technology stacks.</p>
        <b-btn
          variant="primary"
          target="_blank"
          href="https://github.com/RajanJS/cms_nevf"
        >Leare more about the project</b-btn>
      </b-jumbotron>

      <b-row class="pl-3 pt-4 pr-3 pb-4">
        <b-col class="card">
          <card-container :data="ContactsCardData" :isAdmin="isAdmin" />
        </b-col>
        <b-col v-if="isAdmin" class="card ml-4">
          <card-container :data="UsersCardData" :isAdmin="isAdmin" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import CardContainer from "../partials/CardContainer.vue";
import { authService, userService, contactService } from "@/_services";
import { Role } from "@/_helpers";

import moment from "moment";

export default {
  name: "HelloWorld",
  components: {
    CardContainer
  },
  data: function() {
    return {
      dismissCountDown: 10,
      UsersCardData: {
        title: "Users",
        number: "...",
        time: "...",
        link: "AddUser",
        linkText: "Add Users",
        icon: "people-fill",
        class: "bg-success"
      },
      ContactsCardData: {
        title: "Contacts",
        number: "...",
        time: "...",
        link: "AddContact",
        linkText: "Add Contacts",
        icon: "layout-text-window-reverse",
        class: "bg-warning"
      },
      currentUser: null,
      loading: false,
      allUsers: [],
      contacts: null,
      allContacts: [],
      info: null,
      error: null
    };
  },
  computed: {
    isAdmin() {
      return (
        this.currentUser &&
        this.currentUser.role === Role.Admin &&
        !this.currentUser.userId
      );
    }
  },
  created: function() {
    authService.currentUser.subscribe(x => (this.currentUser = x));
    if (this.isAdmin) {
      this.getAllUsers();
    }
    this.getAllContacts();
  },
  methods: {
    async getAllUsers() {
      try {
        await userService.getAllUsers().then(response => {
          this.info = `Fetching data...`;
          if (response) {
            this.info = "User fetch Successful";
            this.allUsers = response.data.users;
            this.UsersCardData.number = this.allUsers.length;
            this.UsersCardData.time = moment().format("LT");
          }
        });
      } catch (error) {
        this.loading = false;
        this.error =
          error.response && error.response.data.message
            ? error.response.data.message
            : `We're sorry, we're not able to retrieve this information at the moment, please try back later`;
      }
    },
    async getAllContacts() {
      try {
        await contactService.getContacts().then(response => {
          this.info = `Fetching data...`;
          if (response) {
            this.info = "User fetch Successful";
            this.contacts = response.data;
            this.allContacts =
              this.contacts && this.contacts.docs
                ? this.contacts.docs.data
                : [];
            this.ContactsCardData.number = this.allContacts.length;
            this.ContactsCardData.time = moment().format("LT");
          }
        });
      } catch (error) {
        this.loading = false;
        this.error =
          error.response && error.response.data.message
            ? error.response.data.message
            : `We're sorry, we're not able to retrieve this information at the moment, please try back later`;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.home {
}
</style>