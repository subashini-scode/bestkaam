function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var t = document.getElementById(e).getAttribute("data-colors");
    if (t)
      return (t = JSON.parse(t)).map(function (e) {
        var t = e.replace(" ", "");
        if (-1 === t.indexOf(",")) {
          var r = getComputedStyle(document.documentElement).getPropertyValue(
            t
          );
          return r || t;
        }
        var a = e.split(",");
        return 2 != a.length
          ? t
          : "rgba(" +
              getComputedStyle(document.documentElement).getPropertyValue(
                a[0]
              ) +
              "," +
              a[1] +
              ")";
      });
  }
}
var options,
  chartOverview,
  overviewChartColors = getChartColorsArray("overview-chart");
overviewChartColors &&
  ((options = {
    series: [
      {
        type: "area",
        name: "BTC",
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
      },
      {
        type: "area",
        name: "ETH",
        data: [28, 41, 52, 42, 13, 18, 29, 18, 36, 51, 55, 35],
      },
      {
        type: "line",
        name: "LTC",
        data: [45, 52, 38, 24, 33, 65, 45, 75, 54, 18, 28, 10],
      },
    ],
    chart: { height: 240, type: "line", toolbar: { show: !1 } },
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth", width: 2, dashArray: [0, 0, 3] },
    fill: { type: "solid", opacity: [0.15, 0.05, 1] },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: overviewChartColors,
  }),
  (chartOverview = new ApexCharts(
    document.querySelector("#overview-chart"),
    options
  )).render(),
  $(document).ready(function () {
    $("#datatable").DataTable(),
      $(".dataTables_length select").addClass("form-select form-select-sm");
  }));
