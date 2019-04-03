import React from "react";
import Calendar from "../components/Calendar";
import { loadTime } from "../services/timeJournal.service";
import ProjectReportingTile from "../components/ProjectReportingTile";

export default class TimeJournalPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      reportedTime: [],
      targetDate: new Date(),
      ...this.formatDate(new Date())
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      reportedTime: [
        { id: 108, date: new Date(2019, 2, 15), hours: 8, projectId: 11 },
        { id: 109, date: new Date(2019, 2, 28), hours: 8, projectId: 11 },
        { id: 110, date: new Date(2019, 2, 31), hours: 8, projectId: 11 },
        { id: 111, date: new Date(2019, 3, 1), hours: 8, projectId: 11 },
        { id: 112, date: new Date(2019, 3, 2), hours: 6, projectId: 11 },
        { id: 113, date: new Date(2019, 3, 2), hours: 2, projectId: 3 },
        { id: 113, date: new Date(2019, 3, 3), hours: 8, projectId: 11 },
        { id: 115, date: new Date(2019, 3, 4), hours: 8, projectId: 11 },
        { id: 116, date: new Date(2019, 3, 5), hours: 8, projectId: 3 }
      ]
    });
  }

  provideTile = date => {
    let time = date.getTime();
    return this.state.reportedTime
      .filter(t => t.date.getTime() === time)
      .map(r => <ProjectReportingTile reportItem={r} />);
  };

  getEmptyView = () => <span style={{ marginLeft: "1em" }}>Loading...</span>;
  getErrorView = error => (
    <span style={{ color: "red", marginLeft: "1em" }}>{error}</span>
  );
  getCalendarView = () => (
    <Calendar date={this.state.targetDate} tilesProvider={this.provideTile} />
  );
  formatDate = date => ({
    yearText: date.getFullYear().toString(),
    monthText: this.MONTHS[date.getMonth()]
  });
  MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  monthBack = async () => {
    const prevMonth = new Date(this.state.targetDate);
    prevMonth.setMonth(this.state.targetDate.getMonth() - 1);
    this.setState({
      targetDate: prevMonth,
      ...this.formatDate(prevMonth),
      loading: true,
      error: null
    });

    try {
      let reportedTime = await loadTime(prevMonth);
      this.setState({ reportedTime, loading: false });
    } catch {
      this.setState({
        loading: false,
        error: "backend error"
      });
    }
  };

  monthForward = async () => {
    const nextMonth = new Date(this.state.targetDate);
    nextMonth.setMonth(this.state.targetDate.getMonth() + 1);
    this.setState({
      targetDate: nextMonth,
      ...this.formatDate(nextMonth),
      loading: true,
      error: null
    });

    try {
      let reportedTime = await loadTime(nextMonth);
      this.setState({ reportedTime, loading: false });
    } catch {
      this.setState({
        loading: false,
        error: "backend error"
      });
    }
  };

  render() {
    return (
      <>
        <header style={{ display: "flex", alignItems: "center" }}>
          <h1>Time journal</h1>
          {this.state.loading && this.getEmptyView()}
          {this.state.error && this.getErrorView(this.state.error)}
        </header>
        <div>
          <button onClick={this.monthBack}>&lt;</button>
          {this.state.monthText} - {this.state.yearText}
          <button onClick={this.monthForward}>&gt;</button>
        </div>

        {this.getCalendarView(this.state.reportedTime)}
      </>
    );
  }
}
