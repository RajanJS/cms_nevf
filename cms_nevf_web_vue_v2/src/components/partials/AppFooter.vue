<template lang="html">
  <!-- <div color="blue-grey" class="page-footer font-small lighten-5 pt-0"> -->
  <section class="app-footer footer-copyright text-center">
    <footer class="footer fixed-bottom">
      <div class="container-fluid clearfix footer">
        <span
          class="float-left text-muted text-white d-block text-center text-sm-left d-sm-inline-block font-weight-normal font-italic"
          >Copyright © 2018
          <b-link href="http://www.mrajan.com.np/" target="_blank"
            >Rajan Maharjan</b-link
          >. All rights reserved.
          <span />
        </span>
        <span
          class="fixed-right d-block float-none float-sm-right text-white text-center font-weight-normal  mr-2 me-sm-0"
          >Hand-crafted & made with
          <b-icon icon="heart-fill" variant="danger" />

          From Nepal.
        </span>
      </div>
    </footer>
  </section>
  <!-- </div> -->
</template>

<script lang="js">
export default {
  name: 'app-footer'
}
</script>

<style scoped lang="scss">
.app-footer {
  .container-fluid.footer {
    background: rgba(66, 66, 66, 0.5);
  }
  .container-fluid.footer > *:last-child {
    margin-bottom: 0px;
  }
}
</style>
