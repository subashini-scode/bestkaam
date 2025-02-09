function getChartColorsArray(r) {
  if (null !== document.getElementById(r)) {
    var e = document.getElementById(r).getAttribute("data-colors");
    if (e)
      return (e = JSON.parse(e)).map(function (r) {
        var e = r.replace(" ", "");
        if (-1 === e.indexOf(",")) {
          var o = getComputedStyle(document.documentElement).getPropertyValue(
            e
          );
          return o || e;
        }
        var t = r.split(",");
        return 2 != t.length
          ? e
          : "rgba(" +
              getComputedStyle(document.documentElement).getPropertyValue(
                t[0]
              ) +
              "," +
              t[1] +
              ")";
      });
    console.warn("data-colors Attribute not found on:", r);
  }
}
$(document).ready(function () {
  function e() {
    var r = getChartColorsArray("sparkline1");
    r &&
      $("#sparkline1").sparkline([20, 40, 30], {
        type: "pie",
        height: "200",
        resize: !0,
        sliceColors: r,
      });
    var e = getChartColorsArray("sparkline2");
    e &&
      $("#sparkline2").sparkline(
        [5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10, 4, 7, 10],
        { type: "bar", height: "200", barWidth: 10, barSpacing: 7, barColor: e }
      );
    var o = getChartColorsArray("sparkline3");
    o &&
      ($("#sparkline3").sparkline([5, 6, 2, 9, 4, 7, 10, 12, 4, 7, 10], {
        type: "bar",
        height: "200",
        barWidth: "10",
        resize: !0,
        barSpacing: "7",
        barColor: o[0],
      }),
      $("#sparkline3").sparkline([5, 6, 2, 9, 4, 7, 10, 12, 4, 7, 10], {
        type: "line",
        height: "200",
        lineColor: o[1],
        fillColor: "transparent",
        composite: !0,
        lineWidth: 2,
        highlightLineColor: "rgba(0,0,0,.1)",
        highlightSpotColor: "rgba(0,0,0,.2)",
      }));
    var t = getChartColorsArray("sparkline4");
    t &&
      $("#sparkline4").sparkline(
        [0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10],
        {
          type: "line",
          width: "100%",
          height: "200",
          lineColor: t,
          fillColor: "transparent",
          spotColor: t,
          lineWidth: 2,
          minSpotColor: void 0,
          maxSpotColor: void 0,
          highlightSpotColor: void 0,
          highlightLineColor: void 0,
        }
      );
    var i = getChartColorsArray("sparkline5");
    i &&
      ($("#sparkline5").sparkline([15, 23, 55, 35, 54, 45, 66, 47, 30], {
        type: "line",
        width: "100%",
        height: "200",
        chartRangeMax: 50,
        resize: !0,
        lineColor: i[0],
        fillColor: "rgba(85, 110, 230, 0.3)",
        highlightLineColor: "rgba(0,0,0,.1)",
        highlightSpotColor: "rgba(0,0,0,.2)",
      }),
      $("#sparkline5").sparkline([0, 13, 10, 14, 15, 10, 18, 20, 0], {
        type: "line",
        width: "100%",
        height: "200",
        chartRangeMax: 40,
        lineColor: i[1],
        fillColor: "rgba(52, 195, 143, 0.3)",
        composite: !0,
        resize: !0,
        highlightLineColor: "rgba(0,0,0,.1)",
        highlightSpotColor: "rgba(0,0,0,.2)",
      }));
    var l = getChartColorsArray("sparkline6");
    l &&
      $("#sparkline6").sparkline(
        [
          4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 5, 6, 3, 4, 5, 8, 7, 6, 9, 3, 2, 4, 1,
          5, 6, 4, 3, 7,
        ],
        { type: "discrete", width: "280", height: "200", lineColor: l }
      );
    var a = getChartColorsArray("sparkline7");
    a &&
      $("#sparkline7").sparkline([10, 12, 12, 9, 7], {
        type: "bullet",
        width: "280",
        height: "80",
        targetColor: a[0],
        performanceColor: a[1],
      });
    var n = getChartColorsArray("sparkline8");
    n &&
      $("#sparkline8").sparkline(
        [4, 27, 34, 52, 54, 59, 61, 68, 78, 82, 85, 87, 91, 93, 100],
        {
          type: "box",
          width: "280",
          height: "80",
          boxLineColor: n,
          boxFillColor: "#f1f1f1",
          whiskerColor: n,
          outlierLineColor: n,
          medianColor: n,
          targetColor: n,
        }
      );
    var h = getChartColorsArray("sparkline9");
    h &&
      $("#sparkline9").sparkline([1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1], {
        height: "80",
        width: "100%",
        type: "tristate",
        posBarColor: h[0],
        negBarColor: h[1],
        zeroBarColor: h[2],
        barWidth: 8,
        barSpacing: 3,
        zeroAxis: !1,
      });
  }
  var o;
  $(window).resize(function (r) {
    clearTimeout(o), (o = setTimeout(e, 500));
  }),
    e();
});
