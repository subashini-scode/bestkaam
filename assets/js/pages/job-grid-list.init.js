var url = "assets/json/",
  allJobList = "",
  prevButton = document.getElementById("page-prev"),
  nextButton = document.getElementById("page-next"),
  currentPage = 1,
  itemsPerPage = 8,
  getJSON = function (e, t) {
    var a = new XMLHttpRequest();
    a.open("GET", url + e, !0),
      (a.responseType = "json"),
      (a.onload = function () {
        var e = a.status;
        t(200 === e ? null : e, a.response);
      }),
      a.send();
  };
function loadJobListData(e, t) {
  var a = Math.ceil(e.length / itemsPerPage);
  t < 1 && (t = 1),
    a < t && (t = a),
    (document.querySelector("#jobgrid-list").innerHTML = "");
  for (
    var n, s = (t - 1) * itemsPerPage;
    s < t * itemsPerPage && s < e.length;
    s++
  ) {
    e[s] &&
      ((n = ""),
      Array.from(e[s].requirement).forEach(function (e, t) {
        var a = "";
        "Full Time" == e
          ? (a = "badge-soft-success")
          : "Urgent" == e
          ? (a = "badge-soft-warning")
          : "Private" == e && (a = "badge-soft-info"),
          (n += '<span class="badge rounded-1 ' + a + '">' + e + "</span>");
      }),
      (document.querySelector("#jobgrid-list").innerHTML +=
        '<div class="col-xl-3 col-md-6">        <div class="card">            <div class="card-body">                <img src="' +
        e[s].image +
        '" alt="" height="50" class="mb-3">                <h5 class="fs-17 mb-2"><a href="javascript:void(0);" class="text-dark">' +
        e[s].jobTitle +
        '</a> <small class="text-muted fw-normal">(' +
        e[s].experience +
        ')</small></h5>                <ul class="list-inline mb-0">                    <li class="list-inline-item">                        <p class="text-muted fs-14 mb-1">' +
        e[s].companyName +
        '</p>                    </li>                    <li class="list-inline-item">                        <p class="text-muted fs-14 mb-0"><i class="mdi mdi-map-marker"></i>' +
        e[s].location +
        '</p>                    </li>                    <li class="list-inline-item">                        <p class="text-muted fs-14 mb-0"><i class="uil uil-wallet"></i>' +
        e[s].salary +
        '</p>                    </li>                </ul>                <div class="mt-3 hstack gap-2">' +
        n +
        '</div>                <div class="mt-4 hstack gap-2">                    <a href="#!" data-bs-toggle="modal" class="btn btn-soft-success w-100">View Profile</a>                    <a href="#applyJobs" data-bs-toggle="modal" class="btn btn-soft-primary w-100">Apply Now</a>                </div>            </div>        </div>    </div>'));
  }
  selectedPage(),
    1 == currentPage
      ? prevButton.classList.add("disabled")
      : prevButton.classList.remove("disabled"),
    currentPage == a
      ? nextButton.classList.add("disabled")
      : nextButton.classList.remove("disabled");
}
getJSON("job-grid-list.json", function (e, t) {
  null !== e
    ? console.log("Something went wrong: " + e)
    : (loadJobListData((allJobList = t), currentPage), paginationEvents());
});
var date = new Date(),
  today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
function selectedPage() {
  for (
    var e = document
        .getElementById("page-num")
        .getElementsByClassName("clickPageNumber"),
      t = 0;
    t < e.length;
    t++
  )
    t == currentPage - 1
      ? e[t].classList.add("active")
      : e[t].classList.remove("active");
}
function paginationEvents() {
  function a() {
    return Math.ceil(allJobList.length / itemsPerPage);
  }
  prevButton.addEventListener("click", function () {
    1 < currentPage && loadJobListData(allJobList, --currentPage);
  }),
    nextButton.addEventListener("click", function () {
      currentPage < a() && loadJobListData(allJobList, ++currentPage);
    }),
    (function () {
      var e = document.getElementById("page-num");
      e.innerHTML = "";
      for (var t = 1; t < a() + 1; t++)
        e.innerHTML +=
          "<a class='page-link clickPageNumber' href='#'>" + t + "</a>";
    })(),
    document.addEventListener("click", function (e) {
      "A" == e.target.nodeName &&
        e.target.classList.contains("clickPageNumber") &&
        ((currentPage = e.target.textContent),
        loadJobListData(allJobList, currentPage));
    }),
    selectedPage();
}
$("#datepicker1 input")
  .datepicker("setDate", today)
  .on("changeDate", function (e) {
    var t = document.querySelector("#datepicker1 input").value,
      a = allJobList.filter(function (e) {
        return new Date(e.postDate) <= new Date(t);
      }),
      n = document.getElementById("page-num");
    n.innerHTML = "";
    for (var s = Math.ceil(a.length / itemsPerPage), l = 1; l < s + 1; l++)
      n.innerHTML +=
        "<a class='page-link clickPageNumber' href='#'>" + l + "</a>";
    loadJobListData(a, currentPage);
  });
var searchElementList = document.getElementById("searchJob");
function searchResult(e) {
  0 == e.length
    ? (document.getElementById("pagination-element").style.display = "none")
    : (document.getElementById("pagination-element").style.display = "flex");
  var t = document.getElementById("page-num");
  t.innerHTML = "";
  for (var a = Math.ceil(e.length / itemsPerPage), n = 1; n < a + 1; n++)
    t.innerHTML +=
      "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" +
      n +
      "</a></div>";
}
searchElementList.addEventListener("keyup", function () {
  var e = searchElementList.value.toLowerCase();
  var t,
    a =
      ((t = e),
      allJobList.filter(function (e) {
        return -1 !== e.jobTitle.toLowerCase().indexOf(t.toLowerCase());
      }));
  searchResult(a), loadJobListData(a, currentPage);
});
