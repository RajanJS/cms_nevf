<template >
  <div class="card-body text-left">
    <h4 class="card-title font-weight-bold mb-0">{{data.title? data.title : `Title`}}</h4>
    <div class="d-flex justify-content-between flex-wrap">
      <div class="d-inline-block pt-3">
        <div class="d-flex">
          <h2 class="mb-0">{{data.number? data.number : 0}}</h2>
          <div class="d-flex align-items-center ml-2">
            <small class="ml-1 mb-0">Updated at: {{data.time ? data.time : `...`}}</small>
          </div>
        </div>
        <router-link v-if="isAdmin" :to="{ name: data.link }">
          <span
            class="font-weight-medium text-dark pt-4"
          >{{data.linkText? data.linkText : data.title}}</span>
        </router-link>
      </div>
      <div class="d-inline-block mt-2 mt-xl-0">
        <router-link :to="{ name: data.title }">
          <div class="px-4 py-2 rounded" :class="data.class">
            <p class="h1 mb-2">
              <b-icon
                v-if="data.icon === 'layout-text-window-reverse'"
                icon="layout-text-window-reverse"
                variant="light"
              />
              <b-icon v-if="data.icon === 'people-fill'" icon="people-fill" variant="light" />
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: "card-container",
  props: {
    data: Object,
    isAdmin: Boolean
  }
};
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
