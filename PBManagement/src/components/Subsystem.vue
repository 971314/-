<template>
  <div>
    <iframe ref="iframe" :src="pageUrl"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageUrl: ''
    }
  },
  watch: {
    '$route' (to, from) {
      let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      let subsystemUrl = window.sessionStorage.getItem('subsystemUrl');
      let pageUrl = subsystemUrl + '?uid=' + userInfo.userId + '&token=' + escape(userInfo.token);
      if (pageUrl != this.pageUrl) {
        this.pageUrl = pageUrl;
      }
    }
  },
  mounted () {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let subsystemUrl = window.sessionStorage.getItem('subsystemUrl');
    this.pageUrl = subsystemUrl + '?uid=' + userInfo.userId + '&token=' + escape(userInfo.token);
  }
}
</script>

<style scoped>
  iframe {
    margin-bottom: -4px;
    border: none;
    width: 100%;
    min-height: 670px;
  }
</style>
