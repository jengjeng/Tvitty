<template>
  <div>
    <p>Type to search Wikipedia</p>
    <div id="el">
      <input v-model="search">
      <div v-if="results">
        <h1>{{ results.term }}</h1>
        <ul v-if="results.matches.length">
          <li v-for="match in results.matches">
            <a :href="match.url">{{ match.title }}</a>
            <p>{{ match.description }}</p>
          </li>
        </ul>
        <p v-else>
          No matches found.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  // import {
  //   Observable
  // } from 'rxjs/Observable'

  function fetchTerm (term) {
    let a = $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: term
      }
    })
    return a
  }

  function formatResult ([term, matches, descriptions, urls]) {
    return {
      term: term,
      matches: matches.map((title, i) => ({
        title: title,
        description: descriptions[i],
        url: urls[i]
      }))
    }
  }
  /* eslint-disable no-new */
  export default ({
    data: () => ({
      search: ''
    }),
    subscriptions () {
      return {
        // this is the example in RxJS's readme.
        results: this.$watchAsObservable('search')
          .pluck('newValue')
          .filter(text => text.length > 2)
          .debounceTime(500)
          .distinctUntilChanged()
          .switchMap(fetchTerm)
          .map(formatResult)
      }
    }
  })

</script>
