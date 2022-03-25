<template>
  <dashboard-layout title="TaxiCreate">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-10 mx-auto mb-4">
          <div class="mb-4">
            <span class="btn btn-link text-dark px-0" @click="$router.back()">
              <i class="fa fa-angle-left mr-3 icon-big"></i>
              <span>Retour</span>
            </span>
          </div>
          <div class="card rounded shadow">
            <div class="p-5">
              <h3 class="text-left mb-5">Ajouter un Taxi</h3>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>

              <form @submit="create">
                <div class="row">
                  <div class="col-sm-5">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="newTaxi.lastname"
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div class="col-sm-7">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="newTaxi.firstname"
                        placeholder="Prénoms(s)"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="newTaxi.phonenumber"
                        placeholder="Téléphone"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="newTaxi.password"
                        placeholder="Mot de passe"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="newTaxi.idcarte"
                        placeholder="N° carte d'Identité"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12">
                    <hr style="border-top: 1px dashed black;" />
                  </div>

                  <div class="col-sm-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="newTaxi.vehicule.cartegrise"
                        placeholder="Carte grise"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="newTaxi.vehicule.immatriculation"
                        placeholder="Immatricultaion"
                      />
                    </div>
                  </div>
                  <div class="col-sm-5">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="newTaxi.vehicule.marque"
                        placeholder="Marque"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Nombre de places</label>
                      <input
                        type="number"
                        min="4"
                        class="form-control"
                        v-model="newTaxi.vehicule.place"
                        placeholder="Nbre de places"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Climatisation ?</label>
                      <select class="form-control" v-model="newTaxi.vehicule.climatisation">
                        <option value="true">oui</option>
                        <option value="false">non</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 ml-auto">
                    <div class="form-group">
                      <input
                        type="submit"
                        class="btn btn-primary btn-block"
                        style="background-color:#d39b03"
                        value="Enregistrer"
                      />
                    </div>
                  </div>
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
      errorMessage: "",
      imageData: [],
      fileNumber: 6,
      newTaxi: {
        firstname: "",
        lastname: "",
        phonenumber: "",
        password: "",
        idcarte: "",
        villes: "Cotonou",
        vehicule: {
          cartegrise: "",
          immatriculation: "",
          marque: "",
          place: 0,
          climatisation: false
        }
      }
    };
  },
  mounted() {
    this.init();
    //this.getVilles();
  },
  methods: {
    init() {},

    getVilles() {
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
        this.vvilles = data.villes.map(ville => {
          return {
            label: ville.nam,
            code: ville._id
          };
        });
        console.log(this.vvilles);
      });
    },
    create(e) {
      e.preventDefault();

      this.$service.registertaxi(this.newTaxi, (err, data) => {
        console.log(err, data);
        if (err) {
          this.errorMessage = err.data && err.data.message;
          console.log("Error", err.data);
          return;
        }
        this.newTaxi = {
          firstname: "",
          lastname: "",
          phonenumber: "",
          password: "",
          idcarte: "",
          villes: [],
          vehicule: {
            cartegrise: "",
            immatriculation: "",
            marque: "",
            place: 0,
            climatisation: false
          }
        };
        console.log("ook");
        return;
        /*
        this.$swal
          .fire("Ajout réussie", "Taxi créé avec succès", "success")
          .then(() => {
            console.log("bof");
          });
        this.$router.push("/taxis"); */
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.img-preview {
  width: 48px;
  position: absolute;
  height: 100%;
  z-index: 1000;
  background-size: cover;
  background-position: center;
}

.custom-file.filled {
  border: 1px #16a316 solid;
  border-radius: 4px;

  label {
    padding-left: 60px;
  }
}
</style>
