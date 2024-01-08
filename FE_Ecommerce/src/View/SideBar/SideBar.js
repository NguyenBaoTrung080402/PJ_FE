import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="card col-xl-2 col-lg-2 col-md-2 mx-5">
      <div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul
            id="sidebarnav"
            className="d-flex flex-column justify-content-center"
          >
            <li className="nav-small-cap text-center py-5">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
              <h4 className="hide-menu text-uppercase fw-bolder">ACCOUNT</h4>
            </li>
            <li className="sidebar-item ">
              <NavLink
                className="sidebar-link nav-link nav-item text-dark mx-3 py-3 sidebar-hover"
                to="/account"
                aria-expanded="false"
              >
                <span className="mx-3">
                  <i class="fa-solid fa-address-card"></i>
                </span>
                <span className="hide-menu ">Profile</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link nav-link nav-item active text-dark mx-3 py-3 sidebar-hover"
                to="/change-password"
                aria-expanded="false"
              >
                <span className="mx-3">
                  <i class="fa-solid fa-lock"></i>
                </span>
                <span className="hide-menu">Password</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link nav-link nav-item active text-dark mx-3 py-3 sidebar-hover"
                to="./ui-card.html"
                aria-expanded="false"
              >
                <span className="mx-3">
                  <i className="fa-solid fa-chart-line"></i>
                </span>
                <span className="hide-menu">Purchased</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link nav-link nav-item active text-dark mx-3 py-3 sidebar-hover"
                to="./ui-forms.html"
                aria-expanded="false"
              >
                <span className="mx-3">
                  <i className="fa-regular fa-comment-dots"></i>
                </span>
                <span className="hide-menu">Cancelled</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
