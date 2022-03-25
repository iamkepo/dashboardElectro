<template>
  <dashboard-layout title="Administrateurs">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 mx-auto mb-5">
          <div class="card rounded shadow">
            <div class="card-body">
              <h3 class="text-center">Ajouter un admin</h3>
              <hr>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="create">
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" class="form-control" v-model="newAdmin.email" required placeholder="Email">
                </div>
                <div class="form-group">
                  <label>Nom</label>
                  <input type="text" class="form-control" v-model="newAdmin.lastname" required placeholder="Nom">
                </div>
                <div class="form-group">
                  <label>Prénom(s)</label>
                  <input type="text" class="form-control" v-model="newAdmin.firstname" required placeholder="Prénom(s)">
                </div>
                <div class="form-group">
                  <label>Mot de passe</label>
                  <input type="password" class="form-control" v-model="newAdmin.password" required placeholder="Mot de passe">
                </div>
                <div class="form-group">
                  <label>Role</label>
                  <v-select :options="roles" :reduce="item => item.code" 
                    class="form-control-select" v-model="newAdmin.role" required></v-select>
                </div>
                <div class="form-group">
                  <input type="submit" class="btn btn-default btn-achat-rapide btn-block" value="Ajouter">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layout>
</template>

<script>
  export default {
    name: 'home', 
    data () {
      return {
        errorMessage: '',
        newAdmin: {
          email: '',
          lastname: '',
          firstname: '',
          password: '',
          role: ''
        },
        roles: [
          {label: 'Admin', code: 'admin'},
          {label: 'DE', code: 'de'},
          {label: 'Secretaire', code: 'secretaire'}
        ]
      }
    },
    mounted() {
    }, 
    methods: {
      create (e) {
        e.preventDefault();
        this.$service.createAdmin(this.newAdmin, (err, data) => {
          console.log(err, data);
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log('Error', err.data);
            return;
          }

          this.newAdmin = {
            email: '',
            lastname: '',
            firstname: '',
            password: '',
            role: ''
          };

          this.$router.push('/admins/active');
        });
      },
    }
  }
</script>
