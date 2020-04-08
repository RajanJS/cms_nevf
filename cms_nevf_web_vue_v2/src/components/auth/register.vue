<template lang="html">
  <section class="register d-flex justify-content-center align-items-center">
    <div class="col-lg-5 mx-auto">
      <div class="auth-form-light text-left p-5 transparent-bg ">
        <h2>Register</h2>
        <h4 class="font-weight-light">Hello! Let's get started</h4>
        <form class="pt-4 pb-4" @submit.prevent="register">
         <b-form-group horizontal label="First Name">
            <b-form-input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="First Name"
              v-model.trim="firstName"
            />
          </b-form-group>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Last Name"
              v-model.trim="lastName"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              v-model.trim="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model.trim="password"
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              placeholder="Confirm password"
              v-model.trim="confirmPassword"
            />
          </div>
          <div class="mt-5">
            <button class="btn btn-block btn-dark btn-lg font-weight-medium" :disabled="loading">
              <span v-if="!loading">Register</span>
                <b-spinner v-if="loading" type="grow" label="Loading..."></b-spinner>
                <span v-if="loading">Loading...</span>
            </button>
            <p v-if="feedback" class="text-danger text-center pt-2">
              {{ feedback }}
            </p>
          </div>
          <div class="mt-2 w-75 mx-auto text-center">
            <b-form-checkbox
              id="checkbox"
              v-model="checkStatus"
              value=1
              unchecked-value=0
              >I accept the terms and use</b-form-checkbox
            >
          </div>
          <div class="mt-2 text-center">
            <router-link :to="{ name: 'Login' }">
              Already have an account?
              <span class="font-weight-medium">Login</span>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { authService } from "@/_services";

export default {
  name: "Register",
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      feedback: null,
      checkStatus: 0,
      loading: false
    };
  },

  methods: {
    async register() {
      if (
        this.firstName &&
        this.email &&
        this.password &&
        this.confirmPassword
      ) {
        if (this.password !== this.confirmPassword) {
          return (this.feedback = "Password didn't match");
        }

        if (this.checkStatus != 1) {
          return (this.feedback = "Please accept the terms and use!");
        }
        this.feedback = null;
        this.loading = true;

        await authService
          .registerUser({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            isAdmin: true
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch(err => {
            console.log("register -> err", err.response);
            this.loading = false;
            this.feedback = err.response
              ? err.response.data.message
              : err.message;
          });
      } else {
        this.loading = false;
        this.feedback = "Please fill in all required fields";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  background-image: url("../../assets/register-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-width: 100vw;
  min-height: 100vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  .transparent-bg {
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>
