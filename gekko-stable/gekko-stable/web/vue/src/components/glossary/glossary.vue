<template lang='jade'>
  .reduced-margin
   .flex-container4(v-html='left')
</template>

<script>
  import marked from '../../tools/marked';

  const left = marked(`

  ### Glossary

  Here is a list of acronyms used on the Gekko TU website. For more information about trading, please visit the <a href='#/resources/resources'>Resources page.</a>
  <p style='font-size: 20px;font-weight: bold;text-decoration:underline;'>Currencies</p>
  <ul>
      <li>BTC - Bitcoin</li>
  <li>USDT - US Dollar Tether</li>
  <li>ETH - Ethereum</li>
  <li>XMR - Monero</li>
  </ul>

  <p style='font-size: 20px;font-weight: bold;text-decoration:underline;'>Assets</p>
  <ul>
     <li> BTC - Bitcoin</li>
  <li>BCH - Bitcoin Cash</li>
  <li>DASH - Dash</li>
  <li>ETC - Ethereum Classic</li>
  <li>ETH - Ethereum</li>
  <li>LTC - Litecoin</li>
  <li>NXT - NXT</li>
  <li>REP - Augur</li>
  <li>STR - Starcoin</li>
  <li>XMR - Monero</li>
  <li>XRP - Ripple</li>
  <li>ZEC - Zcash</li>
  </ul>


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
  
  .reduced-margin{
    margin-left: -30%;
  }
</style>
