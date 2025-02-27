"use strict";
var ScheduleList = [],
  SCHEDULE_CATEGORY = ["milestone", "task"];
function ScheduleInfo() {
  (this.id = null),
    (this.calendarId = null),
    (this.title = null),
    (this.body = null),
    (this.isAllday = !1),
    (this.start = null),
    (this.end = null),
    (this.category = ""),
    (this.dueDateClass = ""),
    (this.color = null),
    (this.bgColor = null),
    (this.dragBgColor = null),
    (this.borderColor = null),
    (this.customStyle = ""),
    (this.isFocused = !1),
    (this.isPending = !1),
    (this.isVisible = !0),
    (this.isReadOnly = !1),
    (this.goingDuration = 0),
    (this.comingDuration = 0),
    (this.recurrenceRule = ""),
    (this.state = ""),
    (this.raw = {
      memo: "",
      hasToOrCc: !1,
      hasRecurrenceRule: !1,
      location: null,
      class: "public",
      creator: { name: "", avatar: "", company: "", email: "", phone: "" },
    });
}
function generateTime(e, a, o) {
  var n = moment(a.getTime()),
    i = moment(o.getTime()),
    t = i.diff(n, "days");
  (e.isAllday = chance.bool({ likelihood: 30 })),
    e.isAllday
      ? (e.category = "allday")
      : chance.bool({ likelihood: 30 })
      ? ((e.category = SCHEDULE_CATEGORY[chance.integer({ min: 0, max: 1 })]),
        e.category === SCHEDULE_CATEGORY[1] && (e.dueDateClass = "morning"))
      : (e.category = "time"),
    n.add(chance.integer({ min: 0, max: t }), "days"),
    n.hours(chance.integer({ min: 0, max: 23 })),
    n.minutes(chance.bool() ? 0 : 30),
    (e.start = n.toDate()),
    (i = moment(n)),
    e.isAllday && i.add(chance.integer({ min: 0, max: 3 }), "days"),
    (e.end = i.add(chance.integer({ min: 1, max: 4 }), "hour").toDate()),
    !e.isAllday &&
      chance.bool({ likelihood: 20 }) &&
      ((e.goingDuration = chance.integer({ min: 30, max: 120 })),
      (e.comingDuration = chance.integer({ min: 30, max: 120 })),
      chance.bool({ likelihood: 50 }) && (e.end = e.start));
}
function generateNames() {
  for (
    var e = [], a = 0, o = chance.integer({ min: 1, max: 10 });
    a < o;
    a += 1
  )
    e.push(chance.name());
  return e;
}
function generateRandomSchedule(e, a, o) {
  var n,
    i = new ScheduleInfo();
  (i.id = chance.guid()),
    (i.calendarId = e.id),
    (i.title = chance.sentence({ words: 3 })),
    (i.body = chance.bool({ likelihood: 20 })
      ? chance.sentence({ words: 10 })
      : ""),
    (i.isReadOnly = chance.bool({ likelihood: 20 })),
    generateTime(i, a, o),
    (i.isPrivate = chance.bool({ likelihood: 10 })),
    (i.location = chance.address()),
    (i.attendees = chance.bool({ likelihood: 70 }) ? generateNames() : []),
    (i.recurrenceRule = chance.bool({ likelihood: 20 })
      ? "repeated events"
      : ""),
    (i.state = chance.bool({ likelihood: 20 }) ? "Free" : "Busy"),
    (i.color = e.color),
    (i.bgColor = e.bgColor),
    (i.dragBgColor = e.dragBgColor),
    (i.borderColor = e.borderColor),
    "milestone" === i.category &&
      ((i.color = i.bgColor),
      (i.bgColor = "transparent"),
      (i.dragBgColor = "transparent"),
      (i.borderColor = "transparent")),
    (i.raw.memo = chance.sentence()),
    (i.raw.creator.name = chance.name()),
    (i.raw.creator.avatar = chance.avatar()),
    (i.raw.creator.company = chance.company()),
    (i.raw.creator.email = chance.email()),
    (i.raw.creator.phone = chance.phone()),
    chance.bool({ likelihood: 20 }) &&
      ((n = chance.minute()), (i.goingDuration = n), (i.comingDuration = n)),
    ScheduleList.push(i);
}
function generateSchedule(n, i, t) {
  (ScheduleList = []),
    CalendarList.forEach(function (e) {
      var a = 0,
        o = 10;
      for ("month" === n ? (o = 3) : "day" === n && (o = 4); a < o; a += 1)
        generateRandomSchedule(e, i, t);
    });
}
