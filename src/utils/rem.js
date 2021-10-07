(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 520) {
        docEl.style.fontSize = "100px";
      } else {
        // 以设计稿宽度 375, html字体 100px 来计算
        docEl.style.fontSize = 100 * (clientWidth / 375) + "px";
      }
      if (doc.body) {
        doc.body.style.fontSize = "16px";
      } else {
        doc.querySelector("body").style.fontSize = "16px";
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

// 阻止弹出菜单
window.addEventListener('contextmenu', function(e){
  e.preventDefault();
});