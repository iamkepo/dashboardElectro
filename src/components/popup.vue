<template>
  <div>
    <form @submit="log" class="form-container" >
      <h3 v-if="connexion" class="mx-auto">Connectez vous</h3>
      <h3 v-else class="justify-center">Inscrivez vous</h3>
      <h4 class="text-danger">{{errorMessage}}</h4>
      <div v-if="!connexion" >
        <input type="text" v-model="firstname" required placeholder="Votre nom">
      </div>
      <div v-if="!connexion" >
        <input type="text" v-model="lastname" required placeholder="Votre Prénom">
      </div>
      <div >
        <input type="email" class="" v-model="user.email" required placeholder="Votre email">
      </div>
      <div>
        <input type="password" class="" v-model="user.password" required placeholder="*****">
      </div>
      <div>
        <input type="submit" class="" :value="connexion? 'Se connecter':'S\'inscrire' ">
      </div>
    </form>
    <div v-if="connexion" class="mt-2">
      <span class="text-dark btn" @click="connexion = !connexion">Pas de compte ? Inscription</span>
    </div>
    <div v-else>
      <span class="text-dark btn mt-2" @click="connexion = !connexion">Deja un compte ? Connexion</span>
    </div>
  </div>
</template>

<script>
export default {
  
  data(){
    return {
      user: {        
        email: '',
        password: '',
      },
      user1: {        
        email: '',
        password: '',
      },
      firstname: '',
      lastname: '',
      errorMessage: '',
      connexion: true,
      connected: false,
      isAdmin: false,
      isUser: false,
    }
  },
  mounted() {
      if(localStorage.getItem('token')){
        this.connected = true
      }else{
        this.connected = false
      }
    },
  methods: {
    log(e){
      if(this.connexion){
        this.login(e);
      }else{
        this.register(e);
      }
    },
    login (e) {
      e.preventDefault();
      console.log('User :', this.user);
      this.$service.login(this.user, (err, data) => {
        if (err) { this.errorMessage = err.data && err.data.message;  return;  }   
        this.errorMessage = '';
        console.log('Login success :', data);
        this.user.email = this.user.password =  '';
        localStorage.setItem('token',data.token);
        localStorage.setItem('adminId',data.admin.id);
        localStorage.setItem('adminInfo', JSON.stringify(data.admin));
        localStorage.setItem('adminRole', data.admin.role);
        localStorage.setItem('firstname', data.admin.firstname);
        localStorage.setItem('lastname', data.admin.lastname);
        this.$store.commit('getAdminInfo');  
        
        this.$router.push({ path: '/about' });
      });
    },
    logout() {
      this.$store.commit('resetAdminInfo');
      localStorage.removeItem('adminId');
      localStorage.removeItem('adminInfo');
      localStorage.removeItem('token');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      this.$router.push({ path: '/about' });
    },
    register(e){
      e.preventDefault();
      this.user.firstname = this.firstname;
      this.user.lastname = this.lastname;
      this.user.role = 'user';
      console.log('User :', this.user);
      //création du nouveau compte client
      this.$service.createAdmin(this.user, (err, data) => {
        if (err) { this.errorMessage = err.data && err.data.message;  return;  }   
        this.errorMessage = '';
        console.log('register ok ', data);
        //login du nouveau compte client 
        this.user1.email = this.user.email;
        this.user1.password = this.user.password;
        this.$service.login(this.user1, (err, data) => {
          if (err) { this.errorMessage = err.data && err.data.message;  return;  }   
          this.errorMessage = '';
          console.log('login ok :', data);
          this.user.email = this.user.password = this.user.firstname = this.user.lastname = '';
          localStorage.setItem('token',data.token);
          localStorage.setItem('adminId',data.admin.id);
          localStorage.setItem('adminInfo', JSON.stringify(data.admin));
          localStorage.setItem('adminRole', data.admin.role);
          this.$store.commit('getAdminInfo');  
          this.$router.push({ path: '/about' });
        }); 
      });
    },
  }
}
</script>

<style scoped>
.form-container {
	padding: 10px;
	background-color: #ffffff;
	text-align: center;
	border-radius : 10px ;
}

.form-container input {
  width: 80%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  border-radius : 10px ;
}

.form-container input:focus {
  background-color: #ddd;
  outline: none;
}

.form-container input[type=submit] {
	background-color: #f7910b;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 80%;
  margin-bottom:10px;
  opacity: 0.8;
  border-radius : 10px ;
}

.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}

.bgc {
    background-color: #bbbbbb;
  }
.butLogOut{
    width: auto;
    margin: -25px 170px 20px 0px;
    background-color: #f7910b;
  }
</style>