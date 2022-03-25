<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-sm-8 h-100 auth-cover">
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

      </div>
      <div class="col-sm-4 h-100 px-5">
        <div class="d-flex flex-column justify-content-between h-100">
          <div class="">
            <h3 class="auth-title text-manote my-2">Inscription</h3>
            <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
            <form @submit="register" class="mt-4">
              <div class="form-group">
                <input type="email" class="form-control" v-model="user.email" required placeholder="Votre email">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="user.lastname" required placeholder="Votre nom">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="user.firstname" required placeholder="Votre prénom">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" v-model="user.password" required placeholder="*****">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="user.contact" required placeholder="Votre contact">
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-default btn-block btn-manote" value="S'inscrire">
              </div>

              <div class="form-group text-center">
                <router-link class="text-manote" to="/login">Vous avez déjà un compte? Connectez-vous!</router-link> 
              </div>
            </form>
          </div>
          <support></support>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      user: {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        contact: ''
      },
      errorMessage: ''
    }
  },
  mounted() {
    // to-do
  },
  methods: {
    register (e) {
      e.preventDefault();
      this.$service.register(this.user, (err, data) => {
        if (err) {
          this.errorMessage = err.data;
          console.log('Error', err.data);
          return;
        }
        console.log('Data', data);
        localStorage.setItem('token',data.token)
        localStorage.setItem('userId',data.user._id)
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        this.$router.push({ name: 'configservice' })
      });
    }
  }
}
</script>
