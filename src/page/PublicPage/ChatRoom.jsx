import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { jwtDecode } from "jwt-decode";
import {
  getMyInfo,
  getUserByChatRoomId,
  leaveRoom,
} from "../../Services/UserServices";
import { blockUser, getChatRoomById } from "../../Services/ChatRoomServices";
import { Button, Drawer, Form, Select } from "antd";

export default function ChatRoom() {
  const token = localStorage.getItem("token");
  const tokenDecode = jwtDecode(token);
  const [message, setMessage] = useState([]);
  const [stompClient, setStompClient] = useState();
  const [chatRoom, setChatRoom] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState();
  const params = useParams();
  const [open1, setOpen1] = useState(false);
  const [data, setData] = useState([]);
  const navigate=useNavigate();

  const showDrawer = () => {
    setOpen1(true);
  };
  const onClose = () => {
    setOpen1(false);
  };

  useEffect(() => {
    const connect = new SockJS("http://localhost:8080/ws");
    const dat = Stomp.over(connect);

    dat.connect({ Authorization: `Bearer ${token}` }, async () => {
      dat.subscribe("/chatroom/public", (message) => {
        const recievedMessage = JSON.parse(message.body);
        setMessage((preMessage) => recievedMessage);
      });

      const contentMessage = {
        chatroomId: params.id,
      };
      dat.send(
        "/app/message",
        { Authorization: `Bearer ${token}` },
        JSON.stringify(contentMessage)
      );
    });

    // Lưu stomp client vào state
    setStompClient(dat);

    return () => {
      dat.disconnect();
    };
  }, [params.id, user.username]);

  const handleSendMessage = () => {
    if (stompClient && inputMessage) {
      const contentMessage = {
        message: inputMessage,
        senderId: parseInt(tokenDecode.sub),
        status: "MESSAGE",
        chatroomId: params.id,
      };
      stompClient.send(
        "/app/message",
        { Authorization: `Bearer ${token}` },
        JSON.stringify(contentMessage)
      );
    }
    let inputRef = document.getElementById("inputRef");
    inputRef.value = "";
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const infoUser = await getMyInfo(token);
      const chatroom = await getChatRoomById(params.id, token);
      setChatRoom(chatroom.data);
      setUser(infoUser.data);
    };
    fetchAPI();
  }, [params.id]);

  const handleClick = async () => {
    const userChat = await getUserByChatRoomId(params.id, token);
    const result = userChat.data.map((item) => ({
      label: item.username,
      value: item.id,
    }));
    setData(result);
    setOpen(!open);
  };

  const handleLeave = async () => {
    const res = await leaveRoom(
      {
        idUser: [parseInt(tokenDecode.sub)],
        chatRoomId: parseInt(params.id),
      },
      token
    );
    if (res.code === 200) {
      alert("Rời thành công");
      navigate("/chatapp");
    } else {
      alert("Rời không thành công");
    }
  };

  const handleFinish = async (value) => {
    value.chatRoomId = params.id;
    const res = await blockUser(value, token);
    if (res.code === 200) {
      alert("Block thành công");
    } else {
      alert("Block không thành công");
    }
  };

  return (
    <>
      <div class="col-md-8 col-xl-6 chat">
        <div class="card">
          <div class="card-header msg_head">
            <div class="d-flex bd-highlight">
              <div class="img_cont">
                <img
                  src={
                    chatRoom?.picture ||
                    "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                  }
                  class="rounded-circle user_img"
                  alt="loading..."
                  style={{ objectFit: "cover" }}
                />
                <span class="online_icon"></span>
              </div>
              <div class="user_info">
                <span>{chatRoom.name}</span>
                <p>1767 Messages</p>
              </div>
            </div>
            <span id="action_menu_btn" onClick={handleClick}>
              <i class="fas fa-ellipsis-v"></i>
            </span>
            <div
              class="action_menu"
              style={open ? { display: "block" } : { display: "none" }}
            >
              <ul>
                <li onClick={handleLeave}>
                  <i class="fas fa-users"> Leave ChatRoom</i>
                </li>
                {tokenDecode.scope === "ADMIN" && (
                  <li onClick={showDrawer}>
                    <i class="fas fa-ban"></i> Block
                  </li>
                )}
              </ul>
            </div>
          </div>
          {message.length>0 ? (
            <div
            class="card-body msg_card_body"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <div className="wrap" style={{"display":"flex","flexDirection":"column"}}>
              {message
                .sort((a, b) => a.id - b.id)
                .map((item, index) => {
                  if (item.senderId === parseInt(tokenDecode.sub)) {
                    return (
                      <>
                        <div class="d-flex justify-content-end mx-2">{item.senderName}</div>
                        <div
                          class="d-flex justify-content-end mb-4"
                          key={index}
                        >
                          <div class="msg_cotainer_send">
                            {item.message}
                            <span class="msg_time_send">{item.date}</span>
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div class="d-flex justify-content-start ms-5">{item.senderName}</div>
                        <div
                          class="d-flex justify-content-start mb-4"
                          key={index}
                        >
                          <div class="img_cont_msg">
                            <img
                              src={
                                item?.picture != null
                                  ? item?.picture
                                  : "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                              }
                              class="rounded-circle user_img_msg"
                              alt="loding..."
                            />
                          </div>
                          <div class="msg_cotainer">
                            {item.message}
                            <span class="msg_time">{item.date}</span>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
            </div>
          </div>
          ):(
            <h5 style={{color:"#fff",margin:"0 10px"}}>Đang tải tin nhắn</h5>
          )}
          
          <div class="card-footer">
            <div class="input-group">
              <div class="input-group-append">
                <span
                  class="input-group-text attach_btn"
                  style={{ height: "100%" }}
                >
                  <i class="fas fa-paperclip"></i>
                </span>
              </div>
              <input
                name=""
                class="form-control type_msg"
                placeholder="Type your message..."
                onChange={(e) => setInputMessage(e.target.value)}
                id="inputRef"
              />
              <div class="input-group-append">
                <span
                  class="input-group-text send_btn"
                  style={{ height: "100%" }}
                  onClick={handleSendMessage}
                >
                  <i class="fas fa-location-arrow"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer title="Block User" onClose={onClose} open={open1}>
        <Form size="large" layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Danh sách user" name="idUser">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              options={data}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="middle" danger>
              Chặn
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
