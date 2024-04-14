import React, { useEffect } from "react";
import Chart from 'chart.js/auto';
import './Dashboard.css';
const Dashboard = () => {
  useEffect(() => {
    const initializeChart = () => {
        // Set default font family for the chart
        Chart.defaults.font.family = "Poppins";
      
        // Get the chart context
        const ctx = document.querySelector("#revenueChart");
        if (!ctx) return;
      
        // Check if a chart instance already exists
        if (ctx.chart) {
          // Destroy the existing chart instance
          ctx.chart.destroy();
        }
      
        // Create new chart instance
        ctx.chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Sept 1",
              "Sept 3",
              "Sept 6",
              "Sept 9",
              "Sept 12",
              "Sept 15",
              "Sept 18",
              "Sept 21",
              "Sept 24",
              "Sept 27",
              "Sept 30",
            ],
            datasets: [
              {
                label: "Views",
                borderColor: "green",
                backgroundColor: "rgba(235, 247, 245, 0.5)",
                data: [0, 30, 60, 25, 60, 25, 50, 10, 50, 90, 120],
              },
              {
                label: "Watch time",
                borderColor: "blue",
                backgroundColor: "rgba(233, 238, 253, 0.5)",
                data: [0, 60, 25, 100, 20, 75, 30, 55, 20, 60, 20],
              },
            ],
          },
          options: {
            responsive: true,
            tooltips: {
              intersect: false,
              mode: "index",
            },
          },
        });
      };
      

    // Call initializeChart on component mount
    initializeChart();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <header>
          <div className="header-wrapper">
            <label htmlFor="menu-toggle">
              <span className="las la-bars"></span>
            </label>
            <div className="header-title">
              <h1>Analytics</h1>
              <p>
                Display analytics about your Channel <span className="las la-chart-line"></span>
              </p>
            </div>
          </div>
          <div className="header-action">
            <button className="btn btn-main">
              <span className="las la-video"></span>
              Upload
            </button>
          </div>
        </header>
        <main>
          <section>
            <h3 className="section-head">Overview</h3>
            <div className="analytics">
              <div className="analytic">
                <div className="analytic-icon">
                  <span className="las la-eye"></span>
                </div>
                <div className="analytic-info">
                  <h4>Total views</h4>
                  <h1>10.3M</h1>
                </div>
              </div>
              <div className="analytic">
                <div className="analytic-icon">
                  <span className="las la-clock"></span>
                </div>
                <div className="analytic-info">
                  <h4>Watch time (hrs)</h4>
                  <h1>
                    20.9k <small className="text-danger">5%</small>
                  </h1>
                </div>
              </div>
              <div className="analytic">
                <div className="analytic-icon">
                  <span className="las la-users"></span>
                </div>
                <div className="analytic-info">
                  <h4>Subscribers</h4>
                  <h1>
                    1.3k <small className="text-success">12%</small>
                  </h1>
                </div>
              </div>
              <div className="analytic">
                <div className="analytic-icon">
                  <span className="las la-heart"></span>
                </div>
                <div className="analytic-info">
                  <h4>Total likes</h4>
                  <h1>3.4M</h1>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="block-grid">
              <div className="revenue-card">
                <h3 className="section-head">Total Revenue</h3>
                <div className="rev-content">
                  <img src="https://media-exp1.licdn.com/dms/image/C4D03AQF9R2lxnH4fOw/profile-displayphoto-shrink_800_800/0/1639841285929?e=1654128000&v=beta&t=QvocDiNfivbaAzHjsX9fnl9eFa1ZSo4SBHeH4jZANEk" alt="profile" />
                  <div className="rev-info">
                    <h3>Mohsen Alizade</h3>
                    <h1>
                      3.5M <small>Subscribers</small>
                    </h1>
                  </div>
                  <div className="rev-sum">
                    <h4>Total income</h4>
                    <h2>$70.859</h2>
                  </div>
                </div>
              </div>
              <div className="graph-card">
                <h3 className="section-head">Graph</h3>
                <div className="graph-content">
                  <div className="graph-head">
                    <div className="icon-wrapper">
                      <div className="icon">
                        <span className="las la-eye text-main"></span>
                      </div>
                      <div className="icon">
                        <span className="las la-clock text-success"></span>
                      </div>
                    </div>
                    <div className="graph-select">
                      <select name="" id="">
                        <option value="">September</option>
                      </select>
                    </div>
                  </div>
                  <div className="graph-board">
                    <canvas id="revenueChart" width="100%"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
