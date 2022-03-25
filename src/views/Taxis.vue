<template>
  <dashboard-layout title="Classes">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card rounded shadow mb-5">
            <div class="card-body">
              <h3 class="text-center mb-3">Liste des courses</h3>
              <div class="table-responsive">
                <table class="table rounded">
                  <thead>
                    <th>Départ</th>
                    <th>Date Départ</th>
                    <th>Arrivée</th>
                    <th>Date Arrivée</th>
                    <th>Client</th>
                    <th>Taxi</th>
                    <th>Montant</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="(course, i) in courses" :key="i">
                      <td>{{course.depart}}</td>
                      <td>{{course.dateDepart}}</td>
                      <td>{{course.arrivee}}</td>
                      <td>{{course.dateArrivee}}</td>
                      <td>{{course.client}}</td>
                      <td>{{course.taxi.lastname}}</td>
                      <td>{{course.montant}}</td>
                      <td class="text-right">
                        <button
                          type="button"
                          class="btn btn-warning btn-sm mr-2"
                          @click="editClasse(classe)"
                        >
                          <i class="fa fa-pencil"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="removeClasse(classe._id)"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
  name: "home",
  data() {
    return {
      courses: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const query = {
        options: {},
        page: 0,
        perPage: 100
      };

      this.$service.listAuth("courses", query, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        this.errorMessage = "";
        this.courses = data.courses;
      });
    }
  }
};
</script>