<template>
  <div class="cbtn-dropdown d-inline-block" v-on-clickaway="away">
    <button type="button" :class="btnClass" @click="toggle">
      <span>{{label}}</span>
      <i :class="'fa fa-' + icon"></i>
    </button>
    <div class="cbtn-dropdown-body">
      <div :class="'shadow dropdown-menu dropdown-menu-right' + (opened ? ' show':'')">
        <div class="dropdown-item" v-for="(item, i) in items" :key="i" @click="onClick(item)"> 
           <div :class="item.class"></div> &nbsp; &nbsp; {{item.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'BtnDropDown',
  mixins: [ clickaway ],
  props: ['label', 'icon', 'btnClass', 'items'],
  data () {
    return {
      opened: false
    }
  },
  mounted () {
    //
  },
  methods: {
    getStatClass (stat) {
      if (stat.length <= 3) {
        return 'stat-sm';
      } else if (stat.length <= 5) {
        return 'stat-md';
      } else if (stat.length <= 6) {
        return 'stat-lg';
      } else {
        return 'stat-xl';
      }
    },
    toggle () {
      this.opened = !this.opened;
    },
    away () {
      this.opened = false;
    },
    onClick(item) {
      item.onClick && item.onClick();
    }
  }
}
</script>

<style scoped>
  .cbtn-dropdown-body {
    position: relative;
  }

  .dropdown-item {
    cursor: pointer;
    font-weight: 300;
    padding: 10px 25px;
  }
</style>