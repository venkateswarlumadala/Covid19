import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FormControl, Select, Card, CardContent } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import { sortData, prettyPrintStat } from "../../components/Utils";
import numeral from "numeral";
import Map from "../../components/Map";
import Table from "../../components/Table";
import LineGraph from "../../components/LineGraph";
import "./styles.css";
import Services from "../../Service";
import StatsCard from "../../components/StatsCard";
const API_COVID_URL = process.env.REACT_APP_API_COVID_URL;

export default function Covid19Screen() {
  const history = useHistory();
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  const covid19All = async () => {
    try {
      await Services.covid19All()
        .then((data) => {
          setCountryInfo(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const covid19Countries = async () => {
    try {
      await Services.covid19Countries()
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    covid19All();
    covid19Countries();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? `${API_COVID_URL}/all`
        : `${API_COVID_URL}/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="col-md-12 px-3 py-2">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-9">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="app__header my-2">
                      <h1 className="my-2">COVID-19</h1>
                      <i
                        className="fa fa-arrow-right text-white border-round bg-secondary p-2"
                        onClick={() => history.push("/covidStats")}
                      >
                        Next
                      </i>
                      <FormControl size="small" className="my-2">
                        <Select
                          className="MuiSelect-select"
                          native
                          variant="outlined"
                          value={country}
                          onChange={onCountryChange}
                        >
                          <option value="worldwide">Worldwide</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country.value}>
                              {country.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-sm-4 my-3">
                    <StatsCard
                      onClick={(e) => setCasesType("cases")}
                      title="Coronavirus Cases"
                      isInfo
                      active={casesType === "cases"}
                      cases={prettyPrintStat(countryInfo.todayCases)}
                      total={numeral(countryInfo.cases).format("0.0a")}
                    />
                  </div>
                  <div className="col-sm-4 my-3">
                    <StatsCard
                      onClick={(e) => setCasesType("recovered")}
                      title="Recovered"
                      active={casesType === "recovered"}
                      cases={prettyPrintStat(countryInfo.todayRecovered)}
                      total={numeral(countryInfo.recovered).format("0.0a")}
                    />
                  </div>
                  <div className="col-sm-4 my-3">
                    <StatsCard
                      onClick={(e) => setCasesType("deaths")}
                      title="Deaths"
                      isRed
                      active={casesType === "deaths"}
                      cases={prettyPrintStat(countryInfo.todayDeaths)}
                      total={numeral(countryInfo.deaths).format("0.0a")}
                    />
                  </div>
                  <div className="col-sm-12">
                    <Map
                      countries={mapCountries}
                      casesType={casesType}
                      center={mapCenter}
                      zoom={mapZoom}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-3 my-3">
                <Card>
                  <CardContent>
                    <div className="app__information">
                      <h3>Live Cases by Country</h3>
                      <Table countries={tableData} />
                      <h3>Worldwide new {casesType}</h3>
                      <LineGraph casesType={casesType} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
