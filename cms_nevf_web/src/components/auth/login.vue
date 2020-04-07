<template lang="html">
  <section class="login d-flex justify-content-center align-items-center">
    <div class="col-lg-5 mx-auto">
      <div class="auth-form-dark text-left p-5 transparent-bg">
        <h2>Login</h2>
        <h4 class="font-weight-light">Welcome Back! Let's get started</h4>
        <form class="pt-5" @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email / Username</label>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
            />
          </div>
          <div class="mt-5">
            <button class="btn btn-block btn-dark btn-lg font-weight-medium" :disabled="loading">
               <span v-if="!loading">Login</span>
                <b-spinner v-if="loading" type="grow" label="Loading..."></b-spinner>
                <span v-if="loading">Loading...</span>
            </button>
            <p v-if="feedback" class="text-danger text-center pt-2">
              {{ feedback }}
            </p>
          </div>
          <div class="mt-4 text-center">
            <router-link :to="{ name: 'Signup' }">
              <span class="font-weight-medium">
                New here ? Create Account
                <b-icon icon="person-plus" variant="secondary" />
              </span>
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
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      loading: false
    };
  },
  methods: {
    async login() {
      if (this.email && this.password) {
        this.feedback = null;
        this.loading = true;
        try {
          await authService.login(this.email, this.password);
          this.$router.push({ name: "Home" });
        } catch (error) {
          this.feedback = error.message;
          this.loading = false;
        }
      } else {
        this.feedback = "Please fill in both fields";
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  background-image: url("../../assets/login-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-width: 100vw;
  min-height: 100vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  .transparent-bg {
    background-color: rgba(255, 255, 255, 0.6);
  }
}
</style>
