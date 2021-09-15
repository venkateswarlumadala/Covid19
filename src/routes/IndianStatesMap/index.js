import React, { useState } from "react";
import ReactDatamaps from "react-india-states-map";

export default function IndianStatesMapScreen() {
  const [activeState, setactiveState] = useState({
    name: "India",
  });

  const stateOnClick = (data, name) => {
    setactiveState({ data, name });
  };

  return (
    <div>
      <ReactDatamaps
        mapLayout={{
          hoverTitle: "Count",
          noDataColor: "#D36418",
          borderColor: "#ffffff",
          hoverBorderColor: "pink",
          hoverColor: "green",
        }}
        hoverComponent={({ value }) => {
          return (
            <>
              <p>{value.name}</p>
            </>
          );
        }}
        onClick={stateOnClick}
        activeState={activeState}
      />
      <div className="m-3">
        <center>
          <h1>{activeState.name}</h1>
        </center>
      </div>
    </div>
  );
}
