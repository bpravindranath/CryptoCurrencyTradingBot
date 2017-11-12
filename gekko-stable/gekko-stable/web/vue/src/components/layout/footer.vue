<template lang='jade'>
  footer.p1.bg--black
    .contain.grd-row
      .footer-text
        p 
          DummyText Using Gekko v{{ version.gekko }} and Gekko UI v{{ version.ui }}. Use Gekko and GekkoTU at your own risk.      
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
  .footer-text{
    color: white;
    margin: auto;
  }
</style>
