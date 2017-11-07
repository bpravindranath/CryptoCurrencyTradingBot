<template lang='jade'>
div
  .mx1
    label.exchange_align(for='exchange').wrapper.strategy_header Exchange:
 
    .custom-select.button
      select(v-model='exchange')
        option(v-for='(market, e) in exchanges') {{ e }}
    span.exchange_Info(for='exchangeInfo') {{exchangeInfo}}
    span 
      a.exchange_Info(v-bind:href="url",target="_blank", style="font-size: 0.9rem") Here
 
          
  .grd-row
    .grd-row-col-3-6.mx1
      label.strategy_header(for='currency') Currency:
      .custom-select.button
        select(v-model='currency')
          option(v-for='cur in currencies') {{ cur }}
    .grd-row-col-3-6.mx1
      label.strategy_header(for='asset') Asset:
      .custom-select.button
        select(v-model='asset')
          option(v-for='asst in assets') {{ asst }}
</template>

<script>

import _ from 'lodash'
import rangePicker from './rangepicker.vue'
import rangeCreator from './rangecreator.vue'
import { get } from '../../../tools/ajax'

export default {
  props: ['onlyTradable', 'onlyImportable'],
  data: () => {
    return {
      // defaults:
      exchange: 'poloniex',
      currency: 'USDT',
      asset: 'BTC',
      exchangeInfo: '',
      url: '',
    };
  },
  created: function() {
    this.emitConfig();
  },
  computed: {
    exchanges: function() {

      let exchanges = Object.assign({}, this.$store.state.exchanges);

      if(_.isEmpty(exchanges))
        return false;

      if(this.onlyTradable) {
        _.each(exchanges, (e, name) => {
          if(!e.tradable)
            delete exchanges[name];
        });
      }

      if(this.onlyImportable) {
        _.each(exchanges, (e, name) => {
          if(!e.importable)
            delete exchanges[name];
        });
      }

      return exchanges;
    },
    markets: function() {
      return this.exchanges ? this.exchanges[ this.exchange ] : null;
    },

    assets: function() {
      return this.exchanges ? this.exchanges[this.exchange].markets[this.currency] : null;
    },

    currencies: function() {
      return this.exchanges ? _.keys( this.exchanges[this.exchange].markets ) : null;
    },
    watchConfig: function() {

      if (this.exchange==='poloniex'){
         this.exchangeInfo= ' More Details about Poloniex Exchange Visit '
         this.url = 'https://poloniex.com/exchange#btc_eth'
      }else if(this.exchange==='kraken'){
        this.exchangeInfo= ' More Information About Kraken Exchange Visit '
        this.url = 'https://www.kraken.com/charts'
      } else if(this.exchange==='bitfinex'){
         this.exchangeInfo= ' More Information About Bitfinex Exchange Visit '
         this.url = 'https://www.bitfinex.com'
      }else if(this.exchange==='bitstamp'){
         this.exchangeInfo= ' More Information About Bitstamp Exchange Visit '
         this.url = 'https://www.bitstamp.net'
      }else if(this.exchange==='bittrex'){
         this.exchangeInfo= ' More Information About Bittrex Exchange Visit '
         this.url = 'https://bittrex.com/home/markets'
      }else if(this.exchange==='bitx'){
         this.exchangeInfo= ' More Information About Bitx Exchange Visit '
         this.url = 'https://www.luno.com/en/price'
      }else if(this.exchange==='btc-markets'){
         this.exchangeInfo= ' More Information About BTC-Markets Exchange Visit '
         this.url = 'https://www.btcmarkets.net/'
      }else if(this.exchange==='btcc'){
         this.exchangeInfo= ' More Information About BTCC Exchange Visit '
         this.url = 'https://exchange.btcc.com/trade/btcusd/basic'
      }else if(this.exchange==='bx.in.th'){
         this.exchangeInfo= ' More Information About Bx.In.Th Exchange Visit '
         this.url = 'https://bx.in.th/'
      }else if(this.exchange==='cexio'){
         this.exchangeInfo= ' More Information About Cexio Exchange Visit '
         this.url = 'https://cex.io/btc-usd'
      }else if(this.exchange==='gdax'){
         this.exchangeInfo= ' More Information About Gdax Exchange Visit '
         this.url = 'https://www.gdax.com/trade/BTC-USD'
      }else if(this.exchange==='lakebtc'){
         this.exchangeInfo= ' More Information About LakeBTC Exchange Visit '
         this.url = 'https://www.lakebtc.com/'
      }else if(this.exchange==='okcoin'){
         this.exchangeInfo= ' More Information About OkCoin Exchange Visit '
         this.url = 'https://www.okcoin.com/'
      }else if(this.exchange==='wex.nz'){
         this.exchangeInfo= ' More Information About Wex.nz Exchange Visit '
         this.url = 'https://wex.nz/'
      }else if(this.exchange==='zaif.jp'){
         this.exchangeInfo= ' More Information About Zaif.jp Exchange Visit '
         this.url = 'https://zaif.jp/'
      }

      

      return {
        watch: {
          exchange: this.exchange,
          currency: this.currency,
          asset: this.asset,
        }
      }
    }
  },

  watch: {
    currency: function() { this.emitConfig() },
    asset: function() { this.emitConfig() },
    market: function() { this.emitConfig() },
    exchanges: function() { this.emitConfig() },
    exchange: function() { this.emitConfig() }
  },

  methods: {
    emitConfig: function() {
      this.$emit('market', this.watchConfig);
    }
  }
}
</script>
<style>
.exchange_align{
  display: inline;
}
.exchange_Info{
  margin-top: 2em;
 
  color: #F6672E;


  font-size: 1rem;
  text-transform: uppercase;
}



</style>
