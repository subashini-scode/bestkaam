var url = "assets/json/",
  allProductList = "",
  editList = !1,
  getJSON = function (t, e) {
    var r = new XMLHttpRequest();
    r.open("GET", url + t, !0),
      (r.responseType = "json"),
      (r.onload = function () {
        var t = r.status;
        e(200 === t ? null : t, r.response);
      }),
      r.send();
  };
function loadProductData(t) {
  (document.querySelector("#product-list").innerHTML = ""),
    t.forEach(function (t, e) {
      var r = t.discount
        ? '<div class="avatar-sm product-ribbon">        <span class="avatar-title rounded-circle bg-primary">' +
          t.discount +
          "</span>    </div>"
        : "";
      document.querySelector("#product-list").innerHTML +=
        '<div class="col-xl-4 col-sm-6">        <div class="card">            <div class="card-body">                <div class="product-img position-relative">                    ' +
        r +
        '                    <img src="' +
        t.productImg +
        '" alt="" class="img-fluid mx-auto d-block">                </div>                <div class="mt-4 d-flex align-items-center">                    <div class="flex-grow-1">                    <h5 class="mb-1 text-truncate"><a href="javascript: void(0);" class="text-dark">' +
        t.productName +
        '</a></h5>                    <div class="badge bg-success font-size-11"><i class="bx bxs-star me-1"></i>' +
        t.rating +
        '</div>                    </div>                    <div class="flex-shrink-0">                        <h5 class="my-0"><b>' +
        t.productPrice +
        "</b></h5>                    </div>                </div>            </div>        </div>    </div>";
    });
}
getJSON("ecommerce-product-list.json", function (t, e) {
  null !== t
    ? console.log("Something went wrong: " + t)
    : loadProductData((allProductList = e));
}),
  Array.from(document.querySelectorAll(".product-list a")).forEach(function (
    r
  ) {
    r.addEventListener("click", function () {
      var t = document.querySelector(".file-manager-menu a.active");
      t && t.classList.remove("active"), r.classList.add("active");
      var e = r.querySelector(".tablist-name").innerHTML;
      (document.getElementById("product-list").innerHTML = ""),
        loadProductData(
          "All" != e
            ? allProductList.filter(function (t) {
                return t.category === e;
              })
            : allProductList
        );
    });
  }),
  $(document).ready(function () {
    var r, a;
    $("#pricerange").ionRangeSlider({
      skin: "square",
      type: "double",
      grid: !0,
      min: 0,
      max: 1e3,
      from: 100,
      to: 800,
      prefix: "$",
      onChange: function (t) {
        (r = t.from),
          (a = t.to),
          (filterDataAll = allProductList.filter(function (t) {
            var e = t.productPrice.split("$");
            return parseFloat(e[1]) >= r && parseFloat(e[1]) <= a;
          })),
          loadProductData(filterDataAll);
      },
    });
  });
var searchProductList = document.getElementById("searchProductList");
searchProductList.addEventListener("keyup", function () {
  var e,
    t = searchProductList.value.toLowerCase();
  loadProductData(
    ((e = t),
    allProductList.filter(function (t) {
      return -1 !== t.productName.toLowerCase().indexOf(e.toLowerCase());
    }))
  );
});
var arraylist = [];
document.querySelectorAll("#discount-filter .form-check").forEach(function (e) {
  var a = e.querySelector(".form-check-input").value;
  e.querySelector(".form-check-input").addEventListener("change", function () {
    e.querySelector(".form-check-input").checked
      ? arraylist.push(a)
      : arraylist.splice(arraylist.indexOf(a), 1);
    var r,
      t = allProductList;
    (filterDataAll =
      e.querySelector(".form-check-input").checked && 0 == a
        ? t.filter(function (t) {
            if (t.discount) {
              var e = t.discount.split("%");
              return parseFloat(e[0]) < 10;
            }
          })
        : e.querySelector(".form-check-input").checked && 0 < arraylist.length
        ? ((r = Math.min.apply(Math, arraylist)),
          t.filter(function (t) {
            if (t.discount) {
              var e = t.discount.split("%");
              return parseFloat(e[0]) >= r;
            }
          }))
        : allProductList),
      loadProductData(filterDataAll);
  });
}),
  document.querySelectorAll("#rating-filter .form-check").forEach(function (e) {
    var a = e.querySelector(".form-check-label .rate-value").innerHTML;
    e.querySelector(".form-check-input").addEventListener(
      "change",
      function () {
        e.querySelector(".form-check-input").checked
          ? arraylist.push(a)
          : arraylist.splice(arraylist.indexOf(a), 1);
        var r,
          t = allProductList;
        (filterDataAll =
          e.querySelector(".form-check-input").checked && 1 == a
            ? t.filter(function (t) {
                if (t.discount) {
                  var e = t.rating;
                  return 1 == parseFloat(e);
                }
              })
            : e.querySelector(".form-check-input").checked &&
              0 < arraylist.length
            ? ((r = Math.min.apply(Math, arraylist)),
              t.filter(function (t) {
                if (t.rating) {
                  var e = t.rating;
                  return parseFloat(e) >= r;
                }
              }))
            : allProductList),
          loadProductData(filterDataAll);
      }
    );
  });
