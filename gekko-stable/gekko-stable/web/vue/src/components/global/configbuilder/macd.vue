<template lang='jade'>

.grd
  .grd-row
    .grd-row-col-6.px1
      .grd-row.center4
       
      
      
      
      
      h3 Short
        input.Inputcolor(v-model='stratParams.short')
      h3 Long
        input.Inputcolor(v-model='stratParams.long')
      h3 Signal
        input.Inputcolor(v-model='stratParams.signal')

      h4 Thresholds
      hr
      h3 Buy If Vol
        input.Inputcolor(v-model='stratParams.thresholds.down')
      h3 sellIfVol
        input.Inputcolor(v-model='stratParams.thresholds.up')
      h3 changeType
        input.Inputcolor(v-model='stratParams.thresholds.persistence')

      
      
</template>

<script>


import _ from 'lodash'
import { get } from '../../../tools/ajax'


export default {
  data: () => {
    return {
      strategies: [],
      strategy: 'MACD',
      rawStratParams: '',
      rawStratParamsError: false,
      stratParams: {},

      
      
    };
  },
  created: function () {
    // *********
    // created function: this function initialize the strategies from the router strategies.js
    // ********


    //from what I can understand this is a get request that references the strategies.js in the router folder
    //I believe it is returning data for each .toml file
    get('strategies', (err, data) => {

        //return message with data from Get request
        this.strategies = data;


        _.each(this.strategies, function(s) {
          s.empty = s.params === '';
        });
      // returns a list of parameters for MACD strategy which is the given initial value

       //Option 1: parse the TOML into JSON
        // this.rawStratParams = toml.parse(_.find(this.strategies, { name: this.strategy }).params);
       
       //Option 2: does not parse TOML into JSON
        this.rawStratParams = _.find(this.strategies, { name: this.strategy }).params;

        this.stratParams = toml.parse(rawStratParams);


        //checks if strategies have any parameters or not
        this.emptyStrat = _.find(this.strategies, { name: this.strategy }).empty;

        //calls function that will load data from rawStratParams into config
        this.emitConfig();
    });
  },
  watch: {
     // *********
    // watch function: this function watches when user changes strategies and parameter data
    // ********
    strategy: function(strat) {

         
      if (strat === 'MACD'){
         this.strategyInfo = ' For More Details about MACD Strategy Visit This '
         this.strategyUrl = 'http://traderhq.com/ultimate-guide-to-the-macd-indicator/'
      }else if(strat ==='CCI'){
        this.strategyInfo= ' For More Information About CCI Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/articles/active-trading/031914/how-traders-can-utilize-cci-commodity-channel-index-trade-stock-trends.asp'
      } else if(strat ==='DEMA'){
        this.strategyInfo= ' For More Information About DEMA Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/120414/what-are-common-trading-strategies-used-double-exponential-moving-average-dema.asp'
      } else if(strat ==='PPO'){
        this.strategyInfo= ' For More Information About PPO Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/021315/what-common-strategy-traders-implement-when-using-percentage-price-oscillator-ppo.asp'
      } else if(strat ==='RSI'){
        this.strategyInfo= ' For More Information About RSI Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/012015/how-do-i-use-relative-strength-index-rsi-create-forex-trading-strategy.asp'
      } else if(strat ==='StochRSI'){
        this.strategyInfo= ' For More Information About StochRSI Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031315/how-do-i-build-profitable-strategy-when-spotting-stochrsi-pattern.asp'
      } else if(strat ==='TSI'){
        this.strategyInfo= ' For More Information About TSI Strategy Visit This'
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031215/how-are-true-strength-index-tsi-patterns-interpreted-analysts-and-traders.asp'
      } else if(strat ==='UO'){
        this.strategyInfo= ' For More Information About UO Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031215/what-common-strategy-traders-implement-when-using-ultimate-oscillator.asp'
      } else if(strat ==='UO'){
        this.strategyInfo= ' For More Information About UO Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031215/what-common-strategy-traders-implement-when-using-ultimate-oscillator.asp'
      } else if(strat ==='custom'){
        this.strategyInfo= ' For More Information About Custom Strategies Visit This '
        this.strategyUrl = '#/customstrategyexplanation/customstrategyexplanation'
      } else{
        this.strategyInfo= ' There is Currently No Support Information This'
        this.strategyUrl = 'javascript:void(0);'
      }

      //listens when user changes strategy
      strat = _.find(this.strategies, { name: strat });

    //this might be the strategies we edit. he makes a copy that he creates the config with
    //this changes the input when a user selects a different strategy

      // this.rawStratParams = toml.parse(start.params);
      this.rawStratParams = strat.params;


      // this.stratParams = this.rawStratParams;
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
        //puts json strategies into config

      return config;
    }
  },
  methods: {
    humanizeDuration: (n) => window.humanizeDuration(n),
    emitConfig: function() {
      this.parseParams();


      //calls the config function to put data in JSON format to send to parent which I believe is new.js. 
      //So final form of data is JSON
      this.$emit('stratConfig', this.config);
    },
    parseParams: function() {

        // *********
    // paraseParams function: this function should take values and put them into stratParams
    // ********
      try {
        // alert(this.rawStratParams);
        //parse raw parameters back to strats
        this.stratParams = toml.parse(this.rawStratParams);
        this.rawStratParamsError = false;
      } catch(e) {
        this.rawStratParamsError = e;
        this.stratParams = {};
      }
    },
    
    showHide: function(){
      var x = document.getElementById("parameterDiv");
      if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
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


.strategy_header{
  font-size: 1rem;
  text-transform: uppercase;
}


#parameterDiv{
    display:none;
}
.reduced-margin{
    margin-left: -30%;
  }
  
.reduced-div-margin{
    margin-left: -60%;
  }  

.center-button{
    margin-left:30%;
}

</style>
