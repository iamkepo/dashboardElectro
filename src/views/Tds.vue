<template>
  <dashboard-layout title="Sas">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12" v-if="!creating && !editing">
          <div class="card rounded shadow mb-5">
            <div class="card-body">
              <div class="row my-4">
                <div class="col-sm-4">
                  <h6>Classe</h6>
                  <v-select :options="classes" :clearable="false" :reduce="item => item.code" v-on:input="init"
                    class="form-control-select" v-model="currentClasse" required></v-select>
                </div>
                <div class="col-sm-4">
                  <h6>Matiere</h6>
                  <v-select :options="currentMatieres" :clearable="false" :reduce="item => item.code" v-on:input="init"
                    class="form-control-select" v-model="currentMatiere" required></v-select>
                </div>
                <div class="col-sm-4" v-show="currentSas.length > 0">
                  <h6>SA</h6>
                  <v-select :options="currentSas" :clearable="false" :reduce="item => item.code" v-on:input="init"
                    class="form-control-select" v-model="currentSa" required></v-select>
                </div>
              </div>
              <hr/>
              <h3 class="text-center mb-3">Liste des TDs</h3>
              <div class="text-right py-3">
                <button type="button" class="btn btn-primary btn-sm px-4" @click="creating=true">Ajouter</button>
              </div>
              <div class="table-responsive">
                <table class="table rounded">
                  <thead>
                    <th>Libelé</th><th>Professeur</th><th>Vidéo</th><th class="mw-tool"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(td, i) in tds" :key="i">
                      <td>{{td.libele}}</td>
                      <td>{{td.professeur}}</td>
                      <td>{{td.video && td.video.length > 0 ? 'Oui' : 'Non'}}</td>
                      <td class="text-right">
                        <button type="button" class="btn btn-info btn-sm mr-2" 
                          @click="showExo(td._id)">Voir Exercices</button>
                        <button type="button" class="btn btn-warning btn-sm mr-2" 
                          @click="editTd(td)"><i class="fa fa-pencil"></i></button>
                        <button type="button" class="btn btn-danger btn-sm" 
                          @click="removeTd(td._id)"><i class="fa fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-5 mx-auto" v-if="creating">
          <div class="card rounded shadow">
            <div class="card-body">
              <div class="text-left c-pointer mb-2" @click="creating=false">
                <i class="fa fa-arrow-left mr-1"></i> Retour</div>
              <hr/>
              <h3 class="text-center">Ajouter un TD</h3>
              <hr>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="create">
                <div class="form-group">
                  <label for="categorie">SA</label>
                  <v-select :options="currentSas" :reduce="item => item.code"  :clearable="false"
                    class="form-control-select" v-model="newTd.sa" required></v-select>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newTd.libele" required placeholder="Libelé">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newTd.professeur" required placeholder="Professeur">
                </div>

                <div class="form-group">                                            
                  <label for="icon">Video</label>
                  <div :class="'custom-file' + (videoFile ? ' filled' : '')">
                    <input type="file" class="custom-file-input" id="customIcon" ref="video" @change="handleFileUpload">
                    <label class="custom-file-label" for="customIcon">{{importFile.name || 'Choisissez une video'}}
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <input type="submit" class="btn btn-primary btn-achat-rapide btn-block"
                  style="background-color:#181B29" value="Ajouter">
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-5 mx-auto" v-if="editing">
          <div class="card rounded shadow">
            <div class="card-body">
              <div class="text-left c-pointer mb-2" @click="editing=false">
                <i class="fa fa-arrow-left mr-1"></i> Retour</div>
              <hr/>
              <h3 class="text-center">Modifier un TD</h3>
              <hr>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="update">
                <div class="form-group">
                  <label for="categorie">SA</label>
                  <v-select :options="sas" :reduce="item => item.code" :clearable="false" 
                    class="form-control-select" v-model="editingTd.sa" required></v-select>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="editingTd.libele" required placeholder="Libele">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="editingTd.professeur" required placeholder="Professeur">
                </div>
                <div class="form-group">                                            
                  <label for="icon">Video</label>
                  <div :class="'custom-file' + (videoFile ? ' filled' : '')">
                    <input type="file" class="custom-file-input" id="customIcon" ref="video" @change="handleFileUpload">
                    <label class="custom-file-label" for="customIcon">{{importFile.name || 'Choisissez une video'}}
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <input type="submit" class="btn btn-primary btn-achat-rapide btn-block"
                  style="background-color:#181B29" value="Mettre à jour">
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
    name: 'home', 
    data () {
      return {
        tds: [],
        sas: [],
        matieres: [],
        classes: [],
        currentSa: '',
        currentClasse: '',
        currentMatiere: '',
        videoFile: '',
        importFile: {},
        creating: false,
        editing: false,
        errorMessage: '',
        newTd: {
          libele: '',
          sa: '',
          professeur: '',
        },
        editingTd: {
          libele: '',
          sa: '',
          professeur: '',
          video: ''
        },
        editingId: '',
        saId: ''
      }
    },
    computed: {
      currentSas () {
        const sas = this.sas.filter(sa => {
          return this.currentMatiere == sa.matiere
        });

        if (sas.length > 0 && !sas.find(s => s.code == this.currentSa)) {
          this.currentSa = sas[0].code;
          this.init();
        }

        return sas;
      },
      currentMatieres () {
        const mats = this.matieres.filter(mat => {
          return this.currentClasse == mat.classe
        });

        if (mats.length > 0 && !mats.find(m => m.code == this.currentMatiere)) {
          this.currentMatiere = mats[0].code;
          this.init();
        }

        return mats;
      }
    },
    mounted() {
      this.currentSa = this.$route.query.sa;
      this.currentMatiere = this.$route.query.matiere;
      this.currentClasse = this.$route.query.classe;

      this.init();
      this.getSas(() => {
        this.getMatieres(() => {
          this.getClasses();
        });
      });
      
      
    },
    methods: {
      handleFileUpload () {
        this.importFile = this.$refs.video.files[0];
      },
      init () {
        const query = {
          options: {
            sa: this.currentSa
          },
          page: 0,
          perPage: 100
        };

        this.$service.list('tds', query, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          
          this.errorMessage = '';
          this.tds = data.tds;
        })
      },
      getSas(callback){
        const query = {
          options: {
          },
          page: 0,
          perPage: 100
        };

        this.$service.list('sas', query, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          this.errorMessage = '';
          this.sas = data.sas.map(sa => {return { label: sa.libele, matiere: sa.matiere._id, code: sa._id }});

          if (callback) {
            callback();
          }
        })
      },
      getMatieres(callback) {
        const query = {
          options: {
          },
          page: 0,
          perPage: 100
        };

        this.$service.list('matieres', query, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          this.errorMessage = '';
          this.matieres = data.matieres.map(mat => {
            return { 
              label: mat.libele, 
              code: mat._id, 
              classe: mat.classe._id 
            }
          }); 

          if (this.currentSa) {
            const curSa = this.sas.find(sa => this.currentSa == sa.code);
            this.currentMatiere = this.matieres.find(mat => curSa.matiere == mat.code).code;
          }


          if (callback) {
            callback();
          }
        })
      },
      getClasses(){
        const query = {
          options: {
          },
          page: 0,
          perPage: 100
        };
        
        this.$service.list('classes', query, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          this.errorMessage = '';
          this.classes = data.classes.map(cla => {return { label: cla.libele, code: cla._id }});
          if (this.currentMatiere) {
            const curMat = this.matieres.find(mat => this.currentMatiere == mat.code);
            this.currentClasse = this.classes.find(classe => curMat.classe == classe.code).code;
          }
        })
      },
      create (e) {
        e.preventDefault();    
        let formData = new FormData();
        formData.append('filemode', 'single');
        formData.append('filetype', 'video');
        formData.append('fileprop', 'video');
        formData.append('filenumber', 1);
        formData.append('objectdata', JSON.stringify(this.newTd)); 
    
        if (this.importFile.name) {
          formData.append('filedata0', this.importFile);
        }
        
        this.$service.createWithFile('tds' , formData, (err, data) => {
          console.log(err, data);
          if (err) {
            console.log('erreur oooh')
            this.errorMessage = err.data && err.data.message;
            console.log('Error', err.data);
            return;
          }
          
          this.newTd = {
            libele: '',
            sa: '',
            professeur: '',
            video: ''
          };

          this.editingId = '';
          this.importFile = {};
          this.creating = false;
          this.editing = false;
          this.init();
        });
      },
      editTd(td) {
        this.editingId = td._id;
        this.editingTd.libele = td.libele;
        this.editingTd.professeur = td.professeur;
        this.editingTd.video = td.video;
        this.editingTd.sa = td.sa._id;
        this.creating = false;
        this.editing = true;
      },
      update (e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('filemode', 'single');
        formData.append('filetype', 'video');
        formData.append('fileprop', 'video');
        formData.append('filenumber', 1);
        formData.append('filelinks', JSON.stringify([this.editingTd.video])); 
        formData.append('objectdata', JSON.stringify(this.editingTd)); 
    
        if (this.importFile.name) {
          formData.append('filedata0', this.importFile);
        }
        
        this.$service.updateWithFile('tds', this.editingId, formData, (err, data) => {
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log('Error', err.data);
            return;
          }

          this.editingTd = {
            libele: '',
            sa: '',
            professeur: '',
            video: ''
          };

          this.editingId = '';

          this.creating = false;
          this.editing = false;
          this.init();
        });
      },
      removeTd (id) {
        this.$swal.fire({
          title: 'Voulez vous vraiment supprimer?',
          text: "Vous ne pouvez recuperer ses données!",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#3085d6',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Oui, supprimer!'
        }).then((result) => {
          if (result.value) {
            this.$service.remove('tds', id, (err, data) => {
              if (err) {
                this.errorMessage = err.data && err.data.message;
                console.log('Error', err.data);
                return;
              }

              this.$swal.fire(
                'Suppression réussie',
                'La suppression s\'est effectuée avec succès',
                'success'
              ).then(() => {
                this.init();
              });
            });
          }
        })
        
      },
      showExo(id) {
        this.$router.push('/exercices?td=' + id);
      }
    }
  }
</script>