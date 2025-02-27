var url = "assets/json/",
  allOrderList = "",
  editList = !1,
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
function loadOrderListData(e) {
  $("#order-list").DataTable({
    data: e,
    bLengthChange: !1,
    order: [[1, "desc"]],
    language: {
      oPaginate: {
        sNext: '<i class="mdi mdi-chevron-right"></i>',
        sPrevious: '<i class="mdi mdi-chevron-left"></i>',
      },
    },
    columns: [
      {
        data: "id",
        render: function (e, t, a) {
          return (
            '<div class="form-check font-size-16">                        <input class="form-check-input" type="checkbox" id="orderlistIdCheck-' +
            a.id +
            '">                        <label class="form-check-label" for="orderlistIdCheck-' +
            a.id +
            '"></label>                    </div>'
          );
        },
      },
      {
        data: null,
        render: function (e, t, a) {
          return (
            '<a href="javascript: void(0);" class="text-body orderlist-id fw-bold">#SK' +
            a.id +
            "</a>"
          );
        },
      },
      {
        data: "billName",
        render: function (e, t, a) {
          return '<div class="customerlist-name">' + a.billName + "</div>";
        },
      },
      { data: "date" },
      { data: "totalPay" },
      {
        data: "payStatus",
        render: function (e, t, a) {
          return isStatus(a.payStatus);
        },
      },
      {
        data: "payMethod",
        render: function (e, t, a) {
          return isMethod(a.payMethod);
        },
      },
      {
        data: null,
        bSortable: !1,
        render: function (e, t, a) {
          return '<button type="button" class="btn btn-primary btn-sm btn-rounded viewdetail-btn" data-bs-toggle="modal" data-bs-target=".orderdetailsModal">View Details</button>';
        },
      },
      {
        data: null,
        bSortable: !1,
        render: function (e, t, a) {
          return (
            '<div class="d-flex gap-3">                    <a href="#newOrderModal" data-bs-toggle="modal" class="text-success edit-list" data-edit-id="' +
            a.id +
            '"><i class="mdi mdi-pencil font-size-18"></i></a>                    <a href="#removeItemModal" data-bs-toggle="modal" class="text-danger remove-list" data-remove-id="' +
            a.id +
            '"><i class="mdi mdi-delete font-size-18"></i></a>                </div>'
          );
        },
      },
    ],
    drawCallback: function (e) {
      editOrderList(), removeItem(), orderDetailShow();
    },
  }),
    $("#searchTableList").keyup(function () {
      $("#order-list").DataTable().search($(this).val()).draw();
    }),
    $(".dataTables_length select").addClass("form-select form-select-sm"),
    $(".dataTables_paginate").addClass("pagination-rounded"),
    $(".dataTables_filter").hide();
}
function isStatus(e) {
  switch (e) {
    case "Paid":
      return (
        '<span class="badge rounded-pill badge-soft-success font-size-12">' +
        e +
        "</span>"
      );
    case "Refund":
      return (
        '<span class="badge rounded-pill badge-soft-warning font-size-12">' +
        e +
        "</span>"
      );
    case "Chargeback":
      return (
        '<span class="badge rounded-pill badge-soft-danger font-size-12">' +
        e +
        "</span>"
      );
  }
}
function isMethod(e) {
  switch (e) {
    case "Mastercard":
      return '<div><i class="fab fa-cc-mastercard me-1"></i>' + e + "</div>";
    case "Visa":
      return '<div><i class="fab fa-cc-visa me-1"></i>' + e + "</div>";
    case "Paypal":
      return '<div><i class="fab fa-cc-paypal me-1"></i>' + e + "</div>";
    case "COD":
      return '<div><i class="fas fa-money-bill-alt me-1"></i>' + e + "</div>";
  }
}
getJSON("ecommerce-order-list.json", function (e, t) {
  null !== e
    ? console.log("Something went wrong: " + e)
    : loadOrderListData((allOrderList = t));
});
var date = new Date(),
  today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$("#orderdate-input").datepicker("setDate", today);
var createOrderForms = document.querySelectorAll(".createorder-form");
function fetchIdFromObj(e) {
  return parseInt(e.id);
}
function findNextId() {
  if (0 === allOrderList.length) return 0;
  var e = fetchIdFromObj(allOrderList[allOrderList.length - 1]),
    t = fetchIdFromObj(allOrderList[0]);
  return e <= t ? t + 1 : e + 1;
}
function editOrderList() {
  var a;
  Array.from(document.querySelectorAll(".edit-list")).forEach(function (t) {
    t.addEventListener("click", function (e) {
      (a = t.getAttribute("data-edit-id")),
        (editList = !0),
        document
          .getElementById("createorder-form")
          .classList.remove("was-validated"),
        (allOrderList = allOrderList.map(function (e) {
          return (
            e.id == a &&
              ((document.getElementById("newOrderModalLabel").innerHTML =
                "Edit Order"),
              (document.getElementById("addNewOrder-btn").innerHTML = "Save"),
              (document.getElementById("orderid-input").value = e.id),
              (document.getElementById("customername-field").value =
                e.billName),
              $("#orderdate-input").datepicker("setDate", e.date),
              (document.getElementById("payamount-input").value = e.totalPay),
              (document.getElementById("paystatus-input").value = e.payStatus),
              (document.getElementById("paymethod-input").value = e.payMethod)),
            e
          );
        }));
    });
  });
}
function removeItem() {
  var a;
  Array.from(document.querySelectorAll(".remove-list")).forEach(function (t) {
    t.addEventListener("click", function (e) {
      (a = t.getAttribute("data-remove-id")),
        document
          .getElementById("remove-item")
          .addEventListener("click", function () {
            var t,
              e =
                ((t = a),
                allOrderList.filter(function (e) {
                  return e.id != t;
                }));
            (allOrderList = e),
              $.fn.DataTable.isDataTable("#order-list") &&
                $("#order-list").DataTable().destroy(),
              loadOrderListData(allOrderList),
              document.getElementById("close-removeOrderModal").click();
          });
    });
  });
}
function orderDetailShow() {
  Array.from(document.querySelectorAll("#order-list tbody tr")).forEach(
    function (a) {
      a.querySelector(".viewdetail-btn").addEventListener("click", function () {
        var e = a.querySelector(".orderlist-id").innerHTML,
          t = a.querySelector(".customerlist-name").innerHTML;
        (document.querySelector("#orderlist-overview .list-id").innerHTML = e),
          (document.querySelector(
            "#orderlist-overview .orderlist-customer"
          ).innerHTML = t);
      });
    }
  );
}
Array.prototype.slice.call(createOrderForms).forEach(function (o) {
  o.addEventListener(
    "submit",
    function (e) {
      var t, a, d, r, n, i, l;
      o.checkValidity()
        ? (e.preventDefault(),
          (t = document.getElementById("customername-field").value),
          (a = document.getElementById("orderdate-input").value),
          (d = document.getElementById("payamount-input").value),
          (r = document.getElementById("paystatus-input").value),
          (n = document.getElementById("paymethod-input").value),
          "" === t || "" === a || "" === d || "" === r || "" === n || editList
            ? "" !== t &&
              "" !== a &&
              "" !== d &&
              "" !== r &&
              "" !== n &&
              editList &&
              ((i = 0),
              (i = document.getElementById("orderid-input").value),
              (allOrderList = allOrderList.map(function (e) {
                return e.id != i
                  ? e
                  : {
                      id: i,
                      billName: t,
                      date: a,
                      totalPay: d,
                      payStatus: r,
                      payMethod: n,
                    };
              })),
              (editList = !1))
            : ((l = {
                id: findNextId(),
                billName: t,
                date: a,
                totalPay: d,
                payStatus: r,
                payMethod: n,
              }),
              allOrderList.push(l)),
          $.fn.DataTable.isDataTable("#order-list") &&
            $("#order-list").DataTable().destroy(),
          loadOrderListData(allOrderList),
          $("#newOrderModal").modal("hide"))
        : (e.preventDefault(), e.stopPropagation()),
        o.classList.add("was-validated");
    },
    !1
  );
}),
  Array.from(document.querySelectorAll(".addOrder-modal")).forEach(function (
    e
  ) {
    e.addEventListener("click", function (e) {
      (editList = !1),
        document
          .getElementById("createorder-form")
          .classList.remove("was-validated"),
        (document.getElementById("newOrderModalLabel").innerHTML =
          "Add New Order"),
        (document.getElementById("addNewOrder-btn").innerHTML = "Create"),
        (document.getElementById("orderid-input").value = ""),
        (document.getElementById("customername-field").value = ""),
        $("#orderdate-input").datepicker("setDate", today),
        (document.getElementById("payamount-input").value = ""),
        (document.getElementById("paystatus-input").value = "Paid"),
        (document.getElementById("paymethod-input").value = "Mastercard");
    });
  });
