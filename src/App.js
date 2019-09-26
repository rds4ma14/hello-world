import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
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
            greeting: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
            .then(response => response.json())
            .then(state => this.setState(state));
    }

    render() {
        return (
            <div className="App">
                <div id="pieChart" className="chart" />
                {/* <header className="App-header"> */}
                {/* <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p> */}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Make ur own graph: </label>
                    <input
                        id="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.greeting}</p>
                {/* <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a> */}
                {/* </header> */}
            </div>
        );
    }
    componentDidMount() {
        let chart = new PieChart({
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

            data: {
                preloaded: data
            },

            toolbar: {
                fullscreen: true,
                enabled: true
            }
        });
        return chart;
    }
}

export default App;
