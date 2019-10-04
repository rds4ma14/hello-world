/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import "./css/App.css";
import zc from "@dvsl/zoomcharts";

const data = require("./resultado.json");

const { PieChart } = zc;

const license = require("./License.json");
// Zoomcharts license and license key
window.ZoomChartsLicense = license.License;
window.ZoomChartsLicenseKey = license.LicenseKey;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            search: "",
            json: "",
            greeting: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleJson = this.handleJson.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const chart = new PieChart({
            container: document.getElementById("pieChart"),
            assetsUrlBase: "./../node_modules/@dvsl/zoomcharts/lib/assets",
            area: { height: 500 },
            interaction: {
                mode: "select",
                resizing: {
                    enabled: false
                }
            },
            pie: {
                innerRadius: 0
            },
            slice: {
                expandableMarkStyle: {
                    lineWidth: 0
                }
            },

            data: [
                {
                    preloaded: data
                }
            ],

            toolbar: {
                fullscreen: true,
                enabled: true
            }
        });

        return chart;
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeSearch(event) {
        this.setState({ search: event.target.value });
    }

    handleJson(event) {
        this.setState({ json: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(
            `/api/greeting?name=${encodeURIComponent(
                this.state.name
            )}&search=${encodeURIComponent(this.state.search)}`
        )
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(state => {
                console.log("json state1    ", this.state.json);
                this.setState({ json: state });
                console.log("json state2 ", this.state.json);

                // setInterval(function() {
                //     alert("Hello");
                // }, 10000);
            });
    }

    render() {
        return (
          <div className="App">
            <div className="chart-wrapper">
              <div id="pieChart" className="chart" />
            </div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Coluna: </label>
              <input
                id="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="search">Campo: </label>
              <input
                id="search"
                type="text"
                value={this.state.search}
                onChange={this.handleChangeSearch}
              />

              <button type="submit">Submit</button>
            </form>
            <p>{this.state.greeting}</p>
          </div>
        );
    }
}

export default App;
