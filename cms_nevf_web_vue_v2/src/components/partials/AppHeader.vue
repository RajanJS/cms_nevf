<template>
  <div class="app-header">
    <b-navbar v-if="$route.meta.requiresAuth" toggleable="lg" type="dark" variant="dark">
      <b-navbar variant="faded" type="light">
        <b-navbar-brand :to="{ name: 'Home' }">CMS-NEVF</b-navbar-brand>
      </b-navbar>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Home' }" :active="$route.name == 'Home'">Dashboard</b-nav-item>
          <b-nav-item :to="{ name: 'Contacts' }" :active="$route.name == 'Contacts'">Contacts</b-nav-item>
          <b-nav-item
            v-if="isAdmin"
            :to="{ name: 'Users' }"
            :active="$route.name == 'Users'"
          >Sub-Users</b-nav-item>
          <b-nav-item :to="{ name: 'About' }" :active="$route.name == 'About'">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right class="preview-list">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <b-nav-text>Welcome!</b-nav-text>
              <em>{{` ${getCurrentUserName}`}}</em>
              <img
                src="../../assets/images/faces/batman.png"
                alt="profile image"
                class="img-xs rounded-circle ml-3"
              />
            </template>

            <b-dropdown-item :to="{ name: 'Profile' }">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="signOut">Signout</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'ChangePassword' }">Change Password</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script >
import { authService } from "@/_services";
import { Role } from "@/_helpers";

export default {
  name: "app-header",
  props: ["userName", "userRole"],
  data: function() {
    return {
      currentUser: authService.currentUserValue
    };
  },
  computed: {
    isAdmin() {
      return this.currentUser.role === Role.Admin && !this.currentUser.userId;
    },
    getCurrentUserName() {
      return this.$route.params.userName
        ? this.$route.params.userName
        : this.currentUser.firstName;
    }
  },
  created() {
    authService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
  },
  methods: {
    signOut() {
      authService.logout().then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.app-header {
  .img-xs {
    width: 40px;
  }
}
</style>
