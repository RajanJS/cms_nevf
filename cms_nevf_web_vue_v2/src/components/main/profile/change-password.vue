<template>
  <section class="profile text-left pt-4">
    <div class="col-12 stretch-card">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title p-5">Change Password</h3>

          <!-- form -->
          <div class="text-left pl-5 pr-5 pb-5">
            <b-form @submit="onSubmit">
              <b-form-group id="input-group-1" label="Password:" label-for="password-1">
                <b-form-input
                  id="password-1"
                  type="password"
                  v-model.trim="form.password"
                  required
                  placeholder="Enter Password"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-1" label="Confirm Password:" label-for="confirm-1">
                <b-form-input
                  id="cpassword-1"
                  type="password"
                  v-model.trim="form.cpassword"
                  required
                  placeholder="Enter Password"
                ></b-form-input>
              </b-form-group>

              <p v-if="feedback" class="text-danger text-center pt-2">{{ feedback }}</p>
              <b-form-group class="pt-4">
                <b-button type="submit" variant="dark" class="btn btn-lg mr-3" :disabled="loading">
                  <b-spinner v-if="loading" type="grow" label="Loading..."></b-spinner>
                  <span>Change Password</span>
                </b-button>
                <b-button
                  type="reset"
                  :to="{ name: 'Profile'}"
                  variant="outline-dark"
                  class="btn btn-lg"
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
import { authService } from "@/_services";

export default {
  name: "ChangePassword",
  data() {
    return {
      form: {
        password: null,
        cpassword: null
      },
      loading: false,
      feedback: null
    };
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
      if (this.form.password && this.form.cpassword) {
        if (this.form.password !== this.form.cpassword) {
          return (this.feedback = "Password didn't match");
        }
        this.feedback = "";
        this.loading = true;
        this.updatePassword();
      }
    },
    async updatePassword() {
      try {
        await authService.updatePassword(this.form.password).then(() => {
          this.loading = false;
          authService.logout();
          this.$router.push({ name: "Login" });
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
.profile {
}
</style>
