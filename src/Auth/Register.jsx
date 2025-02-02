import { Button, Col, DatePicker, Form, Input, Row, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/AuthServices";

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [spining, setSpining] = useState(false);
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values) => {
    setSpining(true);
    const res = await register(values);

    if (res.code===200) {
      setSpining(false);
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công",
      });
      form.resetFields();
      navigate("/");
    } else {
      setSpining(false);
      messageApi.open({
        type: "error",
        content: `${res.message}`,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{ borderRadius: 25, height: "100%" }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <Spin spinning={spining} tip="Đang đăng ký">
                        <Form
                          onFinish={handleFinish}
                          layout="vertical"
                          form={form}
                        >
                          <Row>
                            <Col span={24}>
                              <Form.Item
                                label="Tên tài khoản"
                                name="username"
                                rules={rules}
                              >
                                <Input
                                  placeholder="Tên đăng nhập"
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={rules}
                              >
                                <Input.Password
                                  placeholder="Nhap Mk"
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                label="Email"
                                name="email"
                                rules={rules}
                              >
                                <Input
                                  placeholder="Email"
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                label="Tên đầy đủ"
                                name="fullname"
                                rules={rules}
                              >
                                <Input
                                  placeholder="Tên đầy đủ"
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item label="SĐT" name="phone" rules={rules}>
                                <Input
                                  placeholder="Phone"
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item>
                                <Button
                                  type="primary"
                                  size="large"
                                  style={{ width: "100%" }}
                                  htmlType="submit"
                                >
                                  Đăng ký
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </Spin>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
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
