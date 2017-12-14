<template>
  <div id='chat'>
    <div class="content">

    </div>
    <div class="input">
      <textarea v-model="inputResult"></textarea>
    </div>
    <div>{{result}}</div>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapState({
        result: ({ data }) => data.message
      }),
      ...mapGetters(['getMessage'])
    },
    date() {
      return {
        inputResult: ''
      }
    },
    watch: {
      getMessage(val) {
        console.log(val, 'watch')
      }
    },
    created() {
      console.log(this.result)
    },
    methods: {
      getChat () {
        var socket = io.connect('http://localhost')
        socket.on('news', function (data) {
          console.log(data)
          socket.emit('my other event', { my: 'data' })
        })
      },
      submit () {
        this.$store.dispatch('setMessage', this.inputResult).then(suc => {
          console.log(suc)
        })
      }
    }
  }
</script>

<style scoped>

#chat {
  width: 500px;
  height: 600px;
  background: #efefef;
}
.content {
  height: 500px;
  padding: 0 20px;
}
.input {
  height: 100px;
}
</style>
