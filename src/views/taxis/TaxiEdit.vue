<template>
  <dashboard-layout title="ArticleEdit">
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
              <h3 class="text-left mb-5">Modifier le dossier</h3>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              <form @submit="edit">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="nom">Nom de la structure</label>
                      <input type="text" class="form-control" id="nom" 
                        v-model="editingDossier.nom_structure" placeholder="Le nom de la structure">
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="nom">Nom du dossier</label>
                      <input type="text" class="form-control" id="nom" 
                        v-model="editingDossier.nom_dossier" placeholder="Le nom du dossier">
                    </div>
                  </div>
                  
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="prix">Secteur d'activités</label>
                      <input type="text" class="form-control" id="secteur" 
                        v-model="editingDossier.secteur">
                    </div>
                  </div>
                  
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="type">Url</label>
                      <input type="text" class="form-control" id="url" 
                        v-model="editingDossier.url">
                    </div>
                  </div>
                  
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="type">Email</label>
                      <input type="mail" class="form-control" id="email" 
                        v-model="editingDossier.email">
                    </div>
                  </div>
                  
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="type">Telephone</label>
                      <input type="text" class="form-control" id="telephone" 
                        v-model="editingDossier.telephone">
                    </div>
                  </div>
                  
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="type">Maîtrise</label>
                      <select class="form-control" v-model="editingDossier.maitrise">
                        <option value="mediocre">Médiocre</option>
                        <option value="partielle">Partielle</option>
                        <option value="bonne">Bonne</option>
                        <option value="excellent">Excellent</option>                      
                      </select> 
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="type">Dossier recommandé ?</label>
                      <select class="form-control" v-model="editingDossier.recommandation">
                        <option value="oui">oui</option>
                        <option value="non">non</option>
                      </select> 
                    </div>
                  </div>
                 
                 
                  <div class="col-sm-6" v-for="(picture, i) in importFiles" :key="i">
                    <div class="form-group">                                            
                      <label for="photo">{{i == 0 ? 'Photo principale' : 'Photo ' + (i+1)}}</label>
                      <div :class="'custom-file' + (imageData[i] ? ' filled' : '')">
                        <div class="img-preview" :style="'background-image: url(' + imageData[i] + ')'"></div>
                        <input type="file" class="custom-file-input" :id="'customFile' + i" :ref="'file' + i" @change="handleFileUpload(i)">
                        <label class="custom-file-label" 
                          :for="'customFile' + i">{{ picture.name || 'Cliquer pour choisir une photo'}}</label>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="type">Pays</label>
                      <input type="text" class="form-control" id="pays" 
                        v-model="editingDossier.situation_geo.pays">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="type">Ville</label>
                      <input type="mail" class="form-control" id="email" 
                        v-model="editingDossier.situation_geo.ville">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="type">Rue</label>
                      <input type="text" class="form-control" id="telephone" 
                        v-model="editingDossier.situation_geo.rue">
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea rows="4" class="form-control" id="description"
                        v-model="editingDossier.description" placeholder="La description de votre dossier"></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3 ml-auto">
                    <div class="form-group">
                      <input type="submit" class="btn btn-primary btn-block" 
                       style="background-color:#181B29" value="Enregistrer">
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
    name: 'home', 
    data () {
      return {
        categories: [],
        editingId: '',
        errorMessage: '',
        importFiles: [],
        importLinks: [],
        imageData: [],
        fileNumber: 6,
        editingDossier: {
          nom_structure: '',
          nom_dossier: '',
          secteur : '',
          url: '',
          email: '',
          telephone:'',
          recommandation: '',
          description: '',
          situation_geo: {
            pays: '',
            ville: '',
            rue: '',
          },
          maitrise: '',
        }
      }
    },
    mounted() {
      for (var i = 0; i < this.fileNumber; i++) {
        this.importFiles.push({});
        this.importLinks.push('');
        this.imageData.push('');
      }
      this.init();
    }, 
    methods: {
      handleFileUpload (index) {
        this.importFiles[index] = this.$refs['file' + index][0].files[0];
        this.importLinks[index] = 'replaced';

        if (this.importFiles[index]) {
          const reader = new FileReader
          reader.onload = e => {
            this.imageData[index] = e.target.result;
            this.$forceUpdate();
          }
          reader.readAsDataURL(this.importFiles[index])
        }
        this.$forceUpdate();
      },
      init () {
        this.editingId = this.$route.query.dossierId;
        if (this.editingId) {
          this.$service.load('dossiers', this.editingId, (err, data) => {
            if (err) {
              this.errorMessage = err.data && err.data.message;
              console.log('Error', err.data);
              return;
            }

            if (data.dossier) {
              this.editingDossier = {
                nom_structure: data.dossier.nom_structure,
                nom_dossier: data.dossier.nom_dossier,
                secteur : data.dossier.secteur,
                url: data.dossier.url,
                email: data.dossier.email,
                telephone: data.dossier.telephone,
                recommandation: data.dossier.recommandation,
                description: data.dossier.description,
                situation_geo: {
                  pays:  data.dossier.situation_geo.pays,
                  ville:  data.dossier.situation_geo.ville,
                  rue:  data.dossier.situation_geo.rue,
                },
                maitrise: data.dossier.maitrise,
                pictures: data.dossier.pictures || []
              };

              for (var i = 0; i < this.editingDossier.pictures.length; i++) {
                this.imageData[i] = this.editingDossier.pictures[i];
                this.importLinks[i] = this.editingDossier.pictures[i];
              }
              this.$forceUpdate();
            }else{ console.log('pas de retour')}
          });
        }
      },
      edit (e) {
        e.preventDefault();
        const savingDossier = this.editingDossier;

        let formData = new FormData();

        formData.append('fileprop', 'pictures');
        formData.append('filenumber', this.fileNumber);
        formData.append('objectdata', JSON.stringify(savingDossier)); 
        formData.append('filelinks', JSON.stringify(this.importLinks)); 
    
        for (var i = 0; i < this.fileNumber; i++) {
          if (this.importFiles[i].name) {
            formData.append('filedata' + i, this.importFiles[i]);
          }
        }

        this.$service.updateWithFile('dossiers', this.editingId, formData, (err, data) => {
          if (err) {
            this.errorMessage = err.data && err.data.message;
            console.log('Error', err.data);
            return;
          }

          this.editingDossier = {
            nom_structure: '',
            nom_dossier: '',
            secteur : '',
            url: '',
            email: '',
            telephone:'',
            recommandation: '',
            description: '',
            situation_geo: {
              pays: '',
              ville: '',
              rue: '',
            },
            maitrise: '',
          };

          this.$router.push('/produits');
        });
      },
    }
  }
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
