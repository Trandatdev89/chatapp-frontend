import { useEffect, useState } from "react";
import { Col, Row, message } from "antd";
import { Button, Form, Input } from "antd";
import "./index.scss";
import { getMyInfo, updateUser } from "../Services/UserServices";
import { jwtDecode } from "jwt-decode";

export default function MyInfo() {
  const token = localStorage.getItem("token");
  const userId = jwtDecode(token).sub;
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [Edit, IsEdit] = useState(true);
  const [form] = Form.useForm();
  const [reload, setReload] = useState([]);
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];
  const handleClick = () => {
    IsEdit(false);
  };
  const handleCancel = () => {
    IsEdit(true);
  };

  const fetchAPI = async () => {
    const user = await getMyInfo(token);
    console.log(user.data);
    setData(user.data);
  };

  useEffect(() => {
    fetchAPI();
  }, [reload]);

  const handleFinish = async (value) => {
    value.picture = document.getElementById("picture").files[0];
    const res = await updateUser(parseInt(userId), value, token);
    if (res.code === 200) {
      IsEdit(true);
      setReload(!reload);
      messageApi.open({
        type: "success",
        content: "Cập nhập thành công",
      });
      
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhập thất bại",
      });
    }
  };
  useEffect(() => {
    form.resetFields(); //đoạn này là để giúp initialValue hoạt động
  }, [data]);

  return (
    <>
      {contextHolder}
      <div style={{ marginTop: "50px" }}>
        <div className="container">
          {data ? (
            <div className="infoUser">
              <Row gutter={[15, 15]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div className="infoUser__main">
                    <div className="infoUser__nav">
                      <div className="infoUser__img">
                        <img
                          src={
                            data.picture ||
                            "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                          }
                          alt="loading..."
                        />
                      </div>
                      <h5>{data.fullName}</h5>
                    </div>
                    <div
                      className="infoUser__wrap"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h3>Hồ sơ của tôi</h3>
                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                      </div>
                      <div>
                        {Edit ? (
                          <Button type="primary" onClick={handleClick}>
                            Chỉnh sửa
                          </Button>
                        ) : (
                          <Button danger onClick={handleCancel}>
                            Hủy
                          </Button>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="infoUser__form">
                      <Form
                        initialValues={data}
                        size="large"
                        layout="vertical"
                        disabled={Edit}
                        form={form}
                        onFinish={handleFinish}
                        encType="multipart/form-data"
                      >
                        <Form.Item
                          rules={rules}
                          label="Tên tài khoản"
                          name="username"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          rules={rules}
                          label="Tên đầy đủ"
                          name="fullname"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={rules}>
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Số điện thoại"
                          name="phone"
                          rules={rules}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item label="Tải avatar">
                          <input type="file" id="picture"/>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            size="middle"
                          >
                            Cập nhập
                          </Button>
                          <Button
                            className="ms-2"
                            size="middle"
                            onClick={handleCancel}
                            type="primary"
                            htmlType="submit"
                          >
                            Cancel
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <h2>Loading data...</h2>
          )}
        </div>
      </div>
    </>
  );
}
