<template lang='jade'>
.grd
  .grd-row
    .grd-row-col-3-6.px1
      .grd-row
        h3 Strategy
        .question
          .tooltip
            img(src='/assets/Question.jpg', width='20', height='20')
            span.tooltiptext A strategy is a combination of functions that get market data in the form of candles (OHCL, volume and the average weighted price).
      div
        label(for='strat').wrapper Strategy:
        .custom-select.button
          select(v-model='strategy')
            option(v-for='strat in strategies') {{ strat.name }}
      div
        label(for='candleSize') Candle Size
        .grd-row
          .grd-row-col-3-6
            input(v-model='rawCandleSize')
          .grd-row-col-3-6.align
            .custom-select.button
              select(v-model='candleSizeUnit')
                option minutes
                option hours
                option days
      div
        label(for='historySize') Warmup period (in {{ rawCandleSize }} {{ singularCandleSizeUnit }} candles):
        input(v-model='historySize')
        em.label-like (will use {{ humanizeDuration(candleSize * historySize * 1000 * 60) }} of data as history)
    .grd-row-col-2-6.px1
      div
        h3 Parameters
        p {{ strategy }} Parameters:
        textarea.params(v-model='rawStratParams')
        p.bg--red.p1(v-if='rawStratParamsError') {{ rawStratParamsError.message }}
</template>

<script>
import _ from 'lodash'
import { get } from '../../../tools/ajax'

export default {
  data: () => {
    return {
      strategies: [],

      candleSizeUnit: 'hours',
      rawCandleSize: 1,

      strategy: 'MACD',
      historySize: 10,

      rawStratParams: '',
      rawStratParamsError: false,

      emptyStrat: false,
      stratParams: {}
    };
  },
  created: function () {
    get('strategies', (err, data) => {
        this.strategies = data;

        _.each(this.strategies, function(s) {
          s.empty = s.params === '';
        });

        this.rawStratParams = _.find(this.strategies, { name: this.strategy }).params;
        this.emptyStrat = _.find(this.strategies, { name: this.strategy }).empty;
        this.emitConfig();
    });
  },
  watch: {
    strategy: function(strat) {
      strat = _.find(this.strategies, { name: strat });
      this.rawStratParams = strat.params;
      this.emptyStrat = strat.empty;

      this.emitConfig();
    },
    candleSize: function() { this.emitConfig() },
    historySize: function() { this.emitConfig() },
    rawStratParams: function() { this.emitConfig() }
  },
  computed: {
    candleSize: function() {
       if(this.candleSizeUnit === 'minutes')
        return this.rawCandleSize;
      else if(this.candleSizeUnit === 'hours')
        return this.rawCandleSize * 60;
      else if(this.candleSizeUnit === 'days')
        return this.rawCandleSize * 60 * 24;
    },
    singularCandleSizeUnit: function() {
      // hours -> hour
      return this.candleSizeUnit.slice(0, -1);
    },
    config: function() {
      let config = {
        tradingAdvisor: {
          enabled: true,
          method: this.strategy,
          candleSize: +this.candleSize,
          historySize: +this.historySize
        }
      }

      if(this.emptyStrat)
        config[this.strategy] = {__empty: true}
      else
        config[this.strategy] = this.stratParams;

      return config;
    }
  },
  methods: {
    humanizeDuration: (n) => window.humanizeDuration(n),
    emitConfig: function() {
      this.parseParams();
      this.$emit('stratConfig', this.config);
    },
    parseParams: function() {
      try {
        this.stratParams = toml.parse(this.rawStratParams);
        this.rawStratParamsError = false;
      } catch(e) {
        this.rawStratParamsError = e;
        this.stratParams = {};
      }
    }
  }
}
</script>
<style>
.align .custom-select select {
  padding: 0.4em 1.2em .3em .8em;
}

.label-like {
  display: block;
  font-size: 0.9em;
  color: #777;
}

.align {
  padding-left: 1em;
}

.question {
  padding-left: 1em;
  padding-top: 2em;
}

.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 250px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -125px;
    opacity: 0;
    transition: opacity 1s;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}

</style>
