<template>
  <section class="profile text-left pt-4">
    <div class="col-12 stretch-card">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title p-5">Profile</h3>

          <!-- form -->
          <div class="text-left pl-5 pr-5 pb-5">
            <b-form @submit="onSubmit">
              <b-form-group id="firstName" label="First Name:" label-for="firstName">
                <b-form-input
                  id="firstName"
                  v-model.trim="form.firstName"
                  required
                  placeholder="Enter first name"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="lastName" label="Last Name:" label-for="lastName">
                <b-form-input
                  id="lastName"
                  v-model.trim="form.lastName"
                  required
                  placeholder="Enter last name"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model.trim="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <p v-if="feedback" class="text-danger text-center pt-2">{{ feedback }}</p>
              <b-form-group class="pt-4">
                <b-button type="submit" variant="dark" class="btn btn-lg mr-3" :disabled="loading">
                  <b-spinner v-if="loading" type="grow" label="Loading..."></b-spinner>
                  <span>Update Profile</span>
                </b-button>
                <b-button
                  type="reset"
                  :to="{ name: 'ChangePassword'}"
                  variant="outline-dark"
                  class="btn btn-lg float-right"
                >Cancel Password</b-button>
              </b-form-group>
            </b-form>
          </div>
          <!-- form -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import { authService, userService, contactService } from "@/_services";
import { firebaseAuth } from "@/firebase/firebase.utils.js";

export default {
  name: "Profile",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: null
      },
      loading: false,
      feedback: null,
      currentUser: null,
      userProfile: null
    };
  },
  created: function() {
    authService.currentUser.subscribe(x => (this.currentUser = x));
    this.getProfile();
  },
  methods: {
    showToast(variant, title, msg = null) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true,
        "auto-hide-delay": 2000
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (this.form.firstName && this.form.lastName && this.form.email) {
        this.loading = true;
        this.updateProfile();
      }
    },
    async getProfile() {
      try {
        await userService
          .getUserById(this.currentUser.uid)
          .then(profileInfo => {
            if (profileInfo && profileInfo.data) {
              this.userProfile = profileInfo.data;
              this.form.firstName = profileInfo.data.displayName.split(" ")[0];
              this.form.lastName = profileInfo.data.displayName.split(" ")[1];
              this.form.email = profileInfo.data.email;
            }
          });
      } catch (error) {
        this.loading = false;
        let errorMsg = error.response
          ? error.response.data.message
          : error.message;
        this.showToast("danger", "Error", errorMsg);
      }
    },
    async updateProfile() {
      try {
        let profileData = global.getPlainObject(this.userProfile);
        profileData.displayName = `${this.form.firstName} ${this.form.lastName}`;
        profileData.email = this.form.email;
        await userService
          .updateUserById(profileData.uid, profileData)
          .then(async () => {
            this.loading = false;
            this.showToast(
              "success",
              "Success",
              `Profile updated successfully!`
            );

            await authService
              .updateLocalStorage()
              .then(() => this.$router.go(0));
          });
      } catch (error) {
        this.loading = false;
        let errorMsg = error.response
          ? error.response.data.message
          : error.message;
        this.showToast("danger", "Error", errorMsg);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.profile {
}
</style>
