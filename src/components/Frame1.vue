<template>
  <div class="frame">
    <canvas
      class="lineToGraph"
      style="background:#eee;"
      :width="width"
      :height="height"
      @mouseup="up"
      @contextmenu.prevent></canvas>

  </div>
</template>

<script>
    export default {
        name: 'Frame',
        props:[ 'width' ,'height', 'type', 'number'],
        data() {
          return {
            coord: [],
            x: '',
            y: '',
            clickTimes: 0,
            myCanvas: '',
            content: '',
            url: '',
            isMore: true,
            stopMore: true
          }
        },
        mounted() {
          this.myCanvas = document.getElementsByClassName('lineToGraph')[0]
          this.content = this.myCanvas.getContext('2d')
          this.content.beginPath()
        },
        methods: {
          up(event) {
            if (event.button === 0) {
              this.x = event.clientX
              this.y = event.clientY
              this.url = this.myCanvas.toDataURL()
              var _this = this
              this.clickTimes++
              if(this.clickTimes <= 8) {
                this.coord.push({x : this.x, y: this.y})
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
                _this.content.lineTo(e.clientX, e.clientY)
                for (var i = 0; i < _this.coord.length; i++) {
                  _this.content.lineTo(_this.coord[i].x, _this.coord[i].y)
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
                this.coord.push({x : event.clientX, y: event.clientY})
                this.stopMore = false
              }
              this.endDraw(event)
            }
          },
          endDraw(e) {
            if(this.clickTimes >= 2) {
              if(this.isMore) {
                this.clickTimes = 8
                this.content.stroke()
                this.content.lineWidth = 1
                this.content.strokeStyle = 'rgba(0, 0, 0, 1)'
                this.content.closePath()
                this.content.fillStyle = 'red'
                this.isMore = false
              }
              this.myCanvas.onmousemove = function() {}
              return
            } else {
              return
            }
          },
          loadImg() {
            var img = new Image()
            img.src = this.url
            this.content.drawImage(img, 0, 0, this.myCanvas.width, this.myCanvas.height)
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
