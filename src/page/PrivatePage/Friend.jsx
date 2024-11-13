import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../Services/UserServices";

export default function Friend() {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const tokenDecode = jwtDecode(token);
  const [inputMessage, setInputMessage] = useState();
  const [open,setOpen]=useState(false);
  const param = useParams();

  useEffect(() => {
    const connect = new SockJS("http://localhost:8080/ws");
    const dat = Stomp.over(connect);

    // Kết nối và gửi Authorization header
    dat.connect({ Authorization: `Bearer ${token}` }, async () => {
      // Đảm bảo gọi subscribe đúng cách
      dat.subscribe(`/user/${parseInt(param.id)}/private`, (message) => {
        const recievedMessage = JSON.parse(message.body);
        console.log(recievedMessage);
        setMessage((preMessage) => recievedMessage); // Cập nhật state với tin nhắn nhận được
      });

      const contentMessage = {
        senderId: parseInt(tokenDecode.sub),
        receiverId: parseInt(param.id), // Lấy id từ params
      };
      dat.send(
        "/app/private",
        { Authorization: `Bearer ${token}` },
        JSON.stringify(contentMessage)
      );
    });

    // Lưu stomp client vào state
    setStompClient(dat);

    // Cleanup: hủy kết nối khi component unmount
    return () => {
      dat.disconnect();
    };
  }, [param.id, message.length]);

  const handleSendMessage = () => {
    if (stompClient && inputMessage) {
      const contentMessage = {
        message: inputMessage,
        senderId: parseInt(tokenDecode.sub),
        receiverId: parseInt(param.id), // Lấy id từ params
        status: "MESSAGE",
      };
      stompClient.send(
        "/app/private",
        { Authorization: `Bearer ${token}` },
        JSON.stringify(contentMessage)
      );
    }
    let inputRef=document.getElementById("inputRef");
    inputRef.value="";
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getUserById(param.id, token);
      setUser(res.data);
    };
    fetchAPI();
  }, [param.id]);

  const handleClick=()=>{
     setOpen(!open);
  }

  return (
    <div class="col-md-8 col-xl-6 chat">
      <div class="card">
        <div class="card-header msg_head">
          <div class="d-flex bd-highlight">
            <div class="img_cont">
              <img
                src={user?.picture || "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"}
                class="rounded-circle user_img"
                alt="loading..."
                style={{objectFit:"cover"}}
              />
              <span class="online_icon"></span>
            </div>
            <div class="user_info">
              <span>{user.username}</span>
              <p>1767 Messages</p>
            </div>
          </div>
          <span id="action_menu_btn" onClick={handleClick}>
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <div class="action_menu" style={open?{display:"block"}:{display:"none"}}>
            <ul>
              <li>
                <i class="fas fa-ban"></i> Block
              </li>
            </ul>
          </div>
        </div>
        <div
          class="card-body msg_card_body"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          {message
            .sort((a, b) => a.id - b.id)
            .map((item, index) => {
              if (item.senderId === parseInt(tokenDecode.sub)) {
                return (
                  <div class="d-flex justify-content-end mb-4" key={index}>
                    <div class="msg_cotainer_send">
                      {item.message}
                      <span class="msg_time_send">{item.date}</span>
                    </div>
                    
                  </div>
                );
              } else {
                return (
                  <div class="d-flex justify-content-start mb-4" key={index}>
                    <div class="img_cont_msg">
                      <img
                        src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                        class="rounded-circle user_img_msg"
                        alt="loading..."
                      />
                    </div>
                    <div class="msg_cotainer">
                      {item.message}
                      <span class="msg_time">{item.date}</span>
                    </div>
                  </div>
                );
              }
            })}
        </div>
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
  );
}
