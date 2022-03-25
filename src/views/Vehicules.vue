<template>
  <dashboard-layout title="Vehicules">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-8">
          <div class="card rounded shadow mb-5">
            <div class="card-body">
              <h3 class="text-center mb-3">Liste des véhicules</h3>
              <div class="table-responsive">
                <table class="table rounded">
                  <thead>
                    <th>Nom</th>
                    <th>Type</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="(vehicule, i) in vehicules" :key="i">
                      <td>{{vehicule.name}}</td>
                      <td>{{vehicule.type}}</td>
                      <td class="text-right">
                        <button
                          type="button"
                          class="btn btn-warning btn-sm mr-2"
                          @click="editVehicule(vehicule)"
                        >
                          <i class="fa fa-pencil"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="removeVehicule(vehicule._id)"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4" v-if="creating">
          <div class="card rounded shadow">
            <div class="card-body">
              <h3 class="text-center">Ajouter un vehicule</h3>
              <hr />
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="create">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="newVehicule.name"
                    required
                    placeholder="Nom"
                  />
                </div>
                <div class="form-group">
                  <label>Type</label>
                  <select class="form-control" v-model="newVehicule.type">
                    <option value="Suv">Suv</option>
                    <option value="Berline">Berline</option>
                    <option value="Break">Break</option>
                    <option value="Cabriolet">Cabriolet</option>
                    <option value="4x4">4x4</option>
                  </select>
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    class="btn btn-primary btn-block"
                    style="background-color:#d39b03"
                    value="Ajouter"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-4" v-if="editing">
          <div class="card rounded shadow">
            <div class="card-body">
              <h3 class="text-center">Modifier une classe</h3>
              <hr />
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="update">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="editingVehicule.name"
                    required
                    placeholder="Nom"
                  />
                </div>
                <div class="form-group">
                  <label>Type</label>
                  <select class="form-control" v-model="editingVehicule.type">
                    <option value="Suv">Suv</option>
                    <option value="Berline">Berline</option>
                    <option value="Break">Break</option>
                    <option value="Cabriolet">Cabriolet</option>
                    <option value="4x4">4x4</option>
                  </select>
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    class="btn btn-primary btn-block"
                    style="background-color:#d39b03"
                    value="Mettre à jour"
                  />
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
  name: "home",
  data() {
    return {
      vehicules: [],
      creating: true,
      editing: false,
      errorMessage: "",
      newVehicule: {
        name: "",
        type: ""
      },
      editingVehicule: {
        name: "",
        type: ""
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const query = {
        options: {},
        page: 0,
        perPage: 100
      };

      this.$service.listAuth("vehicules", query, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        this.errorMessage = "";
        this.vehicules = data.vehicules;
      });
    },
    create(e) {
      e.preventDefault();
      this.$service.create("vehicules", this.newVehicule, (err, data) => {
        if (err) {
          this.errorMessage = err.data && err.data.message;
          console.log("Error", err.data);
          return;
        }

        this.newVehicule = {
          name: "",
          type: ""
        };

        this.editing = false;
        this.init();
      });
    },
    editVehicule(vehicule) {
      this.editingId = vehicule._id;
      this.editingVehicule.name = vehicule.name;
      this.editingVehicule.type = vehicule.type;
      this.creating = false;
      this.editing = true;
    },
    update(e) {
      e.preventDefault();
      this.$service.update(
        "vehicules",
        this.editingId,
        this.editingVehicule,
        (err, data) => {
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log("Error", err.data);
            return;
          }

          this.editingVehicule = {
            name: "",
            type: ""
          };

          this.creating = true;
          this.editing = false;
          this.init();
        }
      );
    },
    removeVehicule(id) {
      this.$swal
        .fire({
          title: "Voulez vous vraiment supprimer?",
          text: "Vous ne pouvez recuperer ses données!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#3085d6",
          confirmButtonColor: "#d33",
          confirmButtonText: "Oui, supprimer!"
        })
        .then(result => {
          if (result.value) {
            this.$service.remove("vehicules", id, (err, data) => {
              if (err) {
                this.errorMessage = err.data && err.data.message;
                console.log("Error", err.data);
                return;
              }
              this.$swal
                .fire(
                  "Suppression réussie",
                  "La suppression s'est effectuée avec succès",
                  "success"
                )
                .then(() => {
                  this.init();
                });
            });
          }
        });
    }
  }
};
</script>
