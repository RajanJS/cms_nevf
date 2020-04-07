<template lang="html">
  <section class="error-404 d-flex justify-content-center align-items-center">
    <div class="content-wrapper d-flex align-items-center text-center">
      <div class="row flex-grow">
        <div class="col-lg-7 mx-auto text-dark">
          <div class="row align-items-center d-flex flex-row">
            <div class="col-lg-6 text-lg-right pr-lg-4">
              <h1 class="display-1 mb-0">404</h1>
            </div>
            <div class="col-lg-6 error-page-divider text-lg-left pl-lg-2">
              <h2>SORRY!</h2>
              <h3 class="font-weight-light">
                The page you’re looking for was not found.
              </h3>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12 text-center mt-xl-2">
              <router-link :to="{ name: 'Home' }">Back to home </router-link>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script lang="js">
export default {
  name: 'error-404'
}
</script>

<style scoped lang="scss">
.error-404 {
  background-image: url("../assets/login-bg.jpg");
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
