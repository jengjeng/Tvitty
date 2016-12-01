<template>
  <footer class="ui vertical footer segment">
    <div class="ui container">
      <p class="ui sub header grey center aligned">
        Made with
        <i class="heart icon"></i>
        by <a href="https://jengjeng.github.io/" target="_blank">@jengjeng</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
  footer.ui.segment {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1em;
  }
  .ui.sub.header {
    font-size: .65em;
    opacity: .7;
    transition: .5s opacity ease;
  }
  .ui.sub.header:hover {
    opacity: 1;
  }
  .ui.sub.header .icon {
    margin: 0;
    padding: 0;
    transition: .5s color ease;
  }
  .ui.sub.header:hover .icon {
    color: #EF404A;
  }
  .ui.sub.header > * {
    display: inline-block;
  }
</style>