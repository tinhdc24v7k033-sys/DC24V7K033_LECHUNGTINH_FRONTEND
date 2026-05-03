<template>
  <div class="container">
    <h3>Đăng nhập</h3>

    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" class="form-control mb-2"/>
      <input v-model="password" type="password" placeholder="Password" class="form-control mb-2"/>

      <button class="btn btn-primary">Login</button>
    </form>

    <hr />

    <button @click="loginGoogle" class="btn btn-danger">Login Google</button>
    <button @click="loginFacebook" class="btn btn-primary">Login Facebook</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);

      this.$router.push("/");
    },

    loginGoogle() {
    window.location.href = "http://localhost:3000/api/auth/google";
  },

    loginFacebook() {
      window.location.href = "http://localhost:3000/api/auth/facebook";
    }
  }
};
</script>