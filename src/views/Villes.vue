<template>
  <dashboard-layout title="Villes">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-8">
          <div class="card rounded shadow mb-5">
            <div class="card-body">
              <h3 class="text-center mb-3">Liste des villes</h3>
              <div class="table-responsive">
                <table class="table rounded">
                  <thead>
                    <th>Nom</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="(ville, i) in villes" :key="i">
                      <td>{{ville.name}}</td>
                      <td class="text-right">
                        <button
                          type="button"
                          class="btn btn-warning btn-sm mr-2"
                          @click="editVille(ville)"
                        >
                          <i class="fa fa-pencil"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="removeVille(ville._id)"
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
              <h3 class="text-center">Ajouter une ville</h3>
              <hr />
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="create">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="newVille.name"
                    required
                    placeholder="Nom"
                  />
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
              <h3 class="text-center">Modifier une ville</h3>
              <hr />
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="update">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="editingVille.name"
                    required
                    placeholder="Nom"
                  />
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
      villes: [],
      creating: true,
      editing: false,
      errorMessage: "",
      newVille: {
        name: ""
      },
      editingVille: {
        name: ""
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

      this.$service.listAuth("villes", query, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        this.errorMessage = "";
        this.villes = data.villes;
        console.log(data.villes, this.villes);
      });
    },
    create(e) {
      e.preventDefault();
      this.$service.create("villes", this.newVille, (err, data) => {
        if (err) {
          this.errorMessage = err.data && err.data.message;
          console.log("Error", err.data);
          return;
        }

        this.newVille = {
          name: ""
        };

        this.editing = false;
        this.init();
      });
    },
    editVille(ville) {
      this.editingId = ville._id;
      this.editingVille.name = ville.name;
      this.creating = false;
      this.editing = true;
    },
    update(e) {
      e.preventDefault();
      this.$service.update(
        "classes",
        this.editingId,
        this.editingVille,
        (err, data) => {
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log("Error", err.data);
            return;
          }

          this.editingVille = {
            name: ""
          };

          this.creating = true;
          this.editing = false;
          this.init();
        }
      );
    },
    removeVille(id) {
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
            this.$service.remove("villes", id, (err, data) => {
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