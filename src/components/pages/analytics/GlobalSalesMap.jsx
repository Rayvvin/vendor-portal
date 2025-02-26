// src/components/GlobalSalesMap.js
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { Tooltip } from "@mui/material";
import { africaSalesData } from "./data/superAdminData";

// Updated TopoJSON URL for Africa
const geoUrl = "https://code.highcharts.com/mapdata/custom/africa.topo.json";

// Create a color scale based on sales values
const colorScale = scaleQuantize()
  .domain([0, 90000]) // Adjust domain based on your data range
  .range([
    "#f7fcf0",
    "#e0f3db",
    "#ccebc5",
    "#a8ddb5",
    "#7bccc4",
    "#4eb3d3",
    "#2b8cbe",
    "#0868ac",
    "#084081",
  ]);

const GlobalSalesMap = () => {
  return (
    <ComposableMap projectionConfig={{ scale: 400 }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryCode = geo.properties["iso-a2"]; // Adjust if necessary
            const countrySales = africaSalesData.find(
              (s) => s.countryCode === countryCode
            );
            const salesValue = countrySales ? countrySales.sales : 0;
            return (
              <Tooltip
                key={geo.rsmKey}
                title={
                  countrySales
                    ? `${geo.properties.name}: $${salesValue.toLocaleString()}`
                    : `${geo.properties.name}: No Data`
                }
              >
                <Geography
                  geography={geo}
                  fill={countrySales ? colorScale(salesValue) : "#EEE"}
                  stroke="#FFF"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#CFD8DC", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              </Tooltip>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default GlobalSalesMap;
