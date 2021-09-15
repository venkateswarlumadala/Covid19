import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Services from "../../Service";

export default function CovidStatsScreen() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortsType, setSortType] = useState("AscendingState");
  const [sortsIndianType, setSortIndianType] = useState("AscendingIndian");
  const [sortsForeignType, setSortForeignType] = useState("AscendingForeign");
  const [sortDischargedType, setSortDischargedType] = useState(
    "AscendingDischarged"
  );
  const [sortsDeathType, setSortDeathType] = useState("AscendingDeath");
  const [sortsTotalType, setSortTotalType] = useState("AscendingTotal");

  const covid19DataList = async () => {
    try {
      await Services.covid19Data()
        .then((data) => {
          setData(data.data.regional);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const results = !search
    ? data
    : data.filter((person) =>
        person.loc.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const onSort = (sortType) => {
    setSortType(sortType);
    data.sort((a, b) => {
      const isReversed = sortsType === "descendingState" ? 1 : -1;
      return isReversed * a.loc.localeCompare(b.loc);
    });
  };

  const onIndianCasesSort = (sortIndianType) => {
    setSortIndianType(sortIndianType);
    data.sort((a, b) => {
      const isNumberReversed =
        sortsIndianType === "descendingIndian"
          ? a.confirmedCasesIndian - b.confirmedCasesIndian
          : b.confirmedCasesIndian - a.confirmedCasesIndian;
      return isNumberReversed;
    });
  };

  const onForeignCasesSort = (sortForeignType) => {
    setSortForeignType(sortForeignType);
    data.sort((a, b) => {
      const isNumberReversed =
        sortsForeignType === "descendingForeign"
          ? a.confirmedCasesForeign - b.confirmedCasesForeign
          : b.confirmedCasesForeign - a.confirmedCasesForeign;
      return isNumberReversed;
    });
  };

  const onDischargedSort = (sortDischargeType) => {
    setSortDischargedType(sortDischargeType);
    data.sort((a, b) => {
      const isNumberReversed =
        sortDischargedType === "descendingDischarged"
          ? a.discharged - b.discharged
          : b.discharged - a.discharged;
      return isNumberReversed;
    });
  };

  const onDeathsSort = (sortDeathType) => {
    setSortDeathType(sortDeathType);
    data.sort((a, b) => {
      const isNumberReversed =
        sortsDeathType === "descendingDeath"
          ? a.deaths - b.deaths
          : b.deaths - a.deaths;
      return isNumberReversed;
    });
  };

  const onTotalSort = (sortTotalType) => {
    setSortTotalType(sortTotalType);
    data.sort((a, b) => {
      const isNumberReversed =
        sortsTotalType === "descendingTotal"
          ? a.totalConfirmed - b.totalConfirmed
          : b.totalConfirmed - a.totalConfirmed;
      return isNumberReversed;
    });
  };

  useEffect(() => {
    covid19DataList();
  }, []);

  return (
    <div className="m-3">
      <div className="col-md-12">
        <div className="row">
          <div className="col-sm-8">
            <i
              className="fa fa-arrow-right text-white border-round bg-secondary p-2"
              onClick={() => history.push("/indianStatesMap")}
            >
              Next
            </i>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <div className="col-sm-4 mb-3"></div>
              <div className="col-sm-8 mb-3">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Search Here"
                  value={search}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="row">
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-sm mb-0">
                  <thead className="bg-dark">
                    <tr>
                      <th className="text-center border text-white">
                        State
                        <i
                          className="fa fa-arrow-up mx-2"
                          onClick={() => onSort("AscendingState")}
                        ></i>
                        <i
                          className="fa fa-arrow-down"
                          onClick={() => onSort("descendingState")}
                        ></i>
                      </th>
                      <th className="text-center border text-white">
                        Indian Cases
                        <i
                          className="fa fa-arrow-up mx-2"
                          onClick={() => onIndianCasesSort("AscendingIndian")}
                        ></i>
                        <i
                          className="fa fa-arrow-down"
                          onClick={() => onIndianCasesSort("descendingIndian")}
                        ></i>
                      </th>
                      <th className="text-center border text-white">
                        Foreign Cases
                        <i
                          className="fa fa-arrow-up mx-2"
                          onClick={() => onForeignCasesSort("AscendingForeign")}
                        ></i>
                        <i
                          className="fa fa-arrow-down"
                          onClick={() =>
                            onForeignCasesSort("descendingForeign")
                          }
                        ></i>
                      </th>
                      <th className="text-center border text-white">
                        Discharged
                        <i
                          className="fa fa-arrow-up mx-2"
                          onClick={() =>
                            onDischargedSort("AscendingDischarged")
                          }
                        ></i>
                        <i
                          className="fa fa-arrow-down"
                          onClick={() =>
                            onDischargedSort("descendingDischarged")
                          }
                        ></i>
                      </th>
                      <th className="text-center border text-white">
                        Deaths
                        <i
                          className="fa fa-arrow-up mx-2"
                          onClick={() => onDeathsSort("AscendingDeath")}
                        ></i>
                        <i
                          className="fa fa-arrow-down"
                          onClick={() => onDeathsSort("descendingDeath")}
                        ></i>
                      </th>
                      <th className="text-center border text-white">
                        Total Confirmed
                        <i
                          className="fa fa-arrow-up mx-2"
                          onClick={() => onTotalSort("AscendingTotal")}
                        ></i>
                        <i
                          className="fa fa-arrow-down"
                          onClick={() => onTotalSort("descendingTotal")}
                        ></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((detail, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center" style={{ fontSize: 14 }}>
                            {detail.loc}
                          </td>
                          <td className="text-center" style={{ fontSize: 14 }}>
                            {detail.confirmedCasesIndian}
                          </td>
                          <td className="text-center" style={{ fontSize: 14 }}>
                            {detail.confirmedCasesForeign}
                          </td>
                          <td className="text-center" style={{ fontSize: 14 }}>
                            {detail.discharged}
                          </td>
                          <td className="text-center" style={{ fontSize: 14 }}>
                            {detail.deaths}
                          </td>
                          <td className="text-center" style={{ fontSize: 14 }}>
                            {detail.totalConfirmed}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
