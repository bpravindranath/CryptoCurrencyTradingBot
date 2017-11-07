<template lang='jade'>
div
  h3.center3 How Do You Want To Run Gekko?
    .tooltip2
          img(src='/assets/Question.jpg', width='20', height='20')
          span.tooltiptext2 Once you have a strategy you can use Gekko to automatically run it in a few different ways
  hr
  template
    label(for='type').wrapper
    form.radio.grd.grd-row
      div.grd-row-col-3-6(v-for='(type, i) in types').m1
        label.radio_header(:for='i') {{ type }}
          .tooltip2
            img(src='/assets/Question.jpg', width='10', height='10')
            span.tooltiptext2(v-if="type === 'paper trader'"){{paperData}}
            span.tooltiptext2(v-if="type === 'market watcher'") {{marketData}}
            span.tooltiptext2(v-if="type === 'tradebot'") {{botData}}
        input.radio_button_margins(type='radio', :value='i', v-model='selectedTypeIndex')
          
                
</template>

<script>

export default {
  created: function() {
    this.emitType();
  },
  data: () => {
    return {
      types: ['paper trader', 'market watcher', 'tradebot'],
      selectedTypeIndex: 0,
      paperData: 'You can run the strategy in realtime simulate trading (trade with fake money) to see in realtime how profitable your strategy would have been.',
      marketData: 'You can currently watch the market to help inform your trading decisions',
      botData: 'You can run the strategy in realtime and automatically execute orders based on the signals.',
    }
  },
  methods: {
    emitType: function() {
      this.$emit('type', this.type);
    }
  },
  watch: {
    type: function() {
      this.emitType();
    }
  },
  computed: {
    type: function() {
       
       if(this.selectedTypeIndex === 'paper trader'){
         this.paperData= " You can run the strategy in realtime simulate trading (trade with fake money) to see in realtime how profitable your strategy would have been."
         this.marketData = ""
         this.tradeData = ""
       } 
       if (this.selectedTypeIndex === 'market watcher'){
          this.paperData= ""
          this.marketData = "headsfs"
          this.tradeData = ""

       }


      return this.types[ this.selectedTypeIndex ];
    }
  }
}
</script>

<style>

.radio_header{
  font-size: 1rem;
  text-transform: uppercase;
}

.header_font{
  font-size: 1.4rem;
}

.radio label {
  margin-top: 0;
}

.center3{
  text-align: center;
}

.radio_button_margins{
  margin-left: 50%;
}

</style>
