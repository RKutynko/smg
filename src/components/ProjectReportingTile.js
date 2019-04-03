import React from "react";

export default class ProjectReportingTile extends React.PureComponent {
  render() {
    const r = this.props.reportItem;

    return (
      <div key={r.id} className="reporting-tile-wrapper">
        <div
          className="reporting-tile"
          style={r.hours >= 8 ? { backgroundColor: "lightgreen" } : {}}
        >
          Prj# {r.projectId}; {r.hours}h
        </div>
      </div>
    );
  }
}
