import React from "react";
import "./style.css";
import "jquery/dist/jquery.min.js";
import Sider from "./Sider";
import { Outlet } from "react-router-dom";

export default function Home() {

  return (
    <div class="maincontainer">
      <div class="container-fluid h-50">
        <div
          class="row justify-content-center h-100"
          style={{ marginTop: "50px" }}
        >
          <Sider />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
