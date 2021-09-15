import React from "react";
import "../Table/styles.css";
import numeral from "numeral";

export default function Table({ countries }) {
  return (
    <div className="tables">
      <table>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
