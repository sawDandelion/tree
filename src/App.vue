<template>
  <div id="app">
    <div id='nav'>
      <!-- <Hello>
        <span slot="header">你好</span>
      </Hello> -->
      <!-- <Frame :width="500" :height="500" :type="'frame'" :isCanDrawMore="true"></Frame> -->
      <Chat></Chat>
    </div>
  </div>
</template>

<script>
    import Chat from './components/chat.vue'
    import Hello from './components/Hello.vue'
    export default {
        name: 'app',
        components: {
            Hello, Chat
        }
    }
</script>

<style>
</style>
