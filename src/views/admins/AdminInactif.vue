<template>
  <dashboard-layout title="Administrateurs">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card rounded shadow">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-4">
                <h3 class="text-left mb-3">Liste des administrateurs inactifs</h3>
                <div>
                  <router-link to="/admins/create" class="btn btn-achat-rapide pt-2">Ajouter un admin</router-link>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <div class="form-group d-flex align-items-center">
                  <input class="form-control pr-4" @keyup.enter="init(0, true)" type="search" placeholder="Rechercher un admin" v-model="searchtext"/>
                  <i class="fa fa-search" style="margin-left: -20px" @click="init(0, true)"></i>
                </div>
                <select class="form-control w-auto d-inline-block mx-2" 
                  v-model="searchtype" @change="init(0, true)">
                  <option value="email">Email</option>
                  <option value="lastname+firstname">Nom et prénoms</option>
                  <option value="role">Role</option>
                </select>  
              </div>
              <div class="table-responsive">
                <div class="p-5" v-if="isLoading">
                  <fulfilling-bouncing-circle-spinner
                    class="mx-auto"
                    :animation-duration="2000"
                    :size="60"
                    :color="'#045480'"
                    />
                </div>
                <div v-else>
                  <div class="d-flex mb-4 px-3 justify-content-between align-items-center">
                    <div>Affichage de 
                      <select class="form-control w-auto d-inline-block mx-2" 
                        v-model="perPage" @change="init(0, true)">
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>  
                      sur <strong>{{total}}</strong> Admins inactifs
                    </div>
                    <div>
                      Page <strong>{{curPage}}</strong> sur <strong>{{Math.ceil(total / perPage)}}</strong>
                    </div>

                  </div>
                  <div v-if="total > 0">
                    <table class="table rounded">
                      <thead>
                        <th>N°</th>
                        <th :class="'th-sortable' + getSortClass('email') " @click="sortBy('email')">Email</th>
                        <th :class="'th-sortable' + getSortClass('lastname')" @click="sortBy('lastname')">Nom &amp; prénom(s)</th>
                        <th :class="'th-sortable' + getSortClass('role')" @click="sortBy('role')">Role</th>
                        <th></th>
                      </thead>
                      <tbody>
                        <tr v-for="(admin, i) in admins" :key="i">
                          <td>{{((curPage - 1) * perPage) + i + 1}}</td>
                          <td>{{admin.email}}</td>
                          <td>{{admin.lastname}} {{admin.firstname}}</td>
                          <td>{{admin.role.toUpperCase().replace('-', ' ')}}</td>
                          <td class="text-right">
                            <button type="button" @click="showAdmin(admin._id)" class="btn btn-primary btn-sm mr-2" 
                              ><i class="fa fa-eye"></i></button>
                            <btn-dropdown btnClass="btn btn-secondary btn-sm" icon="ellipsis-h"
                              :items="[ 
                                { text: 'Désactiver l\'admin', onClick: () => {reactivateAdmin(admin._id)}}
                              ]"/>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="text-center">
                      <paginate 
                        v-model="curPage"
                        :page-count="Math.ceil(total / perPage)"
                        :page-range="3"
                        :margin-pages="2"
                        :click-handler="init"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :prev-class="'btn btn-primary'"
                        :next-class="'btn btn-primary'"
                        :container-class="'pagination justify-content-center align-items-center'"
                        :page-class="'page-item'">
                      </paginate>
                    </div>
                  </div>
                  <div v-else>
                    <h4 class="text-center my-2">Aucun résultat trouvé !</h4>
                  </div>
                </div>
              </div>
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
      admins: [],
      errorMessage: '',
      searchtext: '',
      searchtype: 'email',
      isLoading: false,
      curPage: 1,
      total: 0,
      perPage: 15,
      sort: {
        email: 0,
        lastname: 0,
        username: 0,
      }
    }
  },
  mounted() {
    this.init();
  }, 
  methods: {
    init (page, resetParams) {
      if (resetParams) {
        this.curPage = 1;
      }

      let query = {
        options: {
          status: 'inactive'
        },
        filter: {
          text: this.searchtext,
          type: this.searchtype.split('+')
        },
        sort: this.sort,
        page: this.curPage - 1,
        perPage: this.perPage
      };
      this.isLoading = true;
      this.$service.list('admins', query, (err, data) => {
        this.isLoading = false;
        if (err) {
          console.log(err);
          return;
        }
        this.total = data.total;
        this.admins = data.admins;
      })
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
        return ' desc';
      } else if (this.sort[prop] == 0) {
        return '';
      } else if (this.sort[prop] == 1) {
        return ' asc';
      }
    },
    showAdmin (id) {
      this.$router.push({name: 'admins-detail', query: {adminId: id}});
    },
    activateAdmin (id) {
      this.$confirmAction(
        'Vous confirmer cette action?', 
        'Vous voulez réactiver ce admin', 
        'Oui, nommer', 
        '#045480'
        ).then((result) => {
          if (result.value) {
            this.$service.update('admins', id, {status: 'active'}, (err, data) => {
              if (err) {
                this.errorMessage = err.data && err.data.message;
                console.log('Error', err.data);
                return;
              }
  
              this.$win().then(() => {
                this.init();
              });
            });
          }
        });
    },
    removeAdmin (id) {
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
          this.$service.remove('admins', id, (err, data) => {
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
      
    }
  }

}
</script>
