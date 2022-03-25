<template> 
  <div class="commande-card" @click="showCommande">
    <div class="text-card">
      <div class="commande-photo text-dark">{{commande.produit}}        
      </div>
      <div class="commande-nom"> Statut : {{commande.statut}} </div>
      <div class="commande-nom"> Lieu : {{commande.lieu}} </div>
      <div class="commande-nom"> Quantite : {{commande.quantite}} </div>
      <div class="commande-nom"> Date : {{commande.date}} </div>
      
    </div>
    <div class="dot-card" @click.stop>
      <BtnDropDown icon="ellipsis-h" btnClass="btn btn-default btn-sm dot-card" :items="its"/>
    </div>
  </div>
</template>

<script>
import BtnDropDown from '@/components/BtnDropDown.vue';

export default {
  name: 'search',
  props: ['commande', 'showCommande', 'editCommande', 'removeCommande'],
  data () { 
    return {
      its:[
        {text: 'Afficher', class: 'fa fa-eye mr-2', onClick: this.showCommande},
        {text: 'Modifier', class: 'fa fa-pencil mr-2', onClick: this.editCommande},
        {text: 'Supprimer', class: 'fa fa-trash mr-2', onClick: this.removeCommande}
      ],
      choices:["kfgk","lkfl","csdlg"]
    }
  },
  mounted () {
    //
  },
  methods: {
  },
  components:{
    BtnDropDown,
  }
}
</script>

<style scoped>
  .commande-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 20px;   
    padding-right: 20px;   
    margin-right: 20px;  
    margin-bottom: 20px; 
    height: 222px;
    width: 222px;
    background-color: #e3ebf1e1; /*#A2A2A2;*/
    border: 0.5px solid rgb(153, 179, 224);
    border-radius: 4px; 
    cursor: pointer;
  }

  .commande-photo {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 1px;   
    padding-right: 1px;   
    margin-right: 1px;   
    height: 100px;
    width: 180px;
    background-color: #ffffffe1; /*#A2A2A2;*/
    border: 0.5px solid rgb(23, 25, 29);
    border-radius: 4px; 
    cursor: pointer;
  }

  .text-card {
    /* margin: 50px 0px 0px 20px; */
    color: black;
  }

  .commande-nom {
    font-weight: 300;
    font-size: 14px;    
    text-align: center;
  }

  .dot-card {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>