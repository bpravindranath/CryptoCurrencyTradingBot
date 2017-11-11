<template lang='jade'>
.grd.contain
  .grd-row
    .grd-row-col-6.mx1.txt--center
      type-picker(v-on:type='updateType')
    
  .grid-row
    .grd-row-col-6.mx1  
      template(v-if='type === "tradebot"')
        h3.center2 API Config Setup
          .tooltip2
            img(src='/assets/Question.jpg', width='20', height='20')
            span.tooltiptext2 An application programming interface key (API key) is a code passed in by Gekko calling an API of a specific trading exchange to identify the user. This will allow the user to make real trades on this exhange.
        hr
        div.center2
          router-link(to='/config').py1 API Key Config Settings 
          
    
      
  .grid-row
    .grd-row-col-6.mx1
      h3.center2 Market
        .tooltip2
          img(src='/assets/Question.jpg', width='20', height='20')
          span.tooltiptext2 A market is the platform where your cryptocurrency will be traded.
      hr
      market-picker.contain(v-on:market='updateMarketConfig', :only-tradable='isTradebot')
    
  template(v-if='type !== "market watcher"')
    strat-picker.contain.my2(v-on:stratConfig='updateStrat')
    hr(v-if='type === "paper trader"')
    paper-trader(v-on:settings='updatePaperTrader', v-if='type === "paper trader"')


</template>

<script>

import marketPicker from "../global/configbuilder/marketpicker.vue";
import typePicker from "../global/configbuilder/typepicker.vue";
import stratPicker from "../global/configbuilder/stratpicker.vue";
import paperTrader from "../global/configbuilder/papertrader.vue";
import { get } from "../../tools/ajax";
import _ from "lodash";

export default {
  created: function() {
    get("configPart/candleWriter", (error, response) => {
      this.candleWriter = toml.parse(response.part);
    });
    get("configPart/performanceAnalyzer", (error, response) => {
      this.performanceAnalyzer = toml.parse(response.part);
      this.performanceAnalyzer.enabled = true;
    });
  },
  data: () => {
    return {
      market: {},
      range: {},
      type: "",
      strat: {},
      paperTrader: {},
      candleWriter: {},
      performanceAnalyzer: {}
    };
  },
  components: {
    marketPicker,
    typePicker,
    stratPicker,
    paperTrader
  },
  computed: {
    isTradebot: function() {
      return this.type === "tradebot";
    },
    config: function() {
      let config = {};
      Object.assign(
        config,
        this.market,
        this.strat,
        { paperTrader: this.paperTrader },
        { candleWriter: this.candleWriter },
        { type: this.type },
        { performanceAnalyzer: this.performanceAnalyzer }
      );

      if (this.isTradebot) {
        delete config.paperTrader;
        config.trader = { enabled: true };
      }

      config.valid = this.validConfig(config);

      return config;
    }
  },
  methods: {
    validConfig: config => {
      if (config.type === "market watcher") return true;

      if (!config.tradingAdvisor) return false;
      if (_.isNaN(config.tradingAdvisor.candleSize)) return false;
      else if (config.tradingAdvisor.candleSize == 0) return false;

      let strat = config.tradingAdvisor.method;
      if (_.isEmpty(config[strat])) return false;

      return true;
    },
    updateMarketConfig: function(mc) {
      this.market = mc;
      this.emitConfig();
    },
    updateType: function(type) {
      this.type = type;
      this.emitConfig();
    },
    updateStrat: function(strat) {
      this.strat = strat;
      this.emitConfig();
    },
    updatePaperTrader: function(pt) {
      this.paperTrader = pt;
      this.paperTrader.enabled = true;
      this.emitConfig();
    },

    emitConfig: function() {
      this.$emit("config", this.config);
    }
  }
};
</script>

<style>
.question2 {
  padding-left: 1em;
  padding-top: 2em;
}

.tooltip2 {
  position: relative;
  display: inline-block;
}

.tooltip2 .tooltiptext2 {
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
  bottom: 90%;
  left: 50%;
  margin-left: -125px;
  opacity: 0;
  transition: opacity 1s;
}

.tooltip2 .tooltiptext2::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip2:hover .tooltiptext2 {
  visibility: visible;
  opacity: 1;
}
.center2 {
  text-align: center;
}
</style>
