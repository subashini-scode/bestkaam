var url = "assets/json/",
  allCandidateList = "",
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
function loadCandidateListData(e) {
  (document.querySelector("#candidate-list").innerHTML = ""),
    Array.from(e).forEach(function (e, t) {
      var a = "";
      Array.from(e.skill).forEach(function (e, t) {
        a += '<span class="badge badge-soft-secondary">' + e + "</span>";
      }),
        (document.querySelector("#candidate-list").innerHTML +=
          '<div class="col-xl-3 col-md-6">        <div class="card">            <div class="card-body">                <div class="d-flex align-start mb-3">                    <div class="flex-grow-1">' +
          isType(e.type) +
          '</div>                    <button type="button" class="btn btn-light btn-sm like-btn" data-bs-toggle="button"><i class="bx bx-heart"></i></button>                </div>                <div class="text-center mb-3">                    <img src="' +
          e.candidateImg +
          '" alt="" class="avatar-sm rounded-circle" />                    <h6 class="font-size-15 mt-3 mb-1">' +
          e.candidateName +
          '</h6>                    <p class="mb-0 text-muted">UI/UX Designer</p>                </div>                <div class="d-flex mb-3 justify-content-center gap-2 text-muted">                    <div>                        <i class="bx bx-map align-middle text-primary"></i> ' +
          e.location +
          '                    </div>                    <p class="mb-0 text-center"><i class="bx bx-money align-middle text-primary"></i> ' +
          e.pay +
          '</p>                </div>                <div class="hstack gap-2 justify-content-center">' +
          a +
          '</div>                <div class="mt-4 pt-1">                    <a href="candidate-overview.html" class="btn btn-soft-primary d-block">View Profile</a>                </div>            </div>        </div>    </div>');
    });
}
function isType(e) {
  switch (e) {
    case "Full Time":
      return '<span class="badge badge-soft-success">' + e + "</span>";
    case "Freelance":
      return '<span class="badge badge-soft-info">' + e + "</span>";
    case "Part Time":
      return '<span class="badge badge-soft-danger">' + e + "</span>";
    case "Internship":
      return '<span class="badge badge-soft-warning">' + e + "</span>";
  }
}
getJSON("candidate-list.json", function (e, t) {
  null !== e
    ? console.log("Something went wrong: " + e)
    : loadCandidateListData((allCandidateList = t));
});
var searchElementList = document.getElementById("searchList");
searchElementList.addEventListener("keyup", function () {
  var t,
    e = searchElementList.value.toLowerCase();
  loadCandidateListData(
    ((t = e),
    allCandidateList.filter(function (e) {
      return -1 !== e.candidateName.toLowerCase().indexOf(t.toLowerCase());
    }))
  );
});
var date = new Date(),
  today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
function filterData() {
  var n = document.getElementById("idType").value,
    s = document.querySelector("#datepicker1 input").value;
  loadCandidateListData(
    allCandidateList.filter(function (e) {
      var t = !1,
        a = !1,
        t = "all" == e.type || "all" == n || e.type == n,
        a = new Date(e.createDate) <= new Date(s);
      if (t && a) return t && a;
    })
  );
}
$("#datepicker1 input").datepicker("setDate", today);
