<template lang='jade'>
.reduced-margin
  div
    br
    h3.contain.center Import Data
      p The importer can download historical market data directly from the exchange.
    br
    hr(width='70%')
    h3.contain.center Currently Running Imports
      p(v-if='imports.length === 0') You currently don't have any imports running.
      ul(v-if='imports.length')
        li(v-for='_import in imports')
        router-link(:to='"/data/importer/import/" + _import.id') {{ _import.watch.exchange }}:{{ _import.watch.currency }}/{{ _import.watch.asset }}
    br
    hr(width='70%')
    h3.contain.center Start a New Import
      p
        import-config-builder(v-on:config='updateConfig')
    br
    hr(width='70%')
    .txt--center
      a.w100--s.my1.btn--blue(href='#', v-on:click.prevent='run') Import
</template>

<script>

import { post } from '../../../tools/ajax'
import spinner from '../../global/blockSpinner.vue'
import importConfigBuilder from './importConfigBuilder.vue'

import marked from '../../../tools/marked'

let intro = marked(`

## Import Data

The importer can download historical market data directly from the exchange.

`)

export default {
  components: {
    importConfigBuilder,
    spinner
  },
  data: () => {
    return {
      intro,
      config: {}
    }
  },
  computed: {
    imports: function() {
      return this.$store.state.imports
    }
  },
  methods: {
    daysApart: function(range) {
      let to = moment(range.to);
      let from = moment(range.from);

      return to.diff(from, 'days');
    },
    updateConfig: function(config) {
      this.config = config;
    },
    run: function() {
      let daysApart = this.daysApart(this.config.importer.daterange);

      if(daysApart < 1)
        return alert('You must import at least one day of data..')

      post('import', this.config, (error, response) => {
        if(error)
          return alert(error);

        this.$store.commit('addImport', response);

        this.$router.push({
          path: `/data/importer/import/${response.id}`,
        })
      });
    }
  }
}
</script>

<style>
.reduced-margin{
    margin-left: -30%;
}
</style>
