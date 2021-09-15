import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../StatsCard/styles.css";

export default function StatsCard({
  title,
  cases,
  total,
  active,
  isRed,
  isInfo,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed === true
          ? "border-danger"
          : isInfo === true
          ? "border-info"
          : "border-success"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2
          className={`infoBox__cases ${
            isRed === true
              ? "text-danger"
              : isInfo === true
              ? "text-info"
              : "text-success"
          }`}
        >
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}
