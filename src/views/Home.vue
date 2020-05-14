<template>
  <div>
    <van-sticky>
      <van-search placeholder="请输入搜索关键词" @click="handleTo" input-align="center" />
    </van-sticky>
    <div>
      <div ref="hanziBox" id="character-target-div"></div>
    </div>
    <van-tabbar v-model="active" @change="changeMode">
      <van-tabbar-item>笔画动画</van-tabbar-item>
      <van-tabbar-item>练习</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
const HanziWriter = require("hanzi-writer")
import { mapState } from "vuex"
export default {
  name: "Home",
  data() {
    return {
      wrapper: null,
      value: '日',
      active: 1
    };
  },
  computed: {
    ...mapState(["drawing"]),
    isInit() {
      return Boolean(this.wrapper);
    }
  },
  watch: {
    drawing: {
      deep: true,
      handle(newVal) {
        console.log('newVal: ', newVal)
      }
    }
  },
  mounted() {
    this.$store.dispatch('getWords')
    this.$nextTick(() => {
      try {
        const box = this.$refs["hanziBox"]
        const { text } = this.drawing
        const ele = HanziWriter.create(box, text, {
          width: 200,
          height: 200,
          padding: 5,
          showOutline: true,
          strokeColor: "#FF9435",
          showCharacter: false,
          strokeAnimationSpeed: 2,
          delayBetweenStrokes: 20
        })
        this.wrapper = ele
        // TODO 将此注册到全局对象上去
        if (window && !window.writeBox) window.writeBox = ele
      } catch (error) {
        throw new Error(error)
      }
    })

  },
  methods: {
    // 开始播放动画
    // @params <String> type (one | loop)
    handleAnimation(type = 'one') {
      if (this.isInit) {
        if (type === 'one') this.wrapper.animateCharacter()
        else if (type === 'loop') this.wrapper.loopCharacterAnimation();
      }
    },
    // 了解该汉字, 开始测试
    handleQuiz() {
      this.wrapper.quiz()
    },
    // 重置测试汉字
    resetQuiz() {
      if (this.isInit) {
        this.wrapper.quiz()
      }
    },
    setText(text) {
      this.wrapper.setCharacter(text)
    },
    changeMode(e){
      if (e === 0) {
        this.handleAnimation('one')
      } else if (e === 1) {
        this.handleQuiz()
      }
    },
    handleTo() {
      this.$router.push('/search')
    }
  }
};
</script>

<style scoped>
#character-target-div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 66.6vh;
}
</style>