<template lang='jade'>
.grd
  .grd-row
    .grd-row-col-3-6.px1
      .grd-row.center4
        h3 Strategy
          .tooltip
            img(src='/assets/Question.jpg', width='20', height='20')
            span.tooltiptext A strategy is a combination of functions that get market data in the form of candles (OHCL, volume and the average weighted price).
      hr
      div
        label(for='strat').exchange_align.wrapper Strategy:
        .custom-select.button
          select(v-model='strategy')
            option(v-for='strat in strategies') {{ strat.name }}
        span.exchange_Info(for='strategyInfo') {{strategyInfo}}
        span 
          a.exchange_Info(v-bind:href="strategyUrl",target="_blank", style="font-size: 0.9rem" ) Here
      div
        label.exchange_align2(for='candleSize') Candle Size
        .tooltip2
          img(src='/assets/Question.jpg', width='10', height='10')
          span.tooltiptext2 A candle is a time interval for which you can measure open price, close price, high price, and Gekko will update its data on every interval.
            
        .grd-row
          .grd-row-col-3-6
            input.Inputcolor(v-model='rawCandleSize')
          .grd-row-col-3-6.align
            .custom-select.button
              select(v-model='candleSizeUnit')
                option minutes
                option hours
                option days
      div
        h5.font_bold(for='historySize') Warmup period (in {{ rawCandleSize }} {{ singularCandleSizeUnit }} candles):
        input.Inputcolor(v-model='historySize')
        em.label-like (will use {{ humanizeDuration(candleSize * historySize * 1000 * 60) }} of data as history)
    .grd-row-col-3-6.px1
      .grid-row
         h3.center5 Parameters
          .tooltip
            img(src='/assets/Question.jpg', width='20', height='20')
            span.tooltiptext Parameters are the stategy rules for each strategy you can customize according to need
      hr
      div
        p {{ strategy }} Parameters:
        textarea.TextAreacolor.params(v-model='rawStratParams')
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
      stratParams: {},

      strategyInfo: ' More Details about MACD Strategy Visit ',
      strategyUrl: 'http://traderhq.com/ultimate-guide-to-the-macd-indicator/',
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

         
      if (strat === 'MACD'){
         this.strategyInfo = ' More Details about MACD Strategy Visit '
         this.strategyUrl = 'http://traderhq.com/ultimate-guide-to-the-macd-indicator/'
      }else if(strat ==='CCI'){
        this.strategyInfo= ' More Information About CCI Strategy Visit '
        this.strategyUrl = 'http://www.investopedia.com/articles/active-trading/031914/how-traders-can-utilize-cci-commodity-channel-index-trade-stock-trends.asp'
      } else if(strat ==='DEMA'){
        this.strategyInfo= ' More Information About DEMA Strategy Visit '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/120414/what-are-common-trading-strategies-used-double-exponential-moving-average-dema.asp'
      } else if(strat ==='PPO'){
        this.strategyInfo= ' More Information About PPO Strategy Visit '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/021315/what-common-strategy-traders-implement-when-using-percentage-price-oscillator-ppo.asp'
      } else if(strat ==='RSI'){
        this.strategyInfo= ' More Information About RSI Strategy Visit '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/012015/how-do-i-use-relative-strength-index-rsi-create-forex-trading-strategy.asp'
      } else if(strat ==='StochRSI'){
        this.strategyInfo= ' More Information About StochRSI Strategy Visit '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031315/how-do-i-build-profitable-strategy-when-spotting-stochrsi-pattern.asp'
      } else if(strat ==='TSI'){
        this.strategyInfo= ' More Information About TSI Strategy Visit '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031215/how-are-true-strength-index-tsi-patterns-interpreted-analysts-and-traders.asp'
      } else if(strat ==='UO'){
        this.strategyInfo= ' More Information About UO Strategy Visit '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031215/what-common-strategy-traders-implement-when-using-ultimate-oscillator.asp'
      } else if(strat ==='UO'){
        this.strategyInfo= ' More Information About UO Strategy Visit '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031215/what-common-strategy-traders-implement-when-using-ultimate-oscillator.asp'
      } else{
        this.strategyInfo= ' There is Currently No Support Information '
        this.strategyUrl = 'javascript:void(0);'
      }


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
        //puts strategies into config

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

.label_color{
  color: white;
}
.label-like {
  display: block;
  font-size: 0.9em;
  color: white;
}
.TextAreacolor{
  color:black
}
.Inputcolor{
  background-color:white;
  color: black;
}
.center4{
  
 justify-content: center;
}
.center5{
  text-align: center;
  padding-bottom: 2%;
}

.font_bold{
  font-weight: 100;
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
    font-size: 15px;
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

.exchange_align2{
  display: inline-block;
}

</style>
