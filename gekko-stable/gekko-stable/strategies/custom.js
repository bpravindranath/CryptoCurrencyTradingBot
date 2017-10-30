var log = require('../core/log');
var config = require('../core/util.js').getConfig();
var watchConfig = config.watch;
var settings = config.custom;
var async = require('async');

// Let's create our own strat
var strat = {};

// Prepare everything our method needs
strat.init = function() {
    this.requiredHistory = 0; 
    //Calculations and Indicators
    var counter = 0;
    var changeinPriceAmt = 0;
    var changeinPricePer = 0;
    var prevTradeVol = 0;
    var changeinTradeVolAmt = 0;
    var changeinTradeVolPer = 0;
    this.addIndicator('changeinPriceAmt', 'MACD', this.settings);
    this.addIndicator('changeinPricePer', 'MACD', this.settings);
    this.addIndicator('changeinTradeVolAmt', 'MACD', this.settings);
    this.addIndicator('changeinTradeVolPer', 'MACD', this.settings);
    var previousAction = 0; //0 for sell, 1 for buy see this page https://github.com/askmike/gekko/issues/844
    var adviceGiven = 0; // Whether trade advice has been given
    var buyPersistence = 0; // How long trend has continued in terms of candles
    var sellPersistence = 0; // How long trend has continued in terms of candles
    var prevVoltoPrint = 0; // variable used for printing purposes only
    var buyPrice = 0;
    
    //User Selections
    var selectedPrice = 1; //User selected price as factor to look at when making decisions
    var selectedTradeVol = 0; // User selected trade volume as factor to look at when making decisions
    var selectedCircSupply = 0; // User selected circulating supply as factor to look at when making decisions (do this if we have time)
    var buyDirectionDecrease = 1; // User selected to buy when there's been a decrease in whatever factor selected 
    var buyDirectionIncrease = 0; // User selected to buy when there's been an increase in whatever factor selected  
    var sellDirectionDecrease = 0; // User selected to sell when there's been a decrease in whatever factor selected 
    var sellDirectionIncrease = 1; // User selected to sell when there's been an increase in whatever factor selected  
    var selectedAmt = 1; //User thresholds are in $, eg buy when price decreases by $5
    var selectedPer = 0; //User thresholds are in %, eg buy when price decreases by 5%
    var selectedActionBuy = 1; // User selected to buy when conditions have been met
    var selectedActionSell = 0; // User selected to sell when conditions have been met
    var selectedThresholds = 0; //User wants to buy and sell based on specific threshold values
    var priceDecreaseAmt = 0.00001; //Amount ($) by which user wants price to decrease before taking action
    var priceIncreaseAmt = 0.00001; // Amount ($) by which user wants price to increase before taking action
    var priceDecreasePer = 0.000001; // % by which user wants price to decrease before taking action
    var priceIncreasePer = 0.000001; // % by which user wants price to increase before taking action
    var tradeVolDecreaseAmt = 0.00001; //Amount by which user wants trade volume to decrease before taking action
    var tradeVolIncreaseAmt = 0.00001; // Amount by which user wants trade volume to increase before taking action
    var tradeVolDecreasePer = 0.000001; // % by which user wants trade volume to decrease before taking action
    var tradeVolIncreasePer = 0.000001; // % by which user wants trade volume to increase before taking action
    var buyPriceThreshold = 5650; // Price at or below which user wants to buy
    var sellPriceThreshold = 5660; // Price at or above which user wants to sell
    var buyPersistenceThreshold = 3; //how many candles for which trend must hold before buy is completed (min 1)
    var sellPersistenceThreshold = 2; //how many candles for which trend must hold before sell is completed (min 1)
    var selectedPriceProtection = 0; //ensure that sell price is higher than buy price

} //end init

// What happens on every new candle?
strat.update = function(candle) {
    this.settings.adviceGiven = 0;
    //Price
    //Compute change in price as an amount
    this.settings.changeinPriceAmt = (candle.close - candle.open);
    //Compute change in price as a percentage
    this.settings.changeinPricePer = ((candle.close - candle.open)/candle.open) * 100;
    //Trade Volume
    //Set baseline for trade volume
    if(this.counter){
        //Compute change in trade volume as an amount
        this.settings.changeinTradeVolAmt = this.candle.volume - this.settings.prevTradeVol;    
        //Compute change in trade volume as a percentage
        this.settings.changeinTradeVolPer = ((this.candle.volume - this.settings.prevTradeVol)/this.settings.prevTradeVol) * 100; 
        this.settings.prevVoltoPrint = this.settings.prevTradeVol;
        this.settings.prevTradeVol = this.candle.volume;
    }
    else{
        this.settings.prevTradeVol = this.candle.volume;  
        this.counter = 1;     
        this.settings.initBalance = watchConfig.currency + watchConfig.asset
        this.settings.currentBalance = this.settings.initBalance;
    }
    //Circulating Supply - implement later
        
} // end update

// For debugging purposes.
strat.log = function() {
    log.debug('------Price Information------');
    log.debug('Open Price: ', this.candle.open, ' Close Price: ', this.candle.close, ' High: ', this.candle.high, ' Low: ', this.candle.low);
    log.debug('Change in Price: $', this.settings.changeinPriceAmt.toFixed(8), ' (', this.settings.changeinPricePer.toFixed(8), '%)');
    log.debug('------Trade Volume Information------');    
    log.debug('This Candle\'s Trade Volume: ', this.candle.volume.toFixed(8), ' Previous Trade Volume: ', this.settings.prevVoltoPrint.toFixed(8));    
    log.debug('Change in Trade Volume: ', this.settings.changeinTradeVolAmt.toFixed(8), ' (', this.settings.changeinTradeVolPer.toFixed(8), '%)' );     
} // end log

// Based on the newly calculated information, check if we should update or not.
strat.check = function(candle) {
    //User selected change in price as factor to watch
    if(this.settings.selectedPrice == 1){
        //User is looking at $ changes (as opposed to %)
        if(this.settings.selectedAmt == 1){
            //User wants to buy when there's been a decrease in price in terms of $
            if (this.settings.buyDirectionDecrease == 1){
                //The decrease in price is at least how much the user specified
                if(this.settings.changeinPriceAmt <= (this.settings.thresholds.priceDecreaseAmt * -1)){
                    //Increment the persistence value as the trend continued for another candle
                    if(this.buyPersistence){
                        this.buyPersistence = this.buyPersistence +1;
                    }
                    else{
                        this.buyPersistence = 1;
                    }
                    log.debug('Actual Buy Persistence: ', this.buyPersistence, ' Persistence Threshold: ', this.settings.buyPersistenceThreshold);                    
                    //User selected to buy when the price decreased by at least the specified amount and the trend held            
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) && (this.buyPersistence >= this.settings.buyPersistenceThreshold)){
                        this.advice('long');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE     Buying at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                        this.previousAction = 1;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 1;
                        this.settings.selectedActionBuy = 0;   
                        this.buyPersistence = 0;
                        this.buyPrice = this.candle.close;
                    }
                }
                //The trend didn't continue, so reset the actual persistence value
                else{
                    this.buyPersistence = 0;
                }
            } // end buyDirectionDecrease
            
            //User wants to sell when there's been a decrease in price in terms of $
            if (this.settings.sellDirectionDecrease == 1){  
                //The decrease in price is at least how much the user specified                
                if(this.settings.changeinPriceAmt <= (this.settings.thresholds.priceDecreaseAmt * -1)){
                    //Increment the persistence value as the trend continued for another candle                    
                    if(this.sellPersistence){
                        this.sellPersistence = this.sellPersistence +1;
                    }
                    else{
                        this.sellPersistence = 1;
                    }
                    log.debug('Actual Sell Persistence: ', this.sellPersistence, ' Persistence Threshold: ', this.settings.sellPersistenceThreshold);                    
                    //User selected to sell when the price decreased by at least the specified amount and the trend held                  
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1) && (this.sellPersistence >= this.settings.sellPersistenceThreshold) ){    
                        if(this.settings.selectedPriceProtection == 1){
                            if(this.candle.close > this.buyPrice){
                                this.advice('short');  
                                this.settings.adviceGiven = 1;
                                log.debug('******TRADE    Selling at: ', this.candle.close); 
                                //log.debug('Overall Profit& Loss: ', this.overallProfit);             
                                this.previousAction = 0; 
                                //Have to reset this because can't keep selling after you've sold everything
                                this.settings.selectedActionBuy = 1;       
                                this.settings.selectedActionSell= 0;
                                this.sellPersistence = 0;                                
                            }
                            else{
                                
                            }
                        }
                        else if(this.settings.selectedPriceProtection == 0){
                            this.advice('short');  
                            this.settings.adviceGiven = 1;
                            log.debug('******TRADE    Selling at: ', this.candle.close); 
                            //log.debug('Overall Profit& Loss: ', this.overallProfit);             
                            this.previousAction = 0; 
                            //Have to reset this because can't keep selling after you've sold everything
                            this.settings.selectedActionBuy = 1;       
                            this.settings.selectedActionSell= 0;
                            this.sellPersistence = 0;
                        }
                    }                    
                }
                //The trend didn't continue, so reset the actual persistence value                
                else{
                    this.sellPersistence = 0;
                }
            } // end sellDirectionDecrease
            //User wants to buy when there's been an increase in price in terms of $            
            if (this.settings.buyDirectionIncrease == 1){              
                //The increase in price is at least how much the user specified                   
                if(this.settings.changeinPriceAmt >= (this.settings.thresholds.priceIncreaseAmt)){
                    //Increment the persistence value as the trend continued for another candle                      
                    if(this.buyPersistence){
                        this.buyPersistence = this.buyPersistence +1;
                    }
                    else{
                        this.buyPersistence = 1;
                    }                    
                    log.debug('Actual Buy Persistence: ', this.buyPersistence, ' Persistence Threshold: ', this.settings.buyPersistenceThreshold);              
                    //User selected to buy when the price increased by at least the specified amount and the trend held 
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) && (this.buyPersistence >= this.settings.buyPersistenceThreshold)){                    
                        this.advice('long');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Buying at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                        this.previousAction = 1;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 1;
                        this.settings.selectedActionBuy = 0;   
                        this.buyPersistence = 0;
                    }    
                }
                else{
                    this.buyPersistence = 0;
                }    
            }//end if buyDirectionIncrease
            //User wants to sell when there's been an increase in price in terms of $               
            if (this.settings.sellDirectionIncrease == 1){
                //The increase in price is at least how much the user specified                  
                if(this.settings.changeinPriceAmt >= (this.settings.thresholds.priceIncreaseAmt)){
                    //Increment the persistence value as the trend continued for another candle                       
                    if(this.sellPersistence){
                        this.sellPersistence = this.sellPersistence +1;
                    }
                    else{
                        this.sellPersistence = 1;
                    }    
                    log.debug('Actual Sell Persistence: ', this.sellPersistence, ' Persistence Threshold: ', this.settings.sellPersistenceThreshold);           
                    //User selected to sell when the price increased by at least the specified amount and the trend held 
                    if( (this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1) && (this.sellPersistence >= this.settings.sellPersistenceThreshold)){      
                        if(this.settings.selectedPriceProtection == 1){
                            if(this.candle.close > this.buyPrice){
                                this.advice('short');  
                                this.settings.adviceGiven = 1;
                                log.debug('******TRADE    Selling at: ', this.candle.close); 
                                //log.debug('Overall Profit& Loss: ', this.overallProfit);             
                                this.previousAction = 0; 
                                //Have to reset this because can't keep selling after you've sold everything
                                this.settings.selectedActionBuy = 1;       
                                this.settings.selectedActionSell= 0;
                                this.sellPersistence = 0;                                
                            }
                            else{
                                
                            }
                        }
                        else if(this.settings.selectedPriceProtection == 0){
                            this.advice('short');  
                            this.settings.adviceGiven = 1;
                            log.debug('******TRADE    Selling at: ', this.candle.close); 
                            //log.debug('Overall Profit& Loss: ', this.overallProfit);             
                            this.previousAction = 0; 
                            //Have to reset this because can't keep selling after you've sold everything
                            this.settings.selectedActionBuy = 1;       
                            this.settings.selectedActionSell= 0;
                            this.sellPersistence = 0;
                        }
                    }    
                }
                else{
                    this.sellPersistence = 0;
                }  
            }//end if sellDirectionIncrease            
        }//end selectedAmt
        
        //User is looking at % changes (as opposed to $)        
        else if(this.settings.selectedPer == 1){
            //User wants to buy when there's been a decrease in price in terms of %
            if (this.settings.buyDirectionDecrease == 1){
                //The % decrease in price is at least how much the user specified
                if(this.settings.changeinPricePer <= (this.settings.thresholds.priceDecreasePer)){ //removed * -1
                    //Increment the persistence value as the trend continued for another candle
                    if(this.buyPersistence){
                        this.buyPersistence = this.buyPersistence +1;
                    }
                    else{
                        this.buyPersistence = 1;
                    }
                    log.debug('Actual Buy Persistence: ', this.buyPersistence, ' Persistence Threshold: ', this.settings.buyPersistenceThreshold);                    
                    //User selected to buy when the price decreased by at least the specified % and the trend held            
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) && (this.buyPersistence >= this.settings.buyPersistenceThreshold)){
                        this.advice('long');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Buying at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                        this.previousAction = 1;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 1;
                        this.settings.selectedActionBuy = 0;   
                        this.buyPersistence = 0;                        
                    }
                }
                //The trend didn't continue, so reset the actual persistence value
                else{
                    this.buyPersistence = 0;
                }
            } // end buyDirectionDecrease
            
            //User wants to sell when there's been a decrease in price in terms of %
            if (this.settings.sellDirectionDecrease == 1){  
                //The % decrease in price is at least how much the user specified                
                if(this.settings.changeinPricePer <= (this.settings.thresholds.priceDecreasePer)){ // removed * -1
                    //Increment the persistence value as the trend continued for another candle                    
                    if(this.sellPersistence){
                        this.sellPersistence = this.sellPersistence +1;
                    }
                    else{
                        this.sellPersistence = 1;
                    }
                    log.debug('Actual Sell Persistence: ', this.sellPersistence, ' Persistence Threshold: ', this.settings.sellPersistenceThreshold);                    
                    //User selected to sell when the price decreased by at least the specified amount and the trend held                  
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1) && (this.sellPersistence >= this.settings.sellPersistenceThreshold) ){                        
                        this.advice('short');  
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Selling at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);             
                        this.previousAction = 0; 
                        //Have to reset this because can't keep selling after you've sold everything
                        this.settings.selectedActionBuy = 1;       
                        this.settings.selectedActionSell= 0;
                        this.sellPersistence = 0;
                    }                    
                }
                //The trend didn't continue, so reset the actual persistence value                
                else{
                    this.sellPersistence = 0;
                }
            } // end sellDirectionDecrease
            //User wants to buy when there's been an increase in price in terms of %            
            if (this.settings.buyDirectionIncrease == 1){              
                //The increase in price is at least how much the user specified                   
                if(this.settings.changeinPricePer >= (this.settings.thresholds.priceIncreasePer)){
                    //Increment the persistence value as the trend continued for another candle                      
                    if(this.buyPersistence){
                        this.buyPersistence = this.buyPersistence +1;
                    }
                    else{
                        this.buyPersistence = 1;
                    }                    
                    log.debug('Actual Buy Persistence: ', this.buyPersistence, ' Persistence Threshold: ', this.settings.buyPersistenceThreshold);              
                    //User selected to buy when the price increased by at least the specified amount and the trend held 
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) && (this.buyPersistence >= this.settings.buyPersistenceThreshold)){                    
                        this.advice('long');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Buying at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                        this.previousAction = 1;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 1;
                        this.settings.selectedActionBuy = 0;   
                        this.buyPersistence = 0;
                    }    
                }
                else{
                    this.buyPersistence = 0;
                }    
            }//end if buyDirectionIncrease
            //User wants to sell when there's been an increase in price in terms of %               
            if (this.settings.sellDirectionIncrease == 1){
                //The increase in price is at least how much the user specified                  
                if(this.settings.changeinPricePer >= (this.settings.thresholds.priceIncreasePer)){
                    //Increment the persistence value as the trend continued for another candle                       
                    if(this.sellPersistence){
                        this.sellPersistence = this.sellPersistence +1;
                    }
                    else{
                        this.sellPersistence = 1;
                    }    
                    log.debug('Actual Sell Persistence: ', this.sellPersistence, ' Persistence Threshold: ', this.settings.sellPersistenceThreshold, ' Advice Given: ', this.settings.adviceGiven, ' selectedActionSell: ', this.settings.selectedActionSell);           
                    //User selected to sell when the price increased by at least the specified amount and the trend held 
                    if( (this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1) && (this.sellPersistence >= this.settings.sellPersistenceThreshold)){                            
                        this.advice('short');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Selling at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);               
                        this.previousAction = 0;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 0;
                        this.settings.selectedActionBuy = 1;       
                        this.sellPersistence = 0;
                    }    
                }
                else{
                    this.sellPersistence = 0;
                }
            }//end if sellDirectionIncrease                      
            
        } // end selectedPer
    } //end selectedPrice
    
    //User selected specific price thresholds as factors to watch
    else if(this.settings.selectedThresholds == 1){
        //Candle's close value is less than or equal to user's specified buy threshold, so buy
        if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) ){
            if (candle.close <= (this.settings.thresholds.buyPriceThreshold)){
                this.advice('long');
                this.settings.adviceGiven = 1;
                log.debug('******TRADE    Buying at: ', this.candle.close); 
                //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                this.previousAction = 1;
                //Have to reset this because can't keep buying after you've used all your money to buy
                this.settings.selectedActionSell = 1;
                this.settings.selectedActionBuy = 0;   
            }
        }
        //Candle's close value is greater than or equal to user's specified sell threshold, so sell                
        else if( (this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1)){
            if (candle.close >=this.settings.thresholds.sellPriceThreshold){                          
                this.advice('short');  
                this.settings.adviceGiven = 1;
                log.debug('******TRADE    Selling at: ', this.candle.close); 
                this.previousAction = 0; 
                //Have to reset this because can't keep selling after you've sold everything
                this.settings.selectedActionBuy = 1;       
                this.settings.selectedActionSell= 0;   
            }
        }       
    }//end selectedThresholds 
    
    //User selected trade volume as factor to watch
    else if(this.settings.selectedTradeVol == 1){
        //User is looking at numerical changes (as opposed to %)
        if(this.settings.selectedAmt == 1){
            //User wants to buy when there's been a decrease in trade volume in terms of amount
            if (this.settings.buyDirectionDecrease == 1){
                //The decrease in trade volume is at least how much the user specified
                if(this.settings.changeinTradeVolAmt <= (this.settings.thresholds.tradeVolDecreaseAmt * -1)){
                    //Increment the persistence value as the trend continued for another candle
                    if(this.buyPersistence){
                        this.buyPersistence = this.buyPersistence +1;
                    }
                    else{
                        this.buyPersistence = 1;
                    }
                    log.debug('Actual Buy Persistence: ', this.buyPersistence, ' Persistence Threshold: ', this.settings.buyPersistenceThreshold);                    
                    //User selected to buy when the trade volume decreased by at least the specified amount and the trend held            
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) && (this.buyPersistence >= this.settings.buyPersistenceThreshold)){
                        this.advice('long');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Buying at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                        this.previousAction = 1;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 1;
                        this.settings.selectedActionBuy = 0;   
                        this.buyPersistence = 0;
                    }
                }
                //The trend didn't continue, so reset the actual persistence value
                else{
                    this.buyPersistence = 0;
                }
            } // end buyDirectionDecrease
            
            //User wants to sell when there's been a decrease in trade volume in terms of amount
            if (this.settings.sellDirectionDecrease == 1){  
                //The decrease in trade volume is at least how much the user specified                
                if(this.settings.changeinTradeVolAmt <= (this.settings.thresholds.tradeVolDecreaseAmt * -1)){
                    //Increment the persistence value as the trend continued for another candle                    
                    if(this.sellPersistence){
                        this.sellPersistence = this.sellPersistence +1;
                    }
                    else{
                        this.sellPersistence = 1;
                    }
                    log.debug('Actual Sell Persistence: ', this.sellPersistence, ' Persistence Threshold: ', this.settings.sellPersistenceThreshold);                    
                    //User selected to sell when the trade volume decreased by at least the specified amount and the trend held                  
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1) && (this.sellPersistence >= this.settings.sellPersistenceThreshold) ){                        
                        this.advice('short');  
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Selling at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);             
                        this.previousAction = 0; 
                        //Have to reset this because can't keep selling after you've sold everything
                        this.settings.selectedActionBuy = 1;       
                        this.settings.selectedActionSell= 0;
                        this.sellPersistence = 0;
                    }                    
                }
                //The trend didn't continue, so reset the actual persistence value                
                else{
                    this.sellPersistence = 0;
                }
            } // end sellDirectionDecrease
            //User wants to buy when there's been an increase in trade volume in terms of amount            
            if (this.settings.buyDirectionIncrease == 1){              
                //The increase in trade volume is at least how much the user specified                   
                if(this.settings.changeinTradeVolAmt >= (this.settings.thresholds.tradeVolIncreaseAmt)){
                    //Increment the persistence value as the trend continued for another candle                      
                    if(this.buyPersistence){
                        this.buyPersistence = this.buyPersistence +1;
                    }
                    else{
                        this.buyPersistence = 1;
                    }                    
                    log.debug('Actual Buy Persistence: ', this.buyPersistence, ' Persistence Threshold: ', this.settings.buyPersistenceThreshold);              
                    //User selected to buy when the trade volume increased by at least the specified amount and the trend held 
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) && (this.buyPersistence >= this.settings.buyPersistenceThreshold)){                    
                        this.advice('long');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Buying at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                        this.previousAction = 1;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 1;
                        this.settings.selectedActionBuy = 0;   
                        this.buyPersistence = 0;
                    }    
                }
                else{
                    this.buyPersistence = 0;
                }    
            }//end if buyDirectionIncrease
            //User wants to sell when there's been an increase in trade volume in terms of amount               
            if (this.settings.sellDirectionIncrease == 1){
                //The increase in trade volume is at least how much the user specified                  
                if(this.settings.changeinTradeVolAmt >= (this.settings.thresholds.tradeVolIncreaseAmt)){
                    //Increment the persistence value as the trend continued for another candle                       
                    if(this.sellPersistence){
                        this.sellPersistence = this.sellPersistence +1;
                    }
                    else{
                        this.sellPersistence = 1;
                    }    
                    log.debug('Actual Sell Persistence: ', this.sellPersistence, ' Persistence Threshold: ', this.settings.sellPersistenceThreshold);           
                    //User selected to sell when the trade volume increased by at least the specified amount and the trend held 
                    if( (this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1) && (this.sellPersistence >= this.settings.sellPersistenceThreshold)){                            
                        this.advice('short');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Selling at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);               
                        this.previousAction = 0;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 0;
                        this.settings.selectedActionBuy = 1;       
                        this.sellPersistence = 0;
                    }    
                }
                else{
                    this.sellPersistence = 0;
                }  
            }//end if sellDirectionIncrease            
        }//end selectedAmt
        
        //User is looking at % changes (as opposed to amount)        
        else if(this.settings.selectedPer == 1){
            //User wants to buy when there's been a decrease in trade volume in terms of %
            if (this.settings.buyDirectionDecrease == 1){
                //The % decrease in trade volume is at least how much the user specified
                if(this.settings.changeinTradeVolPer <= (this.settings.thresholds.tradeVolDecreasePer)){ //removed * -1
                    //Increment the persistence value as the trend continued for another candle
                    if(this.buyPersistence){
                        this.buyPersistence = this.buyPersistence +1;
                    }
                    else{
                        this.buyPersistence = 1;
                    }
                    log.debug('Actual Buy Persistence: ', this.buyPersistence, ' Persistence Threshold: ', this.settings.buyPersistenceThreshold);                    
                    //User selected to buy when the trade volume decreased by at least the specified % and the trend held            
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) && (this.buyPersistence >= this.settings.buyPersistenceThreshold)){
                        this.advice('long');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Buying at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                        this.previousAction = 1;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 1;
                        this.settings.selectedActionBuy = 0;   
                        this.buyPersistence = 0;                        
                    }
                }
                //The trend didn't continue, so reset the actual persistence value
                else{
                    this.buyPersistence = 0;
                }
            } // end buyDirectionDecrease
            
            //User wants to sell when there's been a decrease in trade volume in terms of %
            if (this.settings.sellDirectionDecrease == 1){  
                //The % decrease in trade volume is at least how much the user specified                
                if(this.settings.changeinTradeVolPer <= (this.settings.thresholds.tradeVolDecreasePer)){ // removed * -1
                    //Increment the persistence value as the trend continued for another candle                    
                    if(this.sellPersistence){
                        this.sellPersistence = this.sellPersistence +1;
                    }
                    else{
                        this.sellPersistence = 1;
                    }
                    log.debug('Actual Sell Persistence: ', this.sellPersistence, ' Persistence Threshold: ', this.settings.sellPersistenceThreshold);                    
                    //User selected to sell when the trade volume decreased by at least the specified amount and the trend held                  
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1) && (this.sellPersistence >= this.settings.sellPersistenceThreshold) ){                        
                        this.advice('short');  
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Selling at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);             
                        this.previousAction = 0; 
                        //Have to reset this because can't keep selling after you've sold everything
                        this.settings.selectedActionBuy = 1;       
                        this.settings.selectedActionSell= 0;
                        this.sellPersistence = 0;
                    }                    
                }
                //The trend didn't continue, so reset the actual persistence value                
                else{
                    this.sellPersistence = 0;
                }
            } // end sellDirectionDecrease
            //User wants to buy when there's been an increase in trade volume in terms of %            
            if (this.settings.buyDirectionIncrease == 1){              
                //The increase in trade volume is at least how much the user specified                   
                if(this.settings.changeinTradeVolPer >= (this.settings.thresholds.tradeVolIncreasePer)){
                    //Increment the persistence value as the trend continued for another candle                      
                    if(this.buyPersistence){
                        this.buyPersistence = this.buyPersistence +1;
                    }
                    else{
                        this.buyPersistence = 1;
                    }                    
                    log.debug('Actual Buy Persistence: ', this.buyPersistence, ' Persistence Threshold: ', this.settings.buyPersistenceThreshold);              
                    //User selected to buy when the trade volume increased by at least the specified amount and the trend held 
                    if((this.settings.adviceGiven == 0) && (this.settings.selectedActionBuy == 1) && (this.buyPersistence >= this.settings.buyPersistenceThreshold)){                    
                        this.advice('long');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Buying at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);            
                        this.previousAction = 1;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 1;
                        this.settings.selectedActionBuy = 0;   
                        this.buyPersistence = 0;
                    }    
                }
                else{
                    this.buyPersistence = 0;
                }    
            }//end if buyDirectionIncrease
            //User wants to sell when there's been an increase in trade volume in terms of %               
            if (this.settings.sellDirectionIncrease == 1){
                //The increase in trade volume is at least how much the user specified                  
                if(this.settings.changeinTradeVolPer >= (this.settings.thresholds.tradeVolIncreasePer)){
                    //Increment the persistence value as the trend continued for another candle                       
                    if(this.sellPersistence){
                        this.sellPersistence = this.sellPersistence +1;
                    }
                    else{
                        this.sellPersistence = 1;
                    }    
                    log.debug('Actual Sell Persistence: ', this.sellPersistence, ' Persistence Threshold: ', this.settings.sellPersistenceThreshold);           
                    //User selected to sell when the trade volume increased by at least the specified amount and the trend held 
                    if( (this.settings.adviceGiven == 0) && (this.settings.selectedActionSell == 1) && (this.sellPersistence >= this.settings.sellPersistenceThreshold)){                            
                        this.advice('short');
                        this.settings.adviceGiven = 1;
                        log.debug('******TRADE    Selling at: ', this.candle.close); 
                        //log.debug('Overall Profit& Loss: ', this.overallProfit);               
                        this.previousAction = 0;
                        //Have to reset this because can't keep buying after you've used all your money to buy
                        this.settings.selectedActionSell = 0;
                        this.settings.selectedActionBuy = 1;       
                        this.sellPersistence = 0;
                    }    
                }
                else{
                    this.sellPersistence = 0;
                }
            }//end if sellDirectionIncrease                      
            
        } // end selectedPer
    }//end selectedTradeVol   
    
}// end check

module.exports = strat;