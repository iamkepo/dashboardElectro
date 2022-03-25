<template>
  <dashboard-layout title="Administrateurs">
    <div class="container-fluid">
      <div>
        <span class="btn btn-link" @click="$router.go(-1)"><i class="fa fa-angle-left mr-1"></i> Retour </span>
      </div>
      <div class="row">
        <div class="col-sm-10 mx-auto">
          <div class="card rounded shadow">
            <div class="card-body">
              <h3 class="text-center">Informations sur l'agent {{currentAdmin.lastname}} {{currentAdmin.firstname}}</h3>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h4>Nom</h4>
                  <p>{{currentAdmin.lastname}}</p>
                </div>
                <div class="col-sm-3">
                  <h4>Prénom(s)</h4>
                  <p>{{currentAdmin.firstname}}</p>
                </div>
                <div class="col-sm-3">
                  <h4>Email</h4>
                  <p>{{currentAdmin.email}}</p>
                </div>
                <div class="col-sm-3">
                  <h4>Role</h4>
                  <p>{{currentAdmin.role.toUpperCase().replace('-', '')}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layout>
</template>

<script>
  export default {
    data () {
      return {
        errorMessage: '',
        currentId: '',
        currentAdmin: {
          role: ''
        }
      }
    },
    mounted() {
      this.currentId = this.$route.query.agentId;
      if (this.currentId) {
        this.$service.load('admins', this.currentId, (err, data) => {
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log('Error', err.data);
            return;
          }

          if (data.admin) {
            this.currentAdmin = data.admin;
          }
        });
      }
    }, 
    methods: {
    }
  }
</script>
