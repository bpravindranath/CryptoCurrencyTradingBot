<template lang='jade'>
    .reduced-margin
     .flex-container4(v-html='left')
</template>

<script>
  import marked from '../../tools/marked';

  const left = marked(`

  ### How to Use Gekko TU's Custom Strategy

  <hr>
  <p style='font-size: 20px;font-weight: bold;'>Capabilities of the Custom Strategy</p>
    <p style='color: #ffffff'>The custom strategy option allows users to configure a trade strategy directly from their browser. It is a simple, but powerful alternative to other strategies available in Gekko TU which are tied to technical indicators. The custom strategy does not use technical indicators. A user can decide to make trades based on:</p>

    <ul>
     <li><b>Percent or Value Changes in: </b></li>
      <ul>
     <li>Price</li>
     <li>Trade volume</li>
     <li>Both price and trade volume</li>
     </ul>
     <li>Particular price thresholds, e.g. buy when price is $5,000 or below and sell when price is $5,500 or more</li>
     </ul>

   <p style='font-size: 17px; color: #ffffff;font-weight:bold;'>Details about Price &amp; Trade Volume</p>
   <p style='color: #ffffff;text-decoration:underline;'>Price</p>
   <p style='color: #ffffff;'>The user has several alternatives when including price in their custom strategy. They can use the open/close price of one particular candle, in which the change calculated will reflect the difference between the close price and the open price. Other options are to use the high price or low price, which will compute the difference between the high or low of the most recent candle and the high or low of the candle prior.</p>

   <p style='color: #ffffff;text-decoration:underline;'>Trade Volume</p>
   <p style='color: #ffffff;'>The change in trade volume is determined by calculating the difference between the most recent candle's trade volume and the trade volume of the candle prior.</p>
   <p style='color: #ffffff;'> <i>Please Note: When using a combination of price and trade volume, the change values calculated must be quantified in the same way. This means users must set the changeType parameter to either '#' or '%' to make decisions based on either value changes or percent changes. For example, a custom strategy cannot combine percent changes in price and value changes in trade volume.</i></p>
   <p style='font-size: 20px;font-weight: bold;'>Explanation of Parameters in the Custom Strategy &amp; Their Options</p>
   <p style='color: #ffffff;'>Please review the meaning of the parameters presented in the custom strategy, as well as their possible values, before starting a custom strategy. Note that all single quotation marks in the parameters box must not be removed. For example: priceProtection:'disabled' is correct whereas priceProtection: disabled is not.</p>
    <table id="explanation"><tr><th>Parameter<th>Possible Values<th>Explanation<tr><td>buyImmediately<td>'yes', 'no'<td>Make an initial buy as soon as the trade bot starts, even if purchase parameters are not met. Will only be performed once, as the first trade.<tr><td>tradeFactors<td>'price', 'volume', 'price&volume', 'thresholds'<td>The factor(s) that will be evaluated on every candle to determine whether to make a trade. Use 'price' to look only at changes in price, 'volume' to look only at changes in trade volume, 'price&volume' to look at changes in both, or 'thresholds' to set particular buy and sell prices.<tr><td>priceType<td>'open/close', 'high', 'low'<td>The type of price that will be used to calculate changes. 'open/close' uses one candle's open and closing prices, 'high' uses the difference in the high price of the most recent candle compared to the previous candle. 'low' is used in the same way as 'high' except candle low prices are used.<tr><td>buyIfPrice<td>'decrease', 'increase'<td>If trade factors include price, make a purchase when there is either a price 'decrease' or, alternatively, if there is a price 'increase'.<tr><td>sellIfPrice<td>'decrease', 'increase'<td>If trade factors include price, make a sale when there is either a price 'decrease' or, alternatively, if there is a price 'increase'.<tr><td>buyIfVol<td>'decrease', 'increase'<td>If trade factors include trade volume, make a purchase when there is either a trade volume 'decrease' or, alternatively, if there is a trade volume 'increase'.<tr><td>sellIfVol<td>'decrease', 'increase'<td>If trade factors include trade volume, make a sale when there is either a trade volume 'decrease' or, alternatively, if there is a trade volume 'increase'.<tr><td>changeType<td>'#', '%'<td>How the change used to make trade decisions should be quantified. '#' is used for amount changes, e.g. a change of -5 if the factor goes from 10 to 5. '%' is used for percent changes, e.g. a change of -50% if the factor goes from 10 to 5.<tr><td>buyPricePersistenceThreshold<td>A numeric value greater than or equal to 1<td>If trade factors include price, this is how many candles in a row the specified trend must hold true before making a purchase. Has no impact if tradeFactors is not 'price' or 'price&volume'.<tr><td>sellPricePersistenceThreshold<td>A numeric value greater than or equal to 1<td>If trade factors include price, this is how many candles in a row the specified trend must hold true before making a sale. Has no impact if tradeFactors is not 'price' or 'price&volume'.<tr><td>buyVolPersistenceThreshold<td>A numeric value greater than or equal to 1<td>If trade factors include trade volume, this is how many candles in a row the specified trend must hold true before making a purchase. Has no impact if tradeFactors is not 'volume' or 'price&volume'.<tr><td>sellVolPersistenceThreshold<td>A numeric value greater than or equal to 1<td>If trade factors include trade volume, this is how many candles in a row the specified trend must hold true before making a sale. Has no impact if tradeFactors is not 'volume' or 'price&volume'.<tr><td>priceProtection<td>'disabled', 'enabled'<td>If set to enabled, ensures that a sale is not made until the sale price is greater than the most recent purchase price. For example, if last purchase was made for $6,000, the bot will not sell until the price is greater than $6,000, even if the specified sale trend occurs.<tr><td>nextActionBuy<td>'yes', 'no'<td>Used by the bot and should not be adjusted by users. The first action completed by the bot will always be a purchase. After a purchase has been made, its next action will be to sell. The bot will not make two purchases in a row or two sales in a row.<tr><td>nextActionSell<td>'yes', 'no'<td>Used by the bot and should not be adjusted by users. The second action completed by the bot will always be a sale. After a sale has been made, its next action will be to buy. The bot will not make two purchases in a row or two sales in a row.<tr><td>thresholds: priceDecreaseAmt<td>Any numeric value greater than or equal to 0<td>The amount by which the user wants the price to decrease prior to selling or buying. Has no impact unless price is a trade factor and changeType is '#'.<tr><td>thresholds: priceIncreaseAmt<td>Any numeric value greater than or equal to 0<td>The amount by which the user wants the price to increase prior to selling or buying. Has no impact unless price is a trade factor and changeType is '#'.<tr><td>thresholds: priceDecreasePer<td>Any numeric value greater than or equal to 0<td>The percentage by which the user wants the price to decrease prior to selling or buying. Has no impact unless price is a trade factor and changeType is '%'. Note: enter the actual percentage, e.g. for 10% enter 10 rather than 0.1<tr><td>thresholds: priceIncreasePer<td>Any numeric value greater than or equal to 0<td>The percentage by which the user wants the price to increase prior to selling or buying. Has no impact unless price is a trade factor and changeType is '%'. Note: enter the actual percentage, e.g. for 10% enter 10 rather than 0.1<tr><td>thresholds: tradeVolDecreaseAmt<td>Any numeric value greater than or equal to 0<td>The amount by which the user wants the trade volume to decrease prior to selling or buying. Has no impact unless volume is a trade factor and changeType is '#'.<tr><td>thresholds: tradeVolIncreaseAmt<td>Any numeric value greater than or equal to 0<td>The amount by which the user wants the trade volume to increase prior to selling or buying. Has no impact unless volume is a trade factor and changeType is '#'.<tr><td>thresholds: tradeVolDecreasePer<td>Any numeric value greater than or equal to 0<td>The percentage by which the user wants the trade volume to decrease prior to selling or buying. Has no impact unless volume is a trade factor and changeType is '%'. Note: enter the actual percentage, e.g. for 10% enter 10 rather than 0.1<tr><td>thresholds: tradeVolIncreasePer<td>Any numeric value greater than or equal to 0<td>The percentage by which the user wants the trade volume to increase prior to selling or buying. Has no impact unless volume is a trade factor and changeType is '%'. Note: enter the actual percentage, e.g. for 10% enter 10 rather than 0.1<tr><td>thresholds: buyPriceThreshold<td>Any numeric value greater than or equal to 0<td>The maximum price at which a user wants to buy. For example, if the buyPriceThreshold is $5,650, if the price falls to $5,650 or below, a purchase can be made.<tr><td>thresholds: sellPriceThreshold<td>Any numeric value greater than or equal to 0<td>The minimum price at which a user wants to sell. For example, if the sellPriceThreshold is $5,750, if the price rises to $5,750 or higher, a sale can be made.</table>
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
  
  #explanation {
    width: 100%;
  }

  #explanation th, #explanation td {
    border: 1px solid #c6cbd1;
    padding: 8px 12px;
  }

  #explanation tr:nth-child(2n) {
    background-color: #636b73;
  }
</style>
