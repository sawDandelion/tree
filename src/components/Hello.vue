<template>
  <div>
    <slot name='header'>
      <p>只有在没有要分发的内容时才会显示。</p>
    </slot>
    <div class="tree">
      <div class="tree-item" v-for="i in treeData" @click="handleNodeClick(i)">
        <div class="header">
          {{i.label}}
        </div>
        <TreeNode v-if="i.value && i.children" :nodeData="i.children" @nodeClick="nodeClick"></TreeNode>
      </div>
    </div>
    <div class="">{{exampled}}</div>
  </div>
</template>

<script>
import $ from 'jquery'
import TreeNode from './treeNode.vue'
export default {
  components: {
    TreeNode
  },
  computed: {
    exampled: {
      cache: false,
      get: function () {
        var d = new Date()
        return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      }
    }
  },
  data() {
    return {
      treeData: [
        {
          type: 1,
          label: '树1级1',
          value: false
        },
        {
          type: 1,
          label: '树1级2',
          value: false
        },
        {
          type: 1,
          label: '树1级3',
          value: false
        }
      ]
    }
  },
  watch: {
    treeData : {
      deep: true,
      handler (val) {
        return val
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      data.value = !data.value
      if (data.children) return
      data.children = []
      for (var i = 0; i < 3; i++) {
        data.children.push({
          type: +(data.type + 1),
          label: '树' + +(data.type + 1) + '级' + +(i + 1),
          value: false
        })
      }
    },
    nodeClick(e) {
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
}
.tree {
  margin: 0 auto;
  width: 300px;
}
.tree .tree-item {
  cursor: pointer;
}
.tree .tree-item .header {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
</style>
