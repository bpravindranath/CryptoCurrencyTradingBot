<template lang='jade'>
  section.contain.grd-row
    .grd-row-col-3-6(v-html='left')
    .px2.grd-row-col-3-6.txt--center
      a.twitter-timeline(href='https://twitter.com/hashtag/bitcoin', data-widget-id='924709618386919427' height='500') #bitcoin Tweets
      p Keep up to date on bitcoin via Twitter
</template>

<script>
  import marked from '../../tools/marked';

  const left = marked(`

  ## Gekko TU

  Welcome to Gekko TU, a modified version of [Gekko](https://gekko.wizb.it/) created for the code illiterate and trading bot beginners.

  Please Note: we try to explain and simplify things as much as we can but strongly recommend doing extensive research before live trading.

  #### Lets begin by creating a backtest!

  #### Step 1: Import Data
  [Import Data page](#/data/importer/)

  <h4>
      Step 2: Select Dataset
    <br>Step 3: Choose Strategy
    <br>Step 4: Modify Paper Trader
  </h4)>
  <h5>Click Backtest button to execute</h5>
  [Backtest page](#/backtest)

  `);

  export default {
  data: () => {
  return {
  left
  }
  }
  }

  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
</script>
