import React from "react";

const TILE_WIDTH = 100;
const TILE_HEIGHT = 100;

const EmptyCalendarTile = () => (
  <div
    style={{
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
      border: "1px solid transparent"
    }}
  />
);

const CalendarTileBorder = ({ date, children }) => (
  <div
    style={{
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
      border: "1px solid gray",
      backgroundColor: "lightgray",
      color: "gray",
      position: "relative",
      paddingTop: "1em"
    }}
  >
    <div style={{ position: "absolute", top: -5, left: 5 }}>
      {date.getDate()}
    </div>
    {children}
  </div>
);

export default class Calendar extends React.PureComponent {
  state = {
    calendar: []
  };

  static getDerivedStateFromProps(props) {
    const someDate = props.date;
    const year = someDate.getFullYear();
    const month = someDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const weekDay = firstDayOfMonth.getDay();

    const allDays = [
      ...Array.from(new Array(weekDay ? weekDay - 1 : 6)).map((_, di) => (
        <EmptyCalendarTile key={-(di + 1)} />
      )),
      ...Array.from(new Array(lastDayOfMonth.getDate())).map((_, di) => {
        let targetDate = new Date(year, month, di + 1);

        let tileContent =
          props.tilesProvider && props.tilesProvider(targetDate);
        return (
          <CalendarTileBorder date={targetDate} key={di + 1}>
            {tileContent}
          </CalendarTileBorder>
        );
      })
    ];

    const calendar = [];
    while (allDays.length > 0) calendar.push(allDays.splice(0, 7));
    return { calendar };
  }

  render() {
    return (
      <div>
        {this.state.calendar.map((w, wi) => (
          <div key={wi} style={{ display: "flex" }}>
            {w}
          </div>
        ))}
      </div>
    );
  }
}
