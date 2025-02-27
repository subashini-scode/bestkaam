!(function (w) {
  "use strict";
  function e() {}
  (e.prototype.init = function () {
    var l = w("#event-modal"),
      t = w("#modal-title"),
      a = w("#form-event"),
      i = null,
      s = null,
      o = document.getElementsByClassName("needs-validation"),
      i = null,
      s = null,
      n = document.getElementById("locale-selector"),
      e = new Date(),
      r = e.getDate(),
      d = e.getMonth(),
      c = e.getFullYear();
    new FullCalendar.Draggable(document.getElementById("external-events"), {
      itemSelector: ".external-event",
      eventData: function (e) {
        return { title: e.innerText, className: w(e).data("class") };
      },
    });
    var v = [
        { title: "All Day Event", start: new Date(c, d, 1) },
        {
          title: "Long Event",
          start: new Date(c, d, r - 5),
          end: new Date(c, d, r - 2),
          className: "bg-warning",
        },
        {
          id: 999,
          title: "Repeating Event",
          start: new Date(c, d, r - 3, 16, 0),
          allDay: !1,
          className: "bg-info",
        },
        {
          id: 999,
          title: "Repeating Event",
          start: new Date(c, d, r + 4, 16, 0),
          allDay: !1,
          className: "bg-primary",
        },
        {
          title: "Meeting",
          start: new Date(c, d, r, 10, 30),
          allDay: !1,
          className: "bg-success",
        },
        {
          title: "Lunch",
          start: new Date(c, d, r, 12, 0),
          end: new Date(c, d, r, 14, 0),
          allDay: !1,
          className: "bg-danger",
        },
        {
          title: "Birthday Party",
          start: new Date(c, d, r + 1, 19, 0),
          end: new Date(c, d, r + 1, 22, 30),
          allDay: !1,
          className: "bg-success",
        },
        {
          title: "Click for Google",
          start: new Date(c, d, 28),
          end: new Date(c, d, 29),
          url: "http://google.com/",
          className: "bg-dark",
        },
      ],
      u = document.getElementById("calendar");
    function m(e) {
      l.modal("show"),
        a.removeClass("was-validated"),
        a[0].reset(),
        w("#event-title").val(),
        w("#event-category").val(),
        t.text("Add Event"),
        (s = e);
    }
    var g = new FullCalendar.Calendar(u, {
      editable: !0,
      droppable: !0,
      selectable: !0,
      initialView: "dayGridMonth",
      themeSystem: "bootstrap",
      weekNumbers: !0,
      locale: "en",
      headerToolbar: {
        left: "prev,next today",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        center: "title",
      },
      dayMaxEventRows: !0,
      views: { timeGrid: { dayMaxEventRows: 5 } },
      eventClick: function (e) {
        l.modal("show"),
          a[0].reset(),
          (i = e.event),
          w("#event-title").val(i.title),
          w("#event-category").val(i.classNames[0]),
          (s = null),
          t.text("Edit Event"),
          (s = null);
      },
      dateClick: function (e) {
        m(e);
      },
      events: v,
    });
    g.render(),
      g.getAvailableLocaleCodes().forEach(function (e) {
        var t = document.createElement("option");
        (t.value = e),
          (t.selected = "en" == e),
          (t.innerText = e),
          n.appendChild(t);
      }),
      n.addEventListener("change", function () {
        this.value && g.setOption("locale", this.value);
      }),
      w(a).on("submit", function (e) {
        e.preventDefault();
        var t,
          a = w("#event-title").val(),
          n = w("#event-category").val();
        !1 === o[0].checkValidity()
          ? (e.preventDefault(),
            e.stopPropagation(),
            o[0].classList.add("was-validated"))
          : (i
              ? (i.setProp("title", a), i.setProp("classNames", [n]))
              : ((t = {
                  title: a,
                  start: s.date,
                  allDay: s.allDay,
                  className: n,
                }),
                g.addEvent(t)),
            l.modal("hide"));
      }),
      w("#btn-delete-event").on("click", function (e) {
        i && (i.remove(), (i = null), l.modal("hide"));
      }),
      w("#btn-new-event").on("click", function (e) {
        m({ date: new Date(), allDay: !0 });
      });
  }),
    (w.CalendarPage = new e()),
    (w.CalendarPage.Constructor = e);
})(window.jQuery),
  (function () {
    "use strict";
    window.jQuery.CalendarPage.init();
  })();
