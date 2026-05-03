<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
  created() {
  const token = new URLSearchParams(window.location.search).get("token");

  if (token) {
    localStorage.setItem("token", token);
    this.$router.push("/");
  }
},
};
</script>
<template>
  <div id="app">
    <AppHeader />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
