<template lang='jade'>
    .reduced-margin
     .flex-container4(v-html='left')
</template>

<script>
  import marked from '../../tools/marked';

  const left = marked(`
    ### Welcome to Gekko TU. 
    #### Let's Get Started.

    Gekko TU was built for you. Whether you're an experienced cryptocurrency trader or a novice, we have the tools you need to make smart trading decisions, fast. 
    
    Gekko TU is a modified version of [Gekko](https://gekko.wizb.it/). We've redesigned the interface and extended its strategy creation capabilities, making it easier to use and more flexible.
    Please Note: We strongly recommend doing extensive research before investing in and trading cryptocurrency.
    
    Select an option below to begin.

    I want to...

    -[Create a trade bot for simulated or actual trades.](#/live-gekkos)
    
    -[Create a market watcher to monitor a market.](#/live-gekkos)
    
    -[Import data and backtest a trade strategy.](#/backtest)
    
    -[Learn more about cryptocurrency trading.](#/resources/resources)

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

<style>
  .reduced-margin{
    margin-left: -30%;
  }
</style>