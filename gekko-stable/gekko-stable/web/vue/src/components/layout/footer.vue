<template lang='jade'>
  footer.p2.bg--black
    .contain.grd-row
      .grd-row-col-3-6
        p
          em Use Gekko and GekkoTU at your own risk.
        p Using Gekko v{{ version.gekko }} and Gekko UI v{{ version.ui }}.
      .footerR.px2.grd-row-col
        a(href='#/backtest/glossary') Glossary
     
</template>

<script>
const gekkoPackage = require('../../../../../package.json');
const uiPackage = require('../../../package.json');

export default {
  data: () => {
    return {
      version: {
        gekko: gekkoPackage.version,
        ui: uiPackage.version
      }
    }
  }
}
</script>

<style>
  .footerR a {
  flex: 1 1 100%;
  display: block;
  text-align: center;
  text-decoration: none;
  color: #fff;
  }

  .footerR a:hover {
  text-decoration: underline;
  }
</style>

