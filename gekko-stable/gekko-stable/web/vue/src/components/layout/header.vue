<template lang='jade'>
  div
    #top
    header.bg--black.grd
      .contain.grd-row
        img(src='/assets/Gekko_TUHeader.jpg', width='200', height='75')
    nav.bg--light-gray
      .menu.contain
        router-link(to='/home').py1 Home
        router-link(to='/live-gekkos').py1 Live Gekkos
        router-link(to='/backtest').py1 Backtest
        router-link(to='/data').py1 Local data
        router-link(to='/config').py1 Config
        a(href='https://gekko.wizb.it/docs/introduction/about_gekko.html', target='_blank').py1 Documentation

</template>

<script>
  export default {}
</script>

<style>

body{
  background-color: #212C38;
  color: white;
}
.menu {
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-top: 0;
  margin-bottom: 2rem;
  color: black;
}

.menu a {
  flex: 1 1 100%;
  display: block;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.menu .router-link-active {
  background-color: rgba(250,250,250,.99);
}

.menu a:hover {
  text-decoration: underline;
}

</style>
