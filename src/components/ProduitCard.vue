<template> 
  <div class="prod-card ju" @click="showProduit">
    <div class="  tac">
      <img class="prod-img" :src='produit.pictures[0]'>      
      <div class=" col-sm">
        <div class="">{{produit.nom}}</div>
        <div class="row flex-row justify-content-between">
          <div v-if="produit.reduc" class="barre ml-2">€{{produit.prix}}</div>
          <div v-if="produit.reduc" class="float-righ fwb mr-2" >€{{ getPrice(produit.prix, produit.reduc) }}</div>
          <div v-else class="fwb ml-2">€{{produit.prix}}</div>
        </div>
        <div class="rate-value">
          <rating :rate="produit.note" :total="5"/>
        </div>
        <span v-if="!admin" class=" mx-auto mt-1">
          <!-- ajout au panier -->
          <span v-if="!user" class="butPaniers cursor-p" @click.stop="addtobasket"> 
            <span class="texte-btn">Ajouter</span> <i class="fa fa-shopping-cart m-1"></i> 
          </span>

          <span v-else>
            <!-- ajout au favoris -->
            <span v-if="!favorispage" class=" float-left cursor-p tac butPanier " @click.stop="addtowishs"> 
              <span class="text-btn">Ajouter</span> <i class="fa fa-heart m-1"></i> 
            </span>
            <!-- retrait des favoris -->
            <span v-else class=" float-left cursor-p tac butPanier " @click.stop="removeFromWishs"> 
              <span class="text-btn">Retirer</span> <i class="fa fa-trash mr-1"></i> 
            </span>
            
            <span class=" float-right cursor-p tac butPanier " @click.stop="addtobasket"> 
              <span class="text-btn">Ajouter</span> <i class="fa fa-shopping-cart m-1"></i> 
            </span>
          </span>
        </span>
        <div v-if="admin" class="dot-card" @click.stop>
          <BtnDropDown icon="ellipsis-h" btnClass="btn btn-default btn-sm dot-card" :items="its"/>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import BtnDropDown from '@/components/BtnDropDown.vue';

export default {
  name: 'search',
  props: ['produit', 'showProduit', 'editProduit', 'removeProduit', 'favorispage','addtobasket'
  ,'addtowishs','removeFromWishs'],
  data () { 
    return {
      its:[
        {text: 'Afficher', class: 'fa fa-eye mr-2', onClick: this.showProduit},
        {text: 'Modifier', class: 'fa fa-pencil mr-2', onClick: this.editProduit},
        {text: 'Supprimer', class: 'fa fa-trash mr-2', onClick: this.removeProduit}
      ],
      admin: false,
      user: false,
      newprice: 0
    }
  },
  mounted () {
    // let inter = 0.0
    // inter = this.produit.prix*( (100-this.produit.reduc)/100)
    // this.newprice = inter.toFixed(1); //console.log('gjdf')

    if(localStorage.getItem('token')){
      if(localStorage.getItem('adminRole') === "user"){
        this.user = true
        this.admin = false
      }
      if(localStorage.getItem('adminRole') === "admin"){
        this.user = false
        this.admin = true
      }
    }
  },
  methods: {
    getPrice(prix, reduc){
      let inter = 0.0
      inter = prix*( (100-reduc)/100)
      return inter.toFixed(1);
    }
  },
  components:{
    BtnDropDown,
  }
}
</script>

<style lang="scss" scoped>
 
  .text-btn {
    font-size: 12px;
    margin-left: 4px;
  }

  .prod-card {
    width: 300px;
    height: auto;
    background-color: #fefefe;
    border-radius: 8px;
    // box-shadow: 0 0 7px 3px rgba(75,75,75,0.4);
    margin: 12px;
    padding: 2px;
  }

  .prod-card:hover, .prod-card:focus {
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
   
   .prod-img {
     max-width: 290px;
     height: 160px;
     border-radius: 6px;
   }

  .dot-card {
    position: absolute;
    top: -154px;
    right: 6px;
  }
  
  @media screen and (min-width:180px) and (max-width:750px) and (max-width:1100px){
    .texte-btn {
      display: none;
    }
    .butPaniers{ width: 25%;}
    .butFavoris{ width: 25%;}
    // .produit-card { width: 100%};


    .fwn{
      font-size: 12px;
    }
  }

  $blue: #098fb8;

  .marl{
    margin-left: auto;
  }

</style>