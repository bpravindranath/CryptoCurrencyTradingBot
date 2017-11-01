<template lang='jade'>
  section.contain.grd-row
    .grd-row-col-3-6(v-html='left')
    .px2.grd-row-col
</template>

<script>
  import marked from '../../tools/marked';

  const left = marked(`

  ## Glossary

  #### <u>Currency</u>
  <p>
      BTC - Bitcoin
  <br>USDT - Tether
  <br>ETH - Ethereum
  <br>XMR - Monero
  </p>

  #### <u>Asset</u>
  <p>
      BTC - Bitcoin
  <br>BCH - Bitcoin Cash
  <br>DASH - Dash
  <br>ETC - Ethereum Classic
  <br>ETH - Ethereum
  <br>LTC - Litecoin
  <br>NXT - NXT
  <br>REP - Augur
  <br>STR - Starcoin
  <br>XMR - Monero
  <br>XRP - Ripple
  <br>ZEC - Zcash
  </p>


  `);

  export default {
  data: () => {
  return {
  left
  }
  }
  }

</script>

<style>
  .toppad{
    margin-top: 100px;
  }
</style>
