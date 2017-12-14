<template>
  <div class="tree-node">
    <p v-for="item in nodeData" @click.stop="nodeClick(item)">{{item.label}}</p>
  </div>
</template>

<script>
export default {
  name: 'tree-node',
  props: ['nodeData'],
  methods: {
    nodeClick(data) {
      this.$emit('nodeClick', data)
    }
  }
}
</script>

<style scoped>
.tree-node {
  padding-left: 20px;
}
</style>
