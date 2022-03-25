<template>
  <dashboard-layout title="Tableau de board">
    <div class="container-fluid">
      <div class="d-flex justify-content-between px-4 align-items-end">
        <div class="">
          <div class="card card-body" v-if="!allDate">
            <h6>Date de début</h6>
            <datepicker
              @selected="onDateStartChanged"
              :monday-first="true"
              :language="fr" 
              v-model="startDate"
              input-class="form-control form-control-sm"></datepicker>
          </div>
        </div>
        <div class="">
          <div class="card card-body">
            <label class="mb-0">
              <input type="checkbox" class="form-control-check" v-model="allDate" @change="init"/>
              Toutes les statistiques
            </label>
          </div>
        </div>
        <div class="">
          <div class="card card-body" v-if="!allDate">
            <h6>Date de fin</h6>
            <datepicker 
              @selected="onDateEndChanged"
              :monday-first="true"
              :language="fr" 
              v-model="endDate"
              input-class="form-control form-control-sm"></datepicker>
          </div>
        </div>
      </div>
      <hr class="my-4">
      <div class="d-flex py-4 flex-wrap">
        <stat-card :link="stat.link"
          :label="stat.label" :icon="stat.icon" :stat="stat.value" 
          v-for="(stat, i) in stats" :key="i"/>
      </div>
    </div>
  </dashboard-layout>
</template>

<script>
  import homeStats from '../data/stats';
  import Datepicker from 'vuejs-datepicker';
  import {fr} from 'vuejs-datepicker/dist/locale';
  import moment from 'moment';

  export default {
    name: 'home',
    data () {
      return {
        fr: fr,
        allDate: false,
        stats: this.$store.getters.adminLevel && 
          homeStats[this.$store.getters.adminLevel] ? 
          homeStats[this.$store.getters.adminLevel] : [],
        startDate: moment().startOf('month').toDate(),
        endDate: new Date()
      }
    },
    mounted () {
      this.init();
    },
    components: {
      Datepicker
    },
    methods: {
      init () {
        this.stats.forEach(stat => {
          for (var p in stat.options) {
            if (stat.options[p].includes('$currentProject')) {
              if (this.$store.getters.adminLevel == 'dp') {
                stat.options[p] = stat.options[p].replace('$currentProject', this.$store.getters.currentDPProjectId);
              } else if (this.$store.getters.adminLevel == 'cpmel') {
                stat.options[p] = stat.options[p].replace('$currentProject', this.$store.getters.currentCPMELProjectId);
              }
            }
          }
  
          let params = {
            ...stat.options
          };

          if (!this.allDate) {
            params[stat.filterKey] = {
              $gte: this.startDate,
              $lte: this.endDate
            };
          }

          this.$service.count(stat.key, params, (err, data) => {
            if (err || !data) {
              return;
            }
  
            stat.value = data[stat.key];
          });
        });
      }, 
      onDateStartChanged (date) {
        this.startDate = date;
        this.init();
      }, 
      onDateEndChanged (date) {
        this.endDate = date;
        this.init();
      }
    }
  }
</script>