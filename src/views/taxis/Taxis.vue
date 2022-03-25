<template>
  <dashboard-layout title="Taxis">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm mb-4 card rounded shadow p-4">
          <div class="mb-4">
            <div class="col-sm-6 mb-5">
              <h2>La liste des taxis</h2>
            </div>
            <div class="float-right"></div>
          </div>

          <div class="p-5" v-if="isLoading">
            <fulfilling-bouncing-circle-spinner
              class="mx-auto"
              :animation-duration="2000"
              :size="60"
              :color="'#d39b03'"
            />
          </div>
          <div v-else>
            <div v-if="taxis != null" class="table-responsive">
              <table class="table rounded">
                <thead>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Prénoms</th>
                  <th>Téléphone</th>
                  <th>Marque</th>
                  <th>Type de Véhicule</th>
                  <th>Options</th>
                  <th class="text-right pr-2">Actions</th>
                </thead>
                <tbody>
                  <tr v-for="(taxi, i) in taxis" :key="i" @click="showTaxi(article._id)">
                    <td>{{((curPage - 1) * perPage) + i + 1}}</td>
                    <td>{{taxi.lastname}}</td>
                    <td>{{taxi.firstname}}</td>
                    <td>{{taxi.phonenumber}}</td>
                    <td>{{taxi.vehicule.marque}}</td>
                    <td>{{taxi.vehicule.type && taxi.vehicule.type.name}}</td>
                    <td>{{taxi.vehicule.options.join(', ')}}</td>
                    <td class="text-right pr-4" @click.stop>
                      <!-- <button
                        type="button"
                        class="btn btn-warning btn-sm mr-2"
                        @click="editTaxi(article._id)"
                      >
                        <i class="fa fa-pencil"></i>
                      </button> -->
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="removeTaxi(taxi._id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <h4 class="text-center my-2">Aucun résultat trouvé !</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layout>
</template>

<script>
export default {
  name: "produit",
  data() {
    return {
      taxis: [],
      errorMessage: "",
      searchtext: "",
      searchtype: "name",
      isLoading: false,
      curPage: 1,
      total: 0,
      perPage: 100,
      sort: {},
      level: "",
      admin: false
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.level = localStorage.getItem("adminLevel");
      if (this.level === "un") this.admin = true;
    }
    this.init();
  },
  methods: {
    init(page, resetParams) {
      if (resetParams) {
        this.curPage = 1;
      }

      let query = {
        options: {},
        filter: {
          text: this.searchtext,
          type: this.searchtype.split("+")
        },
        sort: this.sort,
        page: this.curPage - 1,
        perPage: this.perPage
      };

      this.isLoading = true;
      this.$service.listAuth("taxis", query, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        this.total = data.total;
        this.taxis = data.taxis;
        this.isLoading = false;
      });
    },
    sortBy(prop) {
      if (this.sort[prop] == -1) {
        this.sort[prop] = 0;
      } else if (this.sort[prop] == 0) {
        this.sort[prop] = 1;
      } else if (this.sort[prop] == 1) {
        this.sort[prop] = -1;
      }

      this.init(0, true);
    },
    getSortClass(prop) {
      if (this.sort[prop] == -1) {
        return " desc";
      } else if (this.sort[prop] == 0) {
        return "";
      } else if (this.sort[prop] == 1) {
        return " asc";
      }
    },
    editTaxi(id) {
      this.$router.push({ name: "taxi-edit", query: { articleId: id } });
    },
    showTaxi(id) {
      this.$router.push("/taxis/e/" + id);
    },
    removeTaxi(id) {
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
            this.$service.remove("taxis", id, (err, data) => {
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

<style scoped>
.categorie {
  background-color: #098fb8;
  color: #f1f1f1;
  border-radius: 6px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  width: auto;
  margin: 0 auto;
  padding: 10px 5px 10px 15px;
}

.categories {
  background-color: #f3930c;
  color: #fff;
  border-radius: 8px;
  /* box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  text-align: center;
  width: auto;
  /* height: 20px; */
  margin-top: 10px;
  padding: 5px;
  /* font-size: 18px; */
}
.subcat {
  background-color: #e74210;
  color: #fff;
  border-radius: 8px;
  /* box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  text-align: center;
  width: auto;
  /* height: 20px; */
  margin-top: 10px;
  padding: 5px;
  /* font-size: 18px; */
}

.scrol {
  overflow: auto;
  overflow-y: hidden;
  height: 50px;
}

/* width */
::-webkit-scrollbar {
  /* width: 10px; */
  height: 10%;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #fdfdfd;
  border-radius: 1px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #dddddd;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d6d3cf;
}
</style>
