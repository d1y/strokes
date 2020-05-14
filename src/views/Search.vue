<template>
  <div>
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="搜索文字"
        left-text="返回"
        left-arrow
      />
      <van-search clearable input-align="center" maxlength="1" v-model="searchText" placeholder="请输入搜索关键词" @input="handleSearch" />
    </van-sticky>
    <van-grid :column-num="3">
      <van-grid-item v-for="value in getNowWords" :key="value" :text="value" @click="handleClick(value)" />
    </van-grid>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      searchText: '',
      isSearch: false
    }
  },
  computed: {
    ...mapState([
      'words'
    ]),
    getNowWords() {
      if (this.isSearch) return [ this.searchText ]
      const result = this.words.slice(0, 80)
      return result
    }
  },
  methods: {
    ...mapMutations([
      'changeDrawText'
    ]),
    handleClick(word) {
      this.changeDrawText(word)
      this.$router.push('/')
    },
    handleSearch(val) {
      if (!val) {
        this.isSearch = false
        return
      }
      const words = this.words
      words.forEach(item=> {
        if (item == val) {
          this.isSearch = true
          return true
        }
      })
    }
  },
  created() {
    if (!this.words.length) {
      this.$store.dispatch('getWords')
    }
  }
}
</script>

<style>

</style>