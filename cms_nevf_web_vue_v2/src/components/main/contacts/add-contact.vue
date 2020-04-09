<template>
  <section class="add-contact text-left pt-4">
    <div class="col-12 stretch-card">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title p-5">Add Contact</h3>

          <!-- form -->
          <div class="text-left pl-5 pr-5 pb-5">
            <b-form @submit="onSubmit" @reset="onReset">
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

              <b-form-group id="phone" label="Phone Number:" label-for="phone">
                <b-form-input
                  id="phone"
                  type="number"
                  v-model.trim="form.phoneNumber"
                  required
                  placeholder="Enter phone number"
                ></b-form-input>
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
                  :to="{ name: 'Contacts'}"
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
import { authService, contactService } from "@/_services";

export default {
  name: "AddContact",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: null,
        phoneNumber: null
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
        "auto-hide-delay": 3000
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.addContact();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.email = null;
      this.form.phoneNumber = null;
    },
    async addContact() {
      try {
        this.loading = true;
        this.feedback = null;
        let contactData = global.getPlainObject(this.form);
        contactData.userId = this.currentUser.userId
          ? this.currentUser.userId
          : this.currentUser.uid;

        await contactService.addContact(contactData).then(async () => {
          this.$router.push({ name: "Contacts" });
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
.add-contact {
}
</style>
