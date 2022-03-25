<template>
  <div class="stat">
    <div class="stat-icon">
      <i :class="'fa fa-' + icon"></i>
    </div>
    <div class="stat-body">
      <div class="stat-label">
        {{label}}
      </div>
      <div :class="'stat-content ' + getStatClass(stat)">
        {{stat | prettyNumber}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: ['label', 'icon', 'stat'],
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
    }
  }
}
</script>

<style scoped>
  .stat {
    display: flex;
    justify-content: space-between;
    width: 220px; 
    margin: 20px 15px;
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(130,130,130,0.45), 
                0 0 7px rgba(13,13,13,0.245);
  }

  .stat-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-top: -25px;
    width: 70px;
    height: 70px;
    background-color: #fac316;
    color: #fff;
    font-size: 30px; 
  }

  .stat-label {
    font-size: 16px;
    text-align: right;
    margin-bottom: 15px;
    color: #6d6d6d;
  }

  .stat-content {
    text-align: right;
    font-weight: 600;
  }

  .stat-content.stat-sm {
    font-size: 45px;  
  }
  
  .stat-content.stat-md {
    font-size: 40px;  
  }
  
  .stat-content.stat-lg {
    font-size: 30px;  
  }

  .stat-content.stat-xl {
    font-size: 25px;  
  }
</style>