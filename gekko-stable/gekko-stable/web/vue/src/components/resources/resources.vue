<template lang='jade'>
    .reduced-margin
     .flex-container4(v-html='left')
</template>

<script>
  import marked from '../../tools/marked';

  const left = marked(`

  ### Resources

  #### Looking for more information? Start here.
  <hr>
  <p style='font-size: 20px;font-weight: bold;'>About Gekko &amp; Gekko TU</p>
    <p style ='color:#e2e504; font-style:italic;'> What's the difference between Gekko and Gekko TU?</p>
    <p style='color: #ffffff'> Gekko TU is an extension of the original Gekko project. Gekko TU's goals are to provide a more user-friendly interface and the ability to configure custom trade strategies from the web interface. Perfect for new traders. Get more details at the links below.</p>

    <ul>
     <li><a href='https://gekko.wizb.it/'>The original Gekko's website.</a></li>
     <li><a href='https://github.com/askmike/gekko'>Gekko on GitHub.</a></li>
    </ul>
  
  <p style='font-size: 20px;font-weight: bold;'>About Cryptocurrencies &amp; Trading</p>
    <p style ='color:#e2e504; font-style:italic;'> I'm new to cryptocurrency trading. How can I get started?</p>
    <p style='color: #ffffff'>New traders may benefit from reviewing information from these sources:</p>
    <ul>
     <li><a href='https://www.youtube.com/watch?v=kubGCSj5y3k&feature=youtu.be'>A short video explanation of how cryptocurrencies work.</a></li>
     <li><a href='https://www.tradingtechnologies.com/help/x-study/technical-indicator-definitions/list-of-technical-indicators/'>A list of technical trade indicators with explanations.</a></li>
    <li><a href='#/customstrategyexplanation/customstrategyexplanation'>An explanation of how to use the custom strategy on Gekko TU.</a></li><li><a href='#/glossary/glossary'>A glossary of terms and abbreviations used on Gekko TU.</a></li>
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
    margin-left: -20%;
  }
</style>
