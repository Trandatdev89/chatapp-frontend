import React, { useEffect, useState } from "react";
import "./style.css";
import { Spin, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import chatapp from "../Components/img/images.png";
import { useDispatch } from "react-redux";
import { ReloadUser } from "../Action/index";
import { login } from "../Services/AuthServices";
import { loginGoogle } from "../Services/GoogleServices";

export default function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [spining, setSpining] = useState(false);
  const [option, setOption] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setSpining(true);
    e.preventDefault();
    const userName = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    const data = {
      username: userName,
      password: password,
    };
    const result = await login(data);
    console.log(result);
    if (result.data) {
      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công",
      });
      localStorage.setItem("token", result.data.token);
      dispatch(ReloadUser(!data));
      navigate("/chatapp");
    } else {
      setSpining(false);
      messageApi.open({
        type: "error",
        content: `${result.message}`,
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setOption({
      ...option,
      [name]: value,
    });
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <>
      {contextHolder}
      <section
        className="h-100 gradient-form"
        style={{ backgroundImage: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div
                className="card rounded-3 text-black"
                style={{ height: "100%" }}
              >
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src={chatapp}
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The Lotus Team
                        </h4>
                      </div>
                      <Spin spinning={spining} tip="Đang đăng nhập">
                        <form onSubmit={handleSubmit}>
                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label
                              className="form-label"
                              htmlFor="form2Example11"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              id="form2Example11"
                              className="form-control"
                              placeholder="Phone number or email address"
                              onChange={handleChange}
                            />
                          </div>
                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label
                              className="form-label"
                              htmlFor="form2Example22"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="form2Example22"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <button type="button" class="login-with-google-btn" onClick={handleLogin}>
                              Sign in with Google
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to="/register">
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-outline-danger"
                            >
                              Create new
                            </button>
                          </Link>
                        </div>
                      </Spin>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
