<template>
  <dashboard-layout title="Admins">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 mx-auto">
          <div class="card rounded shadow">
            <div class="card-body">
              <h3 class="text-center">Modifier un admin</h3>
              <hr>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="edit">
                <div class="form-group">
                  <input type="email" class="form-control readonly" readonly v-model="editingAdmin.email" required placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="editingAdmin.lastname" required placeholder="Nom">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="editingAdmin.firstname" required placeholder="Prénom(s)">
                </div>
                <div class="form-group">
                  <v-select :options="roles" :reduce="item => item.code" 
                    class="form-control-select" v-model="editingAdmin.role" required></v-select>
                </div>
                <div class="form-group">
                  <input type="submit" class="btn btn-default btn-achat-rapide btn-block" value="Enregistrer">
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
        editingId: '',
        editingAdmin: {},
        roles: [
          {label: 'Admin', code: 'admin'},
          {label: 'DE', code: 'de'},
          {label: 'Secretaire', code: 'secretaire'}
        ]
      }
    },
    mounted() {
      this.editingId = this.$route.query.adminId;
      if (this.editingId) {
        this.$service.load('admins', this.editingId, (err, data) => {
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log('Error', err.data);
            return;
          }

          if (data.admin) {
            console.log(data.admin.role);
            this.editingAdmin = data.admin;
          }
        });
      }
    }, 
    methods: {
      edit (e) {
        e.preventDefault();
        const savingAdmin = {
          lastname: this.editingAdmin.lastname,
          firstname: this.editingAdmin.firstname,
          role: this.editingAdmin.role
        };

        this.$service.update('admins', this.editingId, savingAdmin, (err, data) => {
          console.log(err, data);
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log('Error', err.data);
            return;
          }

          this.editingAdmin = {
            email: '',
            adminname: '',
            lastname: '',
            firstname: '',
            // password: ''
          };

          this.$router.push('/admins/active');
        });
      },
    }
  }
</script>
