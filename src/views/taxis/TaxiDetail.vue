<template>
  <dashboard-layout title="ArticleDetail">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 mx-auto mb-4">
          <div class="mb-4">
            <span class="btn btn-link text-dark px-0" @click="$router.back()">
              <i class="fa fa-angle-left mr-3 icon-big"></i>
              <span>Retour</span>
            </span>
            <div class="float-right">ok</div>
          </div>
          <div>
            <div class="row">
              <div class="col-sm-2">
                <h3>
                  <b>Taxi</b>
                </h3>
              </div>
              <div class="col-sm-10">
                <hr style="border-top: 1px dashed black;" />
              </div>
              <br />
              <div class="col-sm-3">
                <b>Nom :</b>
                {{currentTaxi.lastname}}
              </div>
              <div class="col-sm-3">
                <b>Prénoms :</b>
                {{currentTaxi.firstname}}
              </div>
              <div class="col-sm-3">
                <b>Télephone :</b>
                {{currentTaxi.phonenumber}}
              </div>
              <div class="col-sm-3">
                <b>Id Carte :</b>
                {{currentTaxi.idcarte}}
              </div>
              <br />
              <br />
              <div class="col-sm-3">
                <b>Villes :</b>
                {{currentTaxi.villes}}
              </div>
            </div>
            <br />
            <br />
            <div class="row">
              <div class="col-sm-2">
                <h3>
                  <b>Véhicule</b>
                </h3>
              </div>
              <div class="col-sm-10">
                <hr style="border-top: 1px dashed black;" />
              </div>
              <br />
              <div class="col-sm-3">
                <b>Carte grise :</b>
                {{currentTaxi.vehicule.cartegrise}}
              </div>
              <div class="col-sm-3">
                <b>Immatriculation :</b>
                {{currentTaxi.vehicule.immatriculation}}
              </div>
              <div class="col-sm-3">
                <b>Marque</b>
                {{currentTaxi.vehicule.marque}}
              </div>
              <div class="col-sm-3">
                <b>Nbre de place :</b>
                {{currentTaxi.vehicule.place}}
              </div>
              <br />
              <br />
              <div class="col-sm-3" v-if="currentTaxi.vehicule.climatisation">
                <b>Climatisation :</b>
                oui
              </div>
              <div class="col-sm-3" v-else>
                <b>Climatisation :</b>
                non
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layout>
</template>

<script>
//import {Carousel, Slide} from 'vue-carousel';
export default {
  data() {
    return {
      errorMessage: "",
      currentId: "",
      //currentDossier: {},
      //currentEntreprise: {},
      currentTaxi: {},
      //dossierId: "",
      //entrepriseId: "",
      connected: false
      //admin: false,
      //user: false,
      /*
      data: [
        '<div class="example-slide">Slide 1</div>',
        '<div class="example-slide">Slide 2</div>',
        '<div class="example-slide">Slide 3</div>'
      ]*/
    };
  },
  mounted() {
    this.currentId = this.$route.params.taxiId;
    if (this.currentId) {
      this.$service.load("taxis", this.currentId, (err, data) => {
        if (err) {
          this.errorMessage = err.data && err.data.message;
          console.log("Error", err.data);
          return;
        } /*
        this.currentDossier = this.currentTaxi.dossier;
        this.dossierId = this.currentDossier._id;
        this.entrepriseId = this.currentDossier.entreprise;
        this.getEntreprise();*/
        this.currentTaxi = data.taxi;
        console.log(this.currentTaxi);
      });
    }
    if (localStorage.getItem("token")) {
      this.connected = true;
    } else {
      this.connected = false;
    }
  },
  methods: {
    getEntreprise() {
      const query = {
        options: { _id: this.entrepriseId },
        page: 0,
        perPage: 100
      };

      this.$service.list("entreprises", query, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        this.errorMessage = "";
        this.currentEntreprise = data.entreprises[0];
      });
    },
    commander() {
      //this.$router.push("/commandes/create/" + this.currentId);
      //return;
      if (this.connected == true) {
        let newCommande = {
          produit: this.currentId,
          clientRegisted: localStorage.getItem("adminId"),
          prixVente: 0,
          beneficeVente: 0,
          statut: "enattente",
          repartition: false
        };
        this.$service.create("commandes", newCommande, (err, data) => {
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log("Error", err.data);
            return;
          }
          this.$swal
            .fire(
              "Commande réussie",
              "Votre commande a été passée avec succès",
              "success"
            )
            .then(() => {
              this.init();
            });
          //console.log("ooook");
        });
      } else {
        this.$router.push("/commandes/create/" + this.currentId);
      }
    }
  },
  components: {
    //Carousel,Slide
  }
};
</script>

<style scoped>
.butPanier {
  text-align: center;
}
.produit-card {
  position: relative;
  /* padding-left: 20px;   
    padding-right: 20px;    */
  margin: auto;
  margin-bottom: 40px;
  padding-bottom: 10px;
  max-width: 600px;
  background-color: #fefefe;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 0 7px 3px rgba(75, 75, 75, 0.4);
}
.photos {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1px;
  padding-right: 1px;
  margin: 20px;
  height: 400px;
  width: 100%;
  background-color: #efefef; /*#A2A2A2;*/
  border-bottom: 1px solid rgb(23, 25, 29);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
  background-size: cover;
}
.dot-card {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
