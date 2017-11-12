<template lang='jade'>
  div
    #top
    .flex-container
      .header
        <router-link to='/home'><img src='/assets/Gekko_TUHeader.jpg'></router-link>
        
    .flex-container2
      .flex-container3.twitter-height
          .menu
             router-link(to='/live-gekkos').py1 Trade Bots <br>& Market Watchers
             router-link(to='/backtest').py1 Backtests
             a(href='#/resources/resources' style='padding-top: 12px;') Resources
               .sidebar-item
                 p Bitcoin News on Twitter
                
              a.twitter-timeline(href='https://twitter.com/hashtag/bitcoin', data-widget-id='924709618386919427', height='500') #bitcoin Tweets
      .flex-container4
        .fill
            router-view.view

</template>

<script>
  export default {}
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
</script>

<style>






.twitter-height{
  height: 100%;
}

.flex-container{
    display: flex;
    flex-flow: row wrap;
    width: 100%;

}
.header{
    background-color: #000000;
    width: 100%;
}
.flex-container2{
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
    width: 100%;
    
}

.flex-container3{
    align-self: flex-start;
    margin-right: 30px;
    width: 20%;
    
}

.flex-container4{
    align-items: center;
    align-content: center;
    margin-left: 5%;
    width: 80%;
}

.sidebar-item{
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
    font-style: italic;
    font-size: 20px;
    border-width: medium;
    border-color: black;
    background-color: #fdfec3;
}

.menu {
  flex-direction: column;
  align-self: flex-start;
  flex-basis: auto;
  color: black;
  background-color: white;
  width: 100%;
  display: inline-block;
}

.menu a {
  flex: 1 1 100%;
  display: block;
  text-align: center;
  text-decoration: none;
  color: inherit; 
}

.menu .router-link-active {
  font-weight: bold;
}

.menu a:active {
  font-weight: bold;
}

.menu a:hover {
  font-style: italic;
  font-weight: bold;
  background-color: #e2e504;
}

body{
  background-color: #212C38;
  color: white;
  display: inline-block;
  flex-direction: column;
  width: 100%;
  float: right;
  margin-top: 0;
}

.fill {
  flex-direction: row;
  align-self: flex-start;
  flex-basis: auto;
  color: white;
  display: inline-block;
  flex: 1;
}

.text {
  max-width: 400px;
}

</style>
