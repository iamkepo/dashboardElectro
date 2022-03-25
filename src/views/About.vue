<template>
  <div >
    <h1>This is an about page</h1> <br>
    <input type="submit" class="btn btn-ajt" :value="msg" >
    <button class="btn-sup">
      <i class="fa fa-trash"></i>      
    </button>
    <button class="btn-archive">
      <i class="fa fa-archive"></i>
    </button>
    <button class="">
      ...
    </button>
    <!--span-- class="btn btn-archive fa fa-archive"></!--span-->
  </div>
</template>

<script>

export default {
  name: 'about',
  data () {
    return {
      msg: "Ajouter un professeur"
    }  
  }
  /*components: {
    Button
  }*/
}
</script>


<style scoped>
  .btn-ajt {
    background: #0F70B7 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 6px #0000000D;
    border: 0.5px solid #CACED5;
    border-radius: 6px;
    opacity: 1;
    width: 200px;
    height: 50px;
    color: white
  }

  .btn-sup {
    background: #E73C1E 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 6px #0000000D;
    border: 0.5px solid #CACED5;
    border-radius: 6px;
    opacity: 1;
    width: 55px;
    height: 50px;
    color: white
  }

  .btn-archive {    
    background: #3D9940 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 6px #0000000D;
    border: 0.5px solid #CACED5;
    border-radius: 6px;
    opacity: 1;
    width: 55px;
    height: 50px;
    color: white
  }
</style>
