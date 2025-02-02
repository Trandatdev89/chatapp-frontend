import { useEffect, useState } from "react";
import { Col, Row, Select, message } from "antd";
import { Button, Form, Input } from "antd";
import "../index.scss";
import { getAllUsers } from "../../Services/UserServices";
import {
  addUserToGroup,
  createChatRoom,
} from "../../Services/ChatRoomServices";

export default function CreateRoom() {
  const token = localStorage.getItem("token");
  const [option, setOption] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getAllUsers(token);
      const result = res.data.map((item) => ({
        label: item.username,
        value: item.id,
      }));
      setOption(result);
    };

    fetchAPI();
  }, []);

  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];

  console.log(option);

  const handleFinish = async (value) => {
    value.picture = document.getElementById("picture").files[0];
    const res = await createChatRoom(value, token);
    if (res.code === 200) {
      messageApi.open({
        type: "success",
        content: "Cập nhập thành công",
      });
      form.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhập thất bại",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ marginTop: "50px" }}>
        <div className="container">
          <div className="infoUser">
            <Row gutter={[15, 15]}>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="infoUser__main">
                  <div className="infoUser__nav">
                    <div className="infoUser__img">
                      <img
                        src={
                          "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                        }
                        alt="loading..."
                      />
                    </div>
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
                      <h3>Tạo nhóm</h3>
                      <p>Thêm thành viên vào nhóm</p>
                    </div>
                  </div>
                  <hr />
                  <div className="infoUser__form">
                    <Form
                      size="large"
                      layout="vertical"
                      onFinish={handleFinish}
                      encType="multipart/form-data"
                      form={form}
                    >
                      <Form.Item rules={rules} label="Tên nhóm" name="name">
                        <Input />
                      </Form.Item>
                      <Form.Item
                        rules={rules}
                        label="Danh sách user"
                        name="userId"
                      >
                        <Select
                          mode="multiple"
                          allowClear
                          style={{
                            width: "100%",
                          }}
                          placeholder="Please select"
                          options={option}
                        />
                      </Form.Item>
                      <Form.Item label="Tải avatar">
                        <input type="file" id="picture" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" size="middle">
                          Tạo
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
