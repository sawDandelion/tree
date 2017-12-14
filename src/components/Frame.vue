<template>
  <div class="frame">
    <canvas
      class="line-to-graph"
      style="background:#eee;"
      :width="width"
      :height="height"
      :isCanDrawMore="isCanDrawMore"
      @mouseup="up"
      @contextmenu.prevent></canvas>
      <button click="clear">清除</button>
  </div>
</template>

<script>
    export default {
        name: 'Frame',
        props:[ 'width' ,'height', 'type', 'isCanDrawMore'], // isCanDrawMore:是否支持画多个
        data() {
          return {
            coord: [],
            x: '',
            y: '',
            clickTimes: 0,
            myCanvas: '',
            content: '',
            url: '',
            stopMore: true
          }
        },
        mounted() {
          this.myCanvas = document.getElementsByClassName('line-to-graph')[0]
          this.content = this.myCanvas.getContext('2d')
          this.content.beginPath()
          this.coord.push({create : []})
        },
        methods: {
          up(event) {
            if (event.button === 0) {
              this.x = event.offsetX
              this.y = event.offsetY
              this.url = this.myCanvas.toDataURL()
              var _this = this
              this.clickTimes++
              if(this.clickTimes <= 8) {
                this.coord[this.coord.length - 1].create.push({x : this.x, y: this.y})
              }
              if(this.clickTimes >= 8) {
                this.endDraw(event)
                return false
              }
              this.myCanvas.onmousemove = function (e) {
                _this.content.clearRect(0, 0, _this.myCanvas.width, _this.myCanvas.height)
                // 载入上次保存点
                _this.loadImg()
                _this.content.beginPath()
                _this.content.moveTo(_this.x, _this.y)
                _this.content.lineTo(e.offsetX, e.offsetY)
                for (var i = 0; i < _this.coord[_this.coord.length - 1].create.length; i++) {
                  _this.content.lineTo(_this.coord[_this.coord.length - 1].create[i].x, _this.coord[_this.coord.length - 1].create[i].y)
                }
                _this.content.stroke()
                _this.content.lineWidth = 1
                _this.content.strokeStyle = 'rgba(0, 0, 0, 1)'
                _this.content.closePath()
                _this.content.fillStyle = 'red'
                _this.content.fill()
              }
            } else if (event.button === 2) {
              if(this.stopMore && this.clickTimes < 8 && this.clickTimes >= 2) {
                this.coord[this.coord.length - 1].create.push({x : event.offsetX, y: event.offsetY})
                this.stopMore = false
              }
              this.endDraw(event)
            }
          },
          endDraw(e) {
            if(this.clickTimes >= 2) {
              this.content.stroke()
              this.content.lineWidth = 1
              this.content.strokeStyle = 'rgba(0, 0, 0, 1)'
              this.content.closePath()
              this.content.fillStyle = 'red'
              this.clickTimes = 8
              this.DrawArrow(this.coord[this.coord.length - 1].create[0].x, this.coord[this.coord.length - 1].create[0].y, this.coord[this.coord.length - 1].create[1].x, this.coord[this.coord.length - 1].create[1].y)
              // 多个
              if(this.isCanDrawMore) {
                this.content.beginPath()
                this.clickTimes = 0
                this.coord.push({create : []})
                this.stopMore = true
              }
              this.myCanvas.onmousemove = function() {}
              return
            } else {
              return
            }
          },
          DrawArrow(startX ,startY, endX, endY) { // 箭头
            var arrowCenterX = (startX + endX) / 2,
                arrowCenterY = (startY + endY) / 2
            var leftArrowX = (Math.sqrt((arrowCenterX - startX) * (arrowCenterX - startX) + (arrowCenterY - startY) * (arrowCenterY - startY)) - 20) / (Math.sqrt((arrowCenterX - startX) * (arrowCenterX - startX) + (arrowCenterY - startY) * (arrowCenterY - startY))) * (arrowCenterX - startX) + startX,
                leftArrowY = (Math.sqrt((arrowCenterX - startX) * (arrowCenterX - startX) + (arrowCenterY - startY) * (arrowCenterY - startY)) - 20) / (Math.sqrt((arrowCenterX - startX) * (arrowCenterX - startX) + (arrowCenterY - startY) * (arrowCenterY - startY))) * (arrowCenterY - startY) + startY,
                rightArrowX = (Math.sqrt((arrowCenterX - startX) * (arrowCenterX - startX) + (arrowCenterY - startY) * (arrowCenterY - startY)) + 20) / (Math.sqrt((arrowCenterX - startX) * (arrowCenterX - startX) + (arrowCenterY - startY) * (arrowCenterY - startY))) * (arrowCenterX - startX) + startX,
                rightArrowY = (Math.sqrt((arrowCenterX - startX) * (arrowCenterX - startX) + (arrowCenterY - startY) * (arrowCenterY - startY)) + 20) / (Math.sqrt((arrowCenterX - startX) * (arrowCenterX - startX) + (arrowCenterY - startY) * (arrowCenterY - startY))) * (arrowCenterY - startY) + startY
            this.content.beginPath()
            this.content.save()
            this.content.translate(arrowCenterX, arrowCenterY)
            this.content.rotate(80 * Math.PI / 180)
            this.content.restore()
            this.content.moveTo(arrowCenterX, arrowCenterY)
            this.content.lineTo(leftArrowX, leftArrowY)
            this.content.moveTo(arrowCenterX, arrowCenterY)
            this.content.lineTo(rightArrowX, rightArrowY)
            this.content.lineWidth = 10
            this.content.strokeStyle = 'rgba(0, 255, 0, 1)'
            this.content.stroke()
            this.content.closePath()
          },
          loadImg() {
            var img = new Image()
            img.src = this.url
            this.content.drawImage(img, 0, 0, this.myCanvas.width, this.myCanvas.height)
          },
          clear() {

          }
        }
    }
</script>

<style>
.frame {
  width:500px;
  height:500px;
  overflow:hidden;
}

</style>
