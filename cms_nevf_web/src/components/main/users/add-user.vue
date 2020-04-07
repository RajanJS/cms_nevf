<template>
  <section class="add-user text-left pt-4">
    <div class="col-12 stretch-card">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title p-5">Add User</h3>

          <!-- form -->
          <div class="text-left pl-5 pr-5 pb-5">
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group id="firstName" label="First Name:" label-for="firstName">
                <b-form-input
                  id="firstName"
                  v-model="form.firstName"
                  required
                  placeholder="Enter first name"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="lastName" label="Last Name:" label-for="lastName">
                <b-form-input
                  id="lastName"
                  v-model="form.lastName"
                  required
                  placeholder="Enter last name"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-role" label="Create As:" label-for="input-role">
                <b-form-select id="input-role" v-model="form.inviteAs" :options="roles" required></b-form-select>
              </b-form-group>
              <p v-if="feedback" class="text-danger text-center pt-2">{{ feedback }}</p>
              <b-form-group class="pt-4">
                <b-button type="submit" variant="dark" class="btn btn-lg mr-3" :disabled="loading">
                  <b-spinner v-if="loading" type="grow" label="Loading..."></b-spinner>
                  <span>Submit</span>
                </b-button>
                <b-button type="reset" variant="outline-dark" class="btn btn-lg mr-3">Reset</b-button>
                <b-button
                  type="reset"
                  :to="{ name: 'Users'}"
                  variant="outline-dark"
                  class="btn btn-lg float-right"
                >Cancel</b-button>
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
import { authService, userService } from "@/_services";
import { Role, defaultInvitePassword } from "@/_helpers";

export default {
  name: "AddContact",
  data() {
    return {
      roles: [{ text: "Select Role", value: null }, Role.Admin, Role.Normal],
      form: {
        firstName: "",
        lastName: "",
        email: null,
        phoneNumber: null,
        inviteAs: Role.Normal
      },
      loading: false,
      feedback: null,
      currentUser: null
    };
  },
  created: function() {
    authService.currentUser.subscribe(x => (this.currentUser = x));
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
      let userData = this.form;
      if (
        !userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.inviteAs
      ) {
        return (this.feedback = "Please submit valid data");
      }
      this.addUser(userData);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.email = null;
    },
    async addUser(userData) {
      try {
        this.loading = true;
        this.feedback = null;

        let newUserData = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          isAdmim: userData.inviteAs == Role.Admin ? true : false,
          password: defaultInvitePassword,
          userId: this.currentUser.uid
        };

        await userService.registerUser(newUserData).then(async () => {
          this.showToast("success", "Success", `User invited successfully!`);
          this.$router.push({ name: "Users" });
        });
      } catch (error) {
        this.loading = false;
        let errorMsg = error.response
          ? error.response.data.message
          : error.message;
        // this.feedback = errorMsg;
        this.showToast("danger", "Error", errorMsg);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.add-user {
}
</style>
