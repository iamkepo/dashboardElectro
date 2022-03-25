<template> 
  <div class="container-fluid"> 
    <!-- tableau -->
      <div class="row">
        <!-- recherche -->
        <div class="position-relative input-container" >
          <i class="position-absolute fa fa-search icon fa-lg search-table-icon "></i>
          <input class="search-table-input" type="text" v-model="key" placeholder="Rechercher " name="search" > 
        </div>  
        <!-- filtre -->
        <div class="row tri-table">
          <label for="ch" class="label-tri-table"><b>Filtrer par</b></label>
          <select class="filtre-select" id="ch" v-model="choix" >
            <option v-for="(item, index) in choices" :key="index">{{item}}</option>
          </select> 
        </div>
        <!-- boutons -->
        <div class="float-right">
          <button type="button" class="btn btn-success archive-table"><li class="fa fa-archive icon"></li></button>
          <button type="button" class="btn btn-danger delete-table"><li class="fa fa-trash icon"></li></button>
          <button type="button" class="btn btn-primary add-table">Ajouter nouveau professeur</button>
        </div>
      </div>
      <!-- tableau -->
      <div class="row ">
        <table class="table thetable">
          <thead class="thead-light">
            <tr>
              <th scope="col"><center> #</center></th>
              <th scope="col"> <center> Profil</center></th>
              <th scope="col">Nom</th>
              <th scope="col">Prenoms</th>
              <th scope="col">Inscription</th>
              <th scope="col">Scolarité</th>
              <th scope="col"> <center> Discipline</center></th>
              <th scope="col"><center> Actions</center></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in 5" :key="index">
              <th scope="row"><center class="marg"> 1</center></th>
              <td >
                <center class="marg"> 
                  <div class="table-picture">h</div>
                </center>
              </td>
              <td >
                <center class="marg">
                  <b>DUCASH</b>
                </center>
              </td>
              <td >
                <center class="marg">
                  <b>Lucas</b>
                </center>
              </td>
              <td>
                <div class="green-badge"></div>
              </td>
              <td>
                <div class="green-badge"></div>  <div class="red-badge"></div>  <div class="red-badge"></div>
              </td>
              <td>
                <center >
                  <button class="btn btn-default"> <div class="fa fa-eye icon"></div> </button>
                </center>
              </td>
              <td >
                <center >
                  <BtnDropDown icon="ellipsis-h" btnClass="btn btn-default dot " :items="its"/>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- pagination -->
        <div class="text-center float-right">
          <paginate 
            v-model="curPage"
            :page-count="4"
            :page-range="4"
            :margin-pages="1"
            :click-handler="init"
            :prev-text="''"
            :next-text="''"
            :prev-class="'btn btn-default fa fa-chevron-left icon fa-lg pagi'"
            :next-class="'btn btn-default fa fa-chevron-right icon fa-lg pagi'"
            :container-class="'pagination justify-content-center align-items-center'"
            :page-class="'page-item'">
          </paginate>
        </div>
      </div>
  </div>
</template>

<script>
import BtnDropDown from '@/components/BtnDropDown.vue';

export default {
  name: 'search',
  props: ['hold'],
  data () { 
    return {
      its:[
        {text: 'Afficher',class: 'fa fa-eye fa-lg'},
        {text: 'Modifier',class: 'fa fa-pencil fa-lg'},
        {text: 'Supprimer',class: 'fa fa-trash fa-lg'}
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
  .test{
    size: 30px;
  }
</style>