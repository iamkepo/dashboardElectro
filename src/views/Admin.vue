<template>
  <dashboard-layout title="Admins">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-8">
          <div class="card rounded shadow">
            <div class="card-body">
              <h3 class="text-center mb-3">Liste des admins</h3>
              <div class="table-responsive">
                <table class="table rounded">
                  <thead>
                    <th>Email</th><th>Nom &amp; prénom(s)</th><th></th>
                  </thead>
                  <tbody>
                    <tr v-for="(admin, i) in admins" :key="i">
                      <td>{{admin.email}}</td>
                      <td>{{admin.fullname}}</td>
                      <td>
                        <button type="button" class="btn btn-danger btn-sm" 
                          @click="removeAdmin(admin._id)"><i class="fa fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card rounded shadow">
            <div class="card-body">
              <h3 class="text-center">Ajouter un admin</h3>
              <hr>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="create">
                <div class="form-group">
                  <input type="email" class="form-control" v-model="newAdmin.email" required placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newAdmin.fullname" required placeholder="Nom">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" v-model="newAdmin.password" required placeholder="*****">
                </div>
                <div class="form-group">
                  <input type="submit" class="btn btn-default btn-achat-rapide btn-block" 
                  style="background-color:#181B29" value="Ajouter">
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
  const roles = {
    'coordonator': 'Cordonateur',
    'manager': 'Manageur',
    'rse': 'RSE',
    'rlm-antenne': 'RLM Antenne',
    'rlm':'RLM',
    'admin': 'Administrateur'
  };
  export default {
    name: 'home', 
    data () {
      return {
        admins: [],
        errorMessage: '',
        newAdmin: {
          email: '',
          fullname: '',
          password: '',
          level: 'admin'
        }
      }
    },
    mounted() {
      this.init();
    }, 
    filters: {
      getRoleLabel: function (value) {
        return roles[value];
      }
    },
    methods: {
      init () {
        const query = {
          options: {
            level: 'admin'
          },
          page: 0,
          perPage: 100
        };

        this.$service.listAdmins(query, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          
          this.errorMessage = '';
          this.admins = data.admins;
        })
      },
      create (e) {
        e.preventDefault();
        this.$service.createAdmin(this.newAdmin, (err, data) => {
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log('Error', err.data);
            return;
          }

          this.newAdmin = {
            email: '',
            fullname: '',
            password: '',
            level: 'admin',
          };

          this.init();
        });
      },
      removeAdmin (id) {
        this.$swal.fire({
          title: 'Voulez vous vraiment supprimer?',
          text: "Vous ne pouvez recuperer ses données!",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#3085d6',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Oui, supprimer!'
        }).then((result) => {
          if (result.value) {
            this.$service.removeAdmin(id, (err, data) => {
              if (err) {
                this.errorMessage = err.data && err.data.message;
                console.log('Error', err.data);
                return;
              }

              this.$swal.fire(
                'Suppression réussie',
                'La suppression s\'est effectuée avec succès',
                'success'
              ).then(() => {
                this.init();
              });
            });
          }
        })
        
      }
    }

  }
</script>
