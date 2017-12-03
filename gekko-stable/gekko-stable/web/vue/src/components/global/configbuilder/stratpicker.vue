<template lang='jade'>

.grd
  .grd-row
    .grd-row-col-6.px1
      .grd-row.center4
        h3 Strategy
          .tooltip
            img(src='/assets/question_yellow.jpeg', width='20', height='20')
            span.tooltiptext Strategy 
              hr(width='70%')
              span A strategy is a combination of functions that gets market data in the form of candles (OHLC, volume and the average weighted price, etc.) and makes buy and sell decisions based on parameter settings.
      hr
      div
        label(for='strat').exchange_align.wrapper.strategy_header Strategy:
        .custom-select.button
          select(v-model='strategy')
            option(v-for='strat in strategies') {{ strat.name }}
        span.exchange_Info(for='strategyInfo') {{strategyInfo}}
        span(v-if="present")
          a.exchange_Info(v-bind:href="strategyUrl",target="_blank", style="font-size: 0.9rem" ) Web Page
      div
        label.exchange_align2(for='candleSize').strategy_header Candle Size
        .tooltip2
          img(src='/assets/question_yellow.jpeg', width='10', height='10')
          span.tooltiptext2 A candle is a time interval for which you can measure open price, close price, high price, and trade volume, etc. GekkoTU will update its data on every interval.
            
        .grd-row
          .grd-row-col-3-6
            input.Inputcolor(v-model='rawCandleSize')
          .grd-row-col-3-6.align
            .custom-select.button
              select(v-model='candleSizeUnit')
                option minutes
                option hours
                option days
      div
        h5.font_bold(for='historySize').strategy_header Warmup period (in {{ rawCandleSize }} {{ singularCandleSizeUnit }} candles):
        input.Inputcolor(v-model='historySize')
        em.label-like.strategy_header (will use {{ humanizeDuration(candleSize * historySize * 1000 * 60) }} of data as history)
  .grid-row.center
    .grd-row-col-6-6.px1
      .grid-row
         h3.center5 Parameters
          .tooltip
            img(src='/assets/question_yellow.jpeg', width='20', height='20')
            span.tooltiptext Parameters are the variables used in a strategy. Each strategy has unique parameters you can customize.
      hr
      div
        span.h5 {{ strategy }} 
        span.h5 Parameters
        hr(width='70%')


        //- textarea.TextAreacolor.params(v-model='rawStratParams')
        
        //- p.bg--red.p1(v-if='rawStratParamsError') {{ rawStratParamsError.message }}


      //--------------------------------------- MACD STRATEGY------------------------------------   
      span(v-if="strategy === 'MACD'")
      
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Short
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font SHORT 
                  hr(width='70%')
                  span Short EMA that moves closer to the real market (including noise)
              input.Inputcolor(v-model='rawStratParams.short')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Long
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font LONG 
                  hr(width='70%')
                  span Long EMA that lags behind the market more but is also more resistant to noise
              input.Inputcolor(v-model='rawStratParams.long')

        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Signal
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font SIGNAL 
                  hr(width='70%')
                  span EMA weight calculated over the difference from short/long.
              input.Inputcolor(v-model='rawStratParams.signal')
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Down
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font DOWN 
                  hr(width='70%')
                  span Specifies how big the negative difference in short/long lines need to be for it to be considered a downside trend.
              input.Inputcolor(v-model='rawStratParams.thresholds.down')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Up
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font UP
                  hr(width='70%')
                  span Specifies how big the positive difference in short/long lines need to be for it to be considered a upside trend.
              input.Inputcolor(v-model='rawStratParams.thresholds.up')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Persistence
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font PERSISTENCE 
                  hr(width='70%')
                  span Number of candles the thresholds need to be met for the trend to be valid.
              input.Inputcolor(v-model='rawStratParams.thresholds.persistence')

 
      //--------------------------------------- UO STRATEGY------------------------------------   
      span(v-if="strategy === 'UO'")
      
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight First-Weight
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font FIRST-WEIGHT 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.first.weight')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight First-Period
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font FIRST-PERIOD  
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.first.period')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Second-Weight
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font SECOND-WEIGHT  
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.second.weight')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Second-Period
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font SECOND-PERIOD  
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.second.period')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Third-Weight
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font THIRD-WEIGHT  
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.third.weight')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Third-Period
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font THIRD-PERIOD  
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.third.period')

       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Low
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font LOW 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.low')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight High
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font High
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.high')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Persistence
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h6.font_weight.tooltiptext.tooltip_font PERSISTENCE 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.persistence')





      //--------------------------------------- TALIB-MACD STRATEGY------------------------------------   
      span(v-if="strategy === 'talib-macd'")
      
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Opt In Fast Period
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font OPT IN FAST PERIOD 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.parameters.optInFastPeriod')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Opt In Slow Period
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font OPT IN SLOW PERIOD 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.parameters.optInSlowPeriod')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Opt In Signal Period
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font OPT IN SIGNAL PERIOD  
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.parameters.optInSignalPeriod')
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Down
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font DOWN 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.down')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Up
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font UP
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.up')
        



      //--------------------------------------- VAR-PPO STRATEGY------------------------------------   
      span(v-if="strategy === 'varPPO'")
      
        
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Momentum
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font MOMENTUM 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.momentum')
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Weight Low
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font WEIGHT LOW 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.weightLow')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Weight High
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font WEIGHT HIGH
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.weightHigh')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Persistence
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font PERSISTENCE 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.persistence')
      






      //--------------------------------------- RSI STRATEGY------------------------------------   
      span(v-if="strategy === 'RSI'")
      
        
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Interval
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font INTERVAL 
                  hr(width='70%')
                  span Number of days used for comparing up periods to down periods
              input.Inputcolor(v-model='rawStratParams.interval')
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Low
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font LOW 
                  hr(width='70%')
                  span Lower threshold of RSI that triggers a downward trend.
              input.Inputcolor(v-model='rawStratParams.thresholds.low')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight High
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font HIGH
                  hr(width='70%')
                  span Higher threshold of RSI that triggers a upward trend. 
              input.Inputcolor(v-model='rawStratParams.thresholds.high')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Persistence
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font PERSISTENCE 
                  hr(width='70%')
                  span Number of candles the thresholds need to be met for the trend to be valid.
              input.Inputcolor(v-model='rawStratParams.thresholds.persistence')
      

      //--------------------------------------- STOCH-RSI STRATEGY------------------------------------   
      span(v-if="strategy === 'StochRSI'")
      
        
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Interval
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font INTERVAL 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.interval')
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Low
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font LOW 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.low')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight High
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font HIGH
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.high')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Persistence
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font PERSISTENCE 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.persistence')

      
      

      //--------------------------------------- TSI STRATEGY------------------------------------   
      span(v-if="strategy === 'TSI'")
      
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Short
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font SHORT 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.short')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Long
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font LONG 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.long')
        
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Low
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font LOW 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.low')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight High
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font HIGH
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.high')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Persistence
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font PERSISTENCE 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              input.Inputcolor(v-model='rawStratParams.thresholds.persistence')

      






      //--------------------------------------- PPO STRATEGY------------------------------------   
      span(v-if="strategy === 'PPO'")
      
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Short
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font SHORT 
                  hr(width='70%')
                  span Short EMA that moves closer to the real market (including noise)
              input.Inputcolor(v-model='rawStratParams.short')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Long
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font LONG 
                  hr(width='70%')
                  span Long EMA that lags behind the market more but is also more resistant to noise
              input.Inputcolor(v-model='rawStratParams.long')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Signal
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font SIGNAL 
                  hr(width='70%')
                  span EMA weight calculated over the difference from short/long.
              input.Inputcolor(v-model='rawStratParams.signal')
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Down
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font DOWN 
                  hr(width='70%')
                  span Specifies how big the negative difference in short/long lines need to be for it to be considered a downside trend.
              input.Inputcolor(v-model='rawStratParams.thresholds.down')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight Up
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font UP
                  hr(width='70%')
                  span Specifies how big the positive difference in short/long lines need to be for it to be considered a upside trend.
              input.Inputcolor(v-model='rawStratParams.thresholds.up')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Persistence
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font PERSISTENCE 
                  hr(width='70%')
                  span Number of candles the thresholds need to be met for the trend to be valid.
              input.Inputcolor(v-model='rawStratParams.thresholds.persistence')

      
      
      
      //--------------------------------------- DEMA STRATEGY------------------------------------   
      span(v-if="strategy === 'DEMA'")
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Short
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font SHORT 
                  hr(width='70%')
                  span Short EMA that moves closer to the real market (including noise)
              input.Inputcolor(v-model='rawStratParams.short')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight.font_weight Long
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font LONG 
                  hr(width='70%')
                  span Long EMA that lags behind the market more but is also more resistant to noise.
              input.Inputcolor(v-model='rawStratParams.long')
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight.font_weight Down
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font DOWN
                  hr(width='70%')
                  span Specifies how big the negative difference in short/long lines need to be for it to be considered a trend.
              input.Inputcolor(v-model='rawStratParams.thresholds.down')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight.font_weight Up
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font UP
                  hr(width='70%')
                  span Specifies how big the positive difference in short/long lines need to be for it to be considered a trend.
              input.Inputcolor(v-model='rawStratParams.thresholds.up')
        

      //--------------------------------------- CCI STRATEGY------------------------------------   
      span(v-if="strategy === 'CCI'")
      
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight.font_weight Constant
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font CONSTANT 
                  hr(width='70%')
                  span Multiplier that ensures most of the CCI values fall within the up and down range. 
              input.Inputcolor(v-model='rawStratParams.constant')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight.font_weight History
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font HISTORY 
                  hr(width='70%')
                  span Number of days used to calculate SMA of Average Price
              input.Inputcolor(v-model='rawStratParams.history')
       
        h4.center Thresholds
        hr(width='70%')

        .grd-row  
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight.font_weight Up
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font UP 
                  hr(width='70%')
                  span Upper CCI value that signals the start of uptrend.
              input.Inputcolor(v-model='rawStratParams.thresholds.down')

          .grd-row-col-2-6.mx1.center_box  
            h6.font_weight.font_weight Down
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font Down
                  hr(width='70%')
                  span Lower CCI value that signals the start of downtrend.
              input.Inputcolor(v-model='rawStratParams.thresholds.up')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight.font_weight Persistence
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font PERSISTENCE 
                  hr(width='70%')
                  span Number of candles the thresholds need to be met for the trend to be valid.
              input.Inputcolor(v-model='rawStratParams.thresholds.persistence')



      //--------------------------------------- DEBUG-ADVICE STRATEGY------------------------------------ 
      span(v-if="strategy === 'debug-advice'")
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h4.font_weight.font_weight No Strategy Parameters Listed...
              

      //--------------------------------------- NOOP STRATEGY------------------------------------ 
      span(v-if="strategy === 'noop'")
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h4.font_weight.font_weight No Strategy Parameters Listed...





      //--------------------------------------- CUSTOM STRATEGY------------------------------------     
      span(v-if="strategy === 'custom'")
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Trade Based On
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font TRADE BASED ON 
                  hr(width='70%')
                  span Bacon ipsum dolor amet corned beef prosciutto capicola
              .custom-select.button
                select(v-model='rawStratParams.tradeFactors')
                  option(disabled='', value='') Please select one
                  option price
                  option volume
                  option price&volume
                  option thresholds

        span(v-if="rawStratParams.tradeFactors === 'price'")
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Price Type
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font PRICE TYPE
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.priceType')
                    option(disabled='', value='') Please select one
                    option open/close
                    option high
                    option low

        span(v-if="rawStratParams.tradeFactors === 'price&volume'")
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Price Type
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font PRICE TYPE
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.priceType')
                    option(disabled='', value='') Please select one
                    option open/close
                    option high
                    option low
            
              
        span(v-if="rawStratParams.tradeFactors === 'price&volume'")
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy If There's a Price
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY PRICE
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.buyIfPrice')
                    option(disabled='', value='') Please select one
                    option increase
                    option decrease

            .grd-row-col-2-6.mx1.center_box  
              h6.font_weight Sell If There's a Price
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL PRICE
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.sellIfPrice')
                    option(disabled='', value='') Please select one
                    option increase
                    option decrease

          .grd-row          
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy If There's a Trade Volume
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY VOLUME
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.buyIfVol')
                    option(disabled='', value='') Please select one
                    option increase
                    option decrease

            .grd-row-col-2-6.mx1.center_box  
              h6.font_weight Sell If There's a Trade Volume
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL VOLUME
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.sellIfVol')
                    option(disabled='', value='') Please select one
                    option increase
                    option decrease
      
        span(v-if="rawStratParams.tradeFactors === 'price'")
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy If There's a Price
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY PRICE
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.buyIfPrice')
                    option(disabled='', value='') Please select one
                    option increase
                    option decrease

            .grd-row-col-2-6.mx1.center_box  
              h6.font_weight Sell If There's a Price
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL PRICE
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.sellIfPrice')
                    option(disabled='', value='') Please select one
                    option increase
                    option decrease

        span(v-if="rawStratParams.tradeFactors === 'volume'")
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy If There's a Trade Volume
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY VOLUME
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.buyIfVol')
                    option(disabled='', value='') Please select one
                    option increase
                    option decrease
                  

            .grd-row-col-2-6.mx1.center_box  
              h6.font_weight Sell If There's a Trade Volume
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL VOLUME
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.sellIfVol')
                    option(disabled='', value='') Please select one
                    option increase
                    option decrease

        span(v-if="rawStratParams.tradeFactors === 'thresholds'")
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy Price Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.thresholds.buyPriceThreshold')
              h5.font_weight Buy When Price is {{rawStratParams.thresholds.buyPriceThreshold}} or Less

            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Sell Price Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.thresholds.sellPriceThreshold')
              h5.font_weight Sell When Price is {{rawStratParams.thresholds.sellPriceThreshold}} or Higher
            
            
            

        //--------------------------------------- CHANGE TYPE PARAMETER  # | % ----------------------------------     
        
        
        span(v-if="rawStratParams.tradeFactors !== 'thresholds'")
          hr(width='70%')
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Change Type
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font CHANGE TYPE 
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.changeType')
                    option(disabled='', value='') Please select one
                    option #
                    option %
          
        //-----------------------------------SECTION INTRODUCTION-----------------------------------
        //- User Will Choose either '#'' or '%'.
        //- Now depending on above input from TradeFactor(Price, Volume, Price and Volume or Threshold) and BuyIfPrice/Vol (increase, decrease) and rawStratParams.sellIfPrice/Vol (increase)
        //- Different parameters will appear according to a combination of options
        
        
        //- Example:
        //- if (rawStratParams.changeType === '#' &&  rawStratParams.tradeFactors === 'Price' 
        //-     && rawStratParams.buyIfPrice ==='increase' $$ rawStratParams.sellIfPrice ==='decrease')
        //- then 
        //-    1)User sets price to Buy where there is a price increase
               2)User sets price to sell where there is a price decrease 
        
        
        //--------------------------------------- CHANGE TYPE PARAMETER  === #  ---------------------------------- 
        span(v-if="rawStratParams.changeType === '#'")
          .grd-row
           
            //--------------------------------------- FIRST INPUT BOX ---------------------------------- 
            .grd-row-col-2-6.mx1.center_box
              
              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Price' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'price'")
               
                //--------------------------------------- BuyIfPrice === decrease ---------------------------------- 
                span(v-if="rawStratParams.buyIfPrice ==='decrease'")
                  h6.font_weight Buy If There's a Price decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceDecreaseAmt')
                    
                    
                //--------------------------------------- BuyIfPrice === increase ---------------------------------- 
                span(v-if="rawStratParams.buyIfPrice ==='increase'")
                  h6.font_weight Buy If There's a Price increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceIncreaseAmt')
              
              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Volume' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'volume'")
                
                //--------------------------------------- rawStratParams.buyIfVol === decrease ---------------------------------- 
                span(v-if="rawStratParams.buyIfVol ==='decrease'")
                  h6.font_weight Buy If There's a Volume decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolDecreaseAmt')

                //--------------------------------------- rawStratParams.buyIfVol === increase ---------------------------------- 
                span(v-if="rawStratParams.buyIfVol ==='increase'")
                  h6.font_weight Buy If There's a Volume increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolIncreaseAmt')
              


              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Price and Volume' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'price&volume'")
                //--------------------------------------- rawStratParams.buyIfPrice === decrease ---------------------------------- 
                span(v-if="rawStratParams.buyIfPrice ==='decrease'")
                  h6.font_weight Buy If There's a Price decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceDecreaseAmt')
                    
                //--------------------------------------- rawStratParams.buyIfPrice === increase ---------------------------------- 
                span(v-if="rawStratParams.buyIfPrice ==='increase'")
                  h6.font_weight Buy If There's a Price increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceIncreaseAmt') 
               
                
                //--------------------------------------- rawStratParams.buyIfVol === decrease ---------------------------------- 
                span(v-if="rawStratParams.buyIfVol ==='decrease'")
                  h6.font_weight Buy If There's a Volume decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolDecreaseAmt')

                //--------------------------------------- rawStratParams.buyIfVol === increase ---------------------------------- 
                span(v-if="rawStratParams.buyIfVol ==='increase'")
                  h6.font_weight Buy If There's a Volume increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolIncreaseAmt')
              

            
            
            //--------------------------------------- Second INPUT BOX ---------------------------------- 
            .grd-row-col-2-6.mx1.center_box
             
              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Price' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'price'")
              
                //--------------------------------------- rawStratParams.sellIfPrice === decrease ---------------------------------- 
                span(v-if="rawStratParams.sellIfPrice ==='decrease'")
                  h6.font_weight Sell If There's a Price decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceDecreaseAmt') 
               
                //--------------------------------------- rawStratParams.sellIfPrice === increase ---------------------------------- 
                span(v-if="rawStratParams.sellIfPrice ==='increase'")
                  h6.font_weight Sell If There's a Price increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceIncreaseAmt') 

              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Volume' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'volume'")
                
                //--------------------------------------- rawStratParams.sellIfVol === decrease ---------------------------------- 
                span(v-if="rawStratParams.sellIfVol ==='decrease'")
                  h6.font_weight Sell If There's a Volume decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolDecreaseAmt') 
                    
                //--------------------------------------- rawStratParams.sellIfVol === increase ---------------------------------- 
                span(v-if="rawStratParams.sellIfVol ==='increase'")
                  h6.font_weight Sell If There's a Volume increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolIncreaseAmt') 
              
              
              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Price and Volume' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'price&volume'")
                
                //--------------------------------------- rawStratParams.sellIfPrice === decrease ---------------------------------- 
                span(v-if="rawStratParams.sellIfPrice ==='decrease'")
                  h6.font_weight Sell If There's a Price decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceDecreaseAmt') 
               
                //--------------------------------------- rawStratParams.sellIfPrice === increase ---------------------------------- 
                span(v-if="rawStratParams.sellIfPrice ==='increase'")
                  h6.font_weight Sell If There's a Price increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceIncreaseAmt') 
                //--------------------------------------- rawStratParams.sellIfVol === decrease ---------------------------------- 
                span(v-if="rawStratParams.sellIfVol ==='decrease'")
                  h6.font_weight Sell If There's a Volume decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolDecreaseAmt') 
                    
                //--------------------------------------- rawStratParams.sellIfVol === increase ---------------------------------- 
                span(v-if="rawStratParams.sellIfVol ==='increase'")
                  h6.font_weight Sell If There's a Volume increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolIncreaseAmt') 
              
        //--------------------------------------- CHANGE TYPE PARAMETER  === # Should this be %? ---------------------------------- 
        span(v-if="rawStratParams.changeType === '%'")
          .grd-row
           
            //--------------------------------------- FIRST INPUT BOX ---------------------------------- 
            .grd-row-col-2-6.mx1.center_box
              
              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Price' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'price'")
               
                //--------------------------------------- rawStratParams.buyIfPrice === decrease ---------------------------------- 
                span(v-if="rawStratParams.buyIfPrice ==='decrease'")
                  h6.font_weight Buy If There's a Price decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceDecreaseAmt')
                    
                //--------------------------------------- rawStratParams.buyIfPrice === increase ---------------------------------- 
                span(v-if="rawStratParams.buyIfPrice ==='increase'")
                  h6.font_weight Buy If There's a Price increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceIncreaseAmt')
              
              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Volume' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'volume'")
                
                //--------------------------------------- rawStratParams.buyIfVol === decrease ---------------------------------- 
                span(v-if="rawStratParams.buyIfVol ==='decrease'")
                  h6.font_weight Buy If There's a Volume decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolDecreaseAmt')

                //--------------------------------------- rawStratParams.buyIfVol === increase ---------------------------------- 
                span(v-if="rawStratParams.buyIfVol ==='increase'")
                  h6.font_weight Buy If There's a Volume increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolIncreaseAmt')
              


              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Price and Volume' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'price&volume'")
                //--------------------------------------- rawStratParams.buyIfPrice === decrease ---------------------------------- 
                span(v-if="rawStratParams.buyIfPrice ==='decrease'")
                  h6.font_weight Buy If There's a Price decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceDecreaseAmt')
                    
                //--------------------------------------- rawStratParams.buyIfPrice === increase ---------------------------------- 
                span(v-if="rawStratParams.buyIfPrice ==='increase'")
                  h6.font_weight Buy If There's a Price increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceIncreaseAmt') 
               
                
                //--------------------------------------- rawStratParams.buyIfVol === decrease ---------------------------------- 
                span(v-if="rawStratParams.buyIfVol ==='decrease'")
                  h6.font_weight Buy If There's a Volume decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolDecreaseAmt')

                //--------------------------------------- rawStratParams.buyIfVol === increase ---------------------------------- 
                span(v-if="rawStratParams.buyIfVol ==='increase'")
                  h6.font_weight Buy If There's a Volume increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font BUY VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolIncreaseAmt')
            
            
            //--------------------------------------- Second INPUT BOX ---------------------------------- 
            .grd-row-col-2-6.mx1.center_box
             
              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Price' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'price'")
              
                //--------------------------------------- rawStratParams.sellIfPrice === decrease ---------------------------------- 
                span(v-if="rawStratParams.sellIfPrice ==='decrease'")
                  h6.font_weight Sell If There's a Price decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceDecreaseAmt') 
               
                //--------------------------------------- rawStratParams.sellIfPrice === increase ---------------------------------- 
                span(v-if="rawStratParams.sellIfPrice ==='increase'")
                  h6.font_weight Sell If There's a Price increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceIncreaseAmt') 

              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Volume' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'volume'")
                
                //--------------------------------------- rawStratParams.sellIfVol === decrease ---------------------------------- 
                span(v-if="rawStratParams.sellIfVol ==='decrease'")
                  h6.font_weight Sell If There's a Volume decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolDecreaseAmt') 
                    
                //--------------------------------------- rawStratParams.sellIfVol === increase ---------------------------------- 
                span(v-if="rawStratParams.sellIfVol ==='increase'")
                  h6.font_weight Sell If There's a Volume increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolIncreaseAmt') 
              
              
              //--------------------------------------- CHANGE TYPE === '#'' && TRADE FACTORS === 'Price and Volume' ---------------------------------- 
              span(v-if="rawStratParams.tradeFactors === 'price&volume'")
                
                //--------------------------------------- rawStratParams.sellIfPrice === decrease ---------------------------------- 
                span(v-if="rawStratParams.sellIfPrice ==='decrease'")
                  h6.font_weight Sell If There's a Price decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceDecreaseAmt', placeholder="edit me") 
               
                //--------------------------------------- rawStratParams.sellIfPrice === increase ---------------------------------- 
                span(v-if="rawStratParams.sellIfPrice ==='increase'")
                  h6.font_weight Sell If There's a Price increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL PRICE
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.priceIncreaseAmt') 
                //--------------------------------------- rawStratParams.sellIfVol === decrease ---------------------------------- 
                span(v-if="rawStratParams.sellIfVol ==='decrease'")
                  h6.font_weight Sell If There's a Volume decrease
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolDecreaseAmt') 
                    
                //--------------------------------------- rawStratParams.sellIfVol === increase ---------------------------------- 
                span(v-if="rawStratParams.sellIfVol ==='increase'")
                  h6.font_weight Sell If There's a Volume increase
                    .tooltip
                      img(src='/assets/question_yellow.jpeg', width='10', height='10')
                      h3.tooltiptext.tooltip_font SELL VOLUME
                        hr(width='70%')
                        span Bacon ipsum dolor amet corned beef prosciutto capicola
                    input.Inputcolor(v-model='rawStratParams.thresholds.tradeVolIncreaseAmt') 


        //--------------------------------------- PRICE/VOLUME PERSISTENCE THRESHOLD   ----------------------------------       
        
        
        //--------------------------------------- CHANGETYPE PARAMETER  === #  ---------------------------------- 
        span(v-if="rawStratParams.tradeFactors === 'price'")
          hr(width='70%')
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy Price Persistence Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY PRICE PERSISTENCE THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.buyPricePersistenceThreshold') 

            .grd-row-col-2-6.mx1.center_box  
              h6.font_weight Sell Price Persistence Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL PRICE PERSISTENCE THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.sellPricePersistenceThreshold') 
        

        span(v-if="rawStratParams.tradeFactors === 'volume'")
          hr(width='70%')
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy Volume Persistence Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY VOLUME PERSISTENCE THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.buyVolPersistenceThreshold') 

            .grd-row-col-2-6.mx1.center_box  
              h6.font_weight Sell Volume Persistence Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL VOLUME PERSISTENCE THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.sellVolPersistenceThreshold') 
        
        span(v-if="rawStratParams.tradeFactors === 'price&volume'")
          hr(width='70%')
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy Volume Persistence Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY VOLUME PERSISTENCE THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.buyVolPersistenceThreshold') 
            .grd-row-col-2-6.mx1.center_box  
              h6.font_weight Sell Volume Persistence Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL VOLUME PERSISTENCE THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.sellVolPersistenceThreshold') 

          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Buy Price Persistence Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font BUY VOLUME PERSISTENCE THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.buyPricePersistenceThreshold') 

            .grd-row-col-2-6.mx1.center_box  
              h6.font_weight Sell Price Persistence Threshold
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font SELL VOLUME PERSISTENCE THRESHOLD
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                input.Inputcolor(v-model='rawStratParams.sellPricePersistenceThreshold') 

        


        span(v-if="rawStratParams.tradeFactors != 'thresholds'")
          hr(width='70%')
          .grd-row
            .grd-row-col-2-6.mx1.center_box
              h6.font_weight Price Protection
                .tooltip
                  img(src='/assets/question_yellow.jpeg', width='10', height='10')
                  h3.tooltiptext.tooltip_font PRICE PROTECTION 
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
                .custom-select.button
                  select(v-model='rawStratParams.priceProtection')
                    option(disabled='', value='') Please select one
                    option disabled
                    option enabled 
        hr(width='70%')
        .grd-row
          .grd-row-col-2-6.mx1.center_box
            h6.font_weight Buy Immediately 
              .tooltip
                img(src='/assets/question_yellow.jpeg', width='10', height='10')
                h3.tooltiptext.tooltip_font BUY IMMEDIATELY 
                    hr(width='70%')
                    span Bacon ipsum dolor amet corned beef prosciutto capicola
              .custom-select.button
                select(v-model='rawStratParams.buyImmediately')
                  option(disabled='', value='') Please select one
                  option yes
                  option no
                          
                      
       
       
       
        
      
</template>

<script>


import _ from 'lodash'
import { get } from '../../../tools/ajax'
 


export default {
  data: () => {
    return {
      strategies: [],
      
      candleSizeUnit: 'hours',
      rawCandleSize: 1,

      strategy: 'MACD',
      historySize: 10,

      rawStratParams: '',
      rawStratParamsError: false,

      emptyStrat: false,
      stratParams: {},

      strategyInfo: ' More Details about MACD Strategy Visit This ',
      strategyUrl: 'http://traderhq.com/ultimate-guide-to-the-macd-indicator/',

      present: true,
   
      

     
    
   
     

    };
  },components: {

    
  },
  created: function () {
    // *********
    // created function: this function initialize the strategies from the router strategies.js
    // ********


    //from what I can understand this is a get request that references the strategies.js in the router folder
    //I believe it is returning data for each .toml file
    get('strategies', (err, data) => {
     
        //ORIGINAL
        //return message with data from Get request
        this.strategies = data;
        
        //ORIGINAL
        _.each(this.strategies, function(s) {
          s.empty = s.params === '';
        });

      // returns a list of parameters for MACD strategy which is the given initial value


        try {

        //NOT ORIGINAL
        //Option 1: parse the TOML into JSON
        this.rawStratParams = toml.parse(_.find(this.strategies, { name: this.strategy }).params);
        //  alert(this.rawStratParams.short);

        }
        catch(e){
         alert("error");
        }
        
        //ORIGINAL //Option 2: does not parse TOML into JSON
        // this.rawStratParams = _.find(this.strategies, { name: this.strategy }).params;




        //NOT ORIGINAL
        // this.stratParams = rawStratParams;

        //ORIGINAL
        //checks if strategies have any parameters or not
        this.emptyStrat = _.find(this.strategies, { name: this.strategy }).empty;

        //ORIGINAL
        //calls function that will load data from rawStratParams into config
     //   var stratParamsConvert = this.rawStratParams; //
       // this.rawStratParams = json2toml({stratParamsConvert}); //
        this.emitConfig();
    });
  },
  watch: {
     // *********
    // watch function: this function watches when user changes strategies and parameter data
    // ********
    strategy: function(strat) {
         
     
      if (strat === 'MACD'){
        this.strategyInfo = ' For More Details about MACD Strategy Visit This '
        this.strategyUrl = 'http://traderhq.com/ultimate-guide-to-the-macd-indicator/'
        this.present = true;
      }else if(strat ==='CCI'){
        this.strategyInfo= ' For More Information About CCI Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/articles/active-trading/031914/how-traders-can-utilize-cci-commodity-channel-index-trade-stock-trends.asp'
        this.present = true;
      } else if(strat ==='DEMA'){
        this.strategyInfo= ' For More Information About DEMA Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/110414/what-are-common-trading-strategies-used-double-exponential-moving-average-dema.asp'
        this.present = true;
      } else if(strat ==='PPO'){
        this.strategyInfo= ' For More Information About PPO Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/021315/what-common-strategy-traders-implement-when-using-percentage-price-oscillator-ppo.asp'
        this.present = true;
      } else if(strat ==='RSI'){
        this.strategyInfo= ' For More Information About RSI Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/011015/how-do-i-use-relative-strength-index-rsi-create-forex-trading-strategy.asp'
        this.present = true;
      } else if(strat ==='StochRSI'){
        this.strategyInfo= ' For More Information About StochRSI Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031315/how-do-i-build-profitable-strategy-when-spotting-stochrsi-pattern.asp'
        this.present = true;
      } else if(strat ==='TSI'){
        this.strategyInfo= ' For More Information About TSI Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031215/how-are-true-strength-index-tsi-patterns-interpreted-analysts-and-traders.asp'
        this.present = true;
      } else if(strat ==='UO'){
        this.strategyInfo= ' For More Information About UO Strategy Visit This '
        this.strategyUrl = 'http://www.investopedia.com/ask/answers/031215/what-common-strategy-traders-implement-when-using-ultimate-oscillator.asp'
        this.present = true;
      } else if(strat ==='custom'){
        this.strategyInfo= ' For More Information About Custom Strategies Visit This '
        this.strategyUrl = '#/customstrategyexplanation/customstrategyexplanation'
        this.present = true;
      } else{
        this.strategyInfo= ' There is Currently No Support Information For This Strategy '
        this.strategyUrl = 'javascript:void(0);'
        this.present = false;
      }


     

      

      //listens when user changes strategy toml format
      strat = _.find(this.strategies, { name: strat });

   
      //this might be the strategies we edit. he makes a copy that he creates the config with
      //this changes the input when a user selects a different strategy
  
    


    try{
      //NOT ORIGINAL
      this.rawStratParams = toml.parse(strat.params);
      
    }catch(e){
         alert("error");
    }
      //ORIGINAL
      // this.rawStratParams = strat.params;
     
      //NOT ORIGINIAL
      this.stratParams = this.rawStratParams;


      this.emptyStrat = strat.empty;


      this.emitConfig();

      
  
    },
    candleSize: function() { this.emitConfig() },
    historySize: function() { this.emitConfig() },
    rawStratParams: function() { this.emitConfig() }
  },
  computed: {

  
    candleSize: function() {
       if(this.candleSizeUnit === 'minutes')
        return this.rawCandleSize;
      else if(this.candleSizeUnit === 'hours')
        return this.rawCandleSize * 60;
      else if(this.candleSizeUnit === 'days')
        return this.rawCandleSize * 60 * 24;
    },
    singularCandleSizeUnit: function() {
      // hours -> hour
      return this.candleSizeUnit.slice(0, -1);
    },
    config: function() {
      let config = {
        tradingAdvisor: {
          enabled: true,
          method: this.strategy,
          candleSize: +this.candleSize,
          historySize: +this.historySize
        }
      }


      if(this.emptyStrat)
        config[this.strategy] = {__empty: true}
      else

        config[this.strategy] = this.stratParams;
        //puts json strategies into config

      return config;
    }
  },
  methods: {
    humanizeDuration: (n) => window.humanizeDuration(n),

    

    emitConfig: function() {

      //calls the parseParams function to put data in JSON format to send to parent which I believe is new.js. 
      //So final form of data is JSON
      this.parseParams();


      //calls the config function to set the configuration
      this.$emit('stratConfig', this.config);
    },
    parseParams: function() {

        // *********
    // paraseParams function: this function should take values and put them into stratParams
    // ********
      try {
        
       
        // NOT ORIGINAL
        //updates stratParams with edited parameters
        this.stratParams = this.rawStratParams;

        //NOT ORIGINAL
        //UPDATING VALUES IN STRATEGIES PARAMETERS FROM USER DROP DOWNS
        
      //  alert(this.stratParams.buyImmediately);
      
        // ORIGINAL
        //parse raw parameters back to strats
        // this.stratParams = toml.parse(this.rawStratParams);
        this.rawStratParamsError = false;
      } catch(e) {
        this.rawStratParamsError = e;
        this.stratParams = {};
      }
    },
    
    showHide: function(){
      var x = document.getElementById("parameterDiv");
      if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }   
    }
  }
}
</script>
<style>
.align .custom-select select {
  padding: 0.4em 1.2em .3em .8em;
}

.label_color{
  color: white;
}
.label-like {
  display: block;
  font-size: 0.9em;
  color: white;
}
.TextAreacolor{
  color:black
}
.Inputcolor{
  background-color:white;
  color: black;
}
.center4{
  
 justify-content: center;
}
.center5{
  text-align: center;
  padding-bottom: 2%;
}

.font_bold{
  font-weight: 100;
}

.align {
  padding-left: 1em;
}

.question {
  padding-left: 1em;
  padding-top: 2em;
}

.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
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
    bottom: 125%;
    left: 50%;
    margin-left: -125px;
    opacity: 0;
    transition: opacity 1s;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}

.exchange_align2{
  display: inline-block;
}


.strategy_header{
  
  text-transform: uppercase;
}




#parameterDiv{
    display:none;
}
.reduced-margin{
    margin-left: -30%;
  }
  
.reduced-div-margin{
    margin-left: -60%;
  }  

.center-button{
    margin-left:30%;
}


.tooltip_font{
  font-size: 5rem;
  font-weight: 100;
}


.font_weight{
  font-weight: 100;
}

.center_box {
    margin: auto;
  
}
</style>
