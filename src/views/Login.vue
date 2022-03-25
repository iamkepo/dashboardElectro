<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-sm-4 h-100 right-shadow px-0">
        <div class="auth-wrapper">
          <div class="auth-form">
            <h2 class="auth-title mb-5">Connexion</h2>
            <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
            <form @submit="login">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  v-model="admin.email"
                  required
                  placeholder="Votre email"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  v-model="admin.password"
                  required
                  placeholder="*****"
                />
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  class="btn btn-default btn-achat-rapide btn-block"
                  value="Se connecter"
                />
              </div>
              <!--div-- class="form-group text-center">
                <router-link class="text-manote" to="/register">Vous n'avez pas encore de compte ? <br> Créez-en un !</router-link> 
              </!--div-->
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm-8 h-100 auth-cover"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      admin: {
        email: "",
        password: ""
      },
      errorMessage: ""
    };
  },
  mounted() {
    // to-do
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.$service.login(this.admin, (err, data) => {
        if (err) {
          this.errorMessage = err.data && err.data.message;
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("adminId", data.admin.id);
        localStorage.setItem("adminInfo", JSON.stringify(data.admin));
        localStorage.setItem("adminLevel", data.admin.level);
        this.$store.commit("getAdminInfo");
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>
