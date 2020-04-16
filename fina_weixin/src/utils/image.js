/**
 * 图片压缩（利用canvas）
 * @param  path     图片路径
 * @param  obj      压缩配置width,height,quality，不传则按比例压缩
 * @param  callback  回调函数
 */
function dealImage(path, obj, callback) {
  var img = new Image();
  img.src = path;
  img.onload = function() {
      var that = this;
      // 默认按比例压缩
      var w = that.width,
          h = that.height,
          scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);

      //生成canvas
      var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(that, 0, 0, w, h);

      // 默认图片质量为0.7
      var quality = 0.7;
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
      }

      // 回调函数返回base64的值
      var base64 = canvas.toDataURL('image/jpeg', quality);
      callback(base64);
  }
}
export default dealImage