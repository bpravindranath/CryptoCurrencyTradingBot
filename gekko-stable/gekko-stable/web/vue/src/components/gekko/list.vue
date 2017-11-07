<template lang='jade'>
  .contain.py2
    //- .text(v-html='text')
    h2.col-4.center Start A New Live Gekko
    div.button_center
       router-link.router-link(to='/live-gekkos/new') 
           button.button_color Start!
    hr
    div.button_center
       h3 Market watchers
    div.sub-header-text
       .text(v-if='!watchers.length')
          p You are currently not watching any markets.
    table.full.clickable(v-if='watchers.length')
      thead
        tr
          th exchange
          th currency
          th asset
          th started at
          th last update
          th duration
      tbody
        tr.clickable(v-for='gekko in watchers', v-on:click='$router.push({path: `live-gekkos/watcher/${gekko.id}`})')
          td {{ gekko.watch.exchange }}
          td {{ gekko.watch.currency }}
          td {{ gekko.watch.asset }}
          td 
            template(v-if='gekko.firstCandle') {{ fmt(gekko.firstCandle.start) }}
          td
            template(v-if='gekko.lastCandle') {{ fmt(gekko.lastCandle.start) }}
          td
            template(v-if='gekko.firstCandle && gekko.lastCandle') {{ timespan(gekko.lastCandle.start, gekko.firstCandle.start) }}
    hr
    div.button_center
      h3 Strat runners
    div.sub-header-text
      .text(v-if='!stratrunners.length')
        p You are currently not running any strategies.
    table.full(v-if='stratrunners.length')
      thead
        tr
          th exchange
          th currency
          th asset
          th last update
          th duration
          th strategy
          th profit
      tbody
        tr.clickable(v-for='gekko in stratrunners', v-on:click='$router.push({path: `live-gekkos/stratrunner/${gekko.id}`})')
          td {{ gekko.watch.exchange }}
          td {{ gekko.watch.currency }}
          td {{ gekko.watch.asset }}
          td
            template(v-if='gekko.lastCandle') {{ fmt(gekko.lastCandle.start) }}
          td
            template(v-if='gekko.firstCandle && gekko.lastCandle') {{ timespan(gekko.lastCandle.start, gekko.firstCandle.start) }}
          td {{ gekko.strat.name }}
          td
            template(v-if='!gekko.report') 0
            template(v-if='gekko.report') {{ round(gekko.report.profit) }} {{ gekko.watch.currency }}
    hr
    
</template>

<script>

import marked from '../../tools/marked'
// global moment
// global humanizeDuration

// const text = marked(`

// ## Live Gekko

// Run your strategy against the live market!

// `);

export default {
  data: () => {
    return {
      text
    }
  },
  created: function() {
    this.timer = setInterval(() => {
      this.now = moment();
    }, 1000)
  },
  destroyed: function() {
    clearTimeout(this.timer);
  },
  data: () => {
    return {
      text,
      timer: false,
      now: moment()
    }
  },
  computed: {
    stratrunners: function() {
      return this.$store.state.stratrunners
    },
    watchers: function() {
      return this.$store.state.watchers
    }
  },
  methods: {
    humanizeDuration: (n) => window.humanizeDuration(n),
    moment: mom => moment.utc(mom),
    fmt: mom => moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    round: n => (+n).toFixed(3),
    timespan: function(a, b) {
      return this.humanizeDuration(this.moment(a).diff(this.moment(b)))
    }
  }
}
</script>

<style>

.center_content{
  justify-content: center;
}

.sub-header-text{
  margin-left: 33%;
 
}

.button_center{
  text-align: center; 
}
.button_color{
  background-color: #212C38;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border: 1px solid white;
}

.button_color:hover{
  background-color:#e5e500;
  color: black;
}

.router-link{
  color: white;
}
hr.style{
  margin: 0% 50%;
}
table.clickable {
  border-collapse: separate;
}

tr.clickable td:nth-child(1) {
  padding-left: 5px;
}

tr.clickable {
  cursor: pointer;
}
tr.clickable:hover {
  background: rgba(216,216,216,.99);
}
</style>
