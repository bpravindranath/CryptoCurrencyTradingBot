<template lang='jade'>
div
  h3.center Select a Dataset
  .txt--center.my2(v-if='datasetScanstate === "idle"')
    a.w100--s.btn--yellow.scan-btn(href='#', v-on:click.prevent='scan') Scan Available Data
  .txt--center.my2(v-if='datasetScanstate === "scanning"')
    spinner
  .my2.center(v-if='datasetScanstate === "scanned"')

    div(v-if='datasets.length != 0')
      table.full
        thead
          tr
            th 
            th exchange
            th currency
            th asset
            th from
            th to
            th duration
        tbody
          tr(v-for='(set, i) in datasets')
            td.radio
              input(type='radio', name='dataset', :value='i', v-model='setIndex', v-bind:id='set.id')
            td 
              label(v-bind:for='set.id') {{ set.exchange }}
            td 
              label(v-bind:for='set.id') {{ set.currency }}
            td
              label(v-bind:for='set.id') {{ set.asset }}
            td 
              label(v-bind:for='set.id') {{ fmt(set.from) }}
            td 
              label(v-bind:for='set.id') {{ fmt(set.to) }}
            td
              label(v-bind:for='set.id') {{ humanizeDuration(set.to.diff(set.from)) }}
      
      br
      div
        router-link.btn--yellow(to='/data/importer') Add More Data
          
    em(v-else) No Data Found. 
      router-link(to='/data/importer') Let's Add Some.

</template>

<script>

import _ from 'lodash'
import Vue from 'vue'

import { post } from '../../../tools/ajax'
import spinner from '../../global/blockSpinner.vue'
import dataset from '../../global/mixins/dataset'

export default {
  components: {
    spinner
  },
  data: () => {
    return {
      setIndex: -1,
      customTo: false,
      customFrom: false,
      rangeVisible: false,
      set: false
    };
  },
  mixins: [ dataset ],
  methods: {
    humanizeDuration: (n) => {
      return window.humanizeDuration(n, {largest: 4});
    },
    fmt: mom => mom.utc().format('YYYY-MM-DD HH:mm'),
    openRange: function() {
      if(this.setIndex === -1)
        return alert('select a range first');

      this.updateCustomRange();

      this.rangeVisible = true;
    },
    updateCustomRange: function() {
      this.customTo = this.fmt(this.set.to);
      this.customFrom = this.fmt(this.set.from);
    },
    emitSet: function(val) {
      if(!val)
        return;

      let set;

      if(!this.customTo)
        set = val;
      else {
        set = Vue.util.extend({}, val);
        set.to = moment.utc(this.customTo, 'YYYY-MM-DD HH:mm').format();
        set.from = moment.utc(this.customFrom, 'YYYY-MM-DD HH:mm').format();
      }

      this.$emit('dataset', set);
    }
  },
  watch: {

    setIndex: function() {
      this.set = this.datasets[this.setIndex];

      this.updateCustomRange();

      this.emitSet(this.set);
    },

    customTo: function() { this.emitSet(this.set); },
    customFrom: function() { this.emitSet(this.set); }
  }
}
</script>
<style>
td.radio {
  width: 45px;
}
td label{
  display: inline;
  font-size: 1em;
}
</style>
