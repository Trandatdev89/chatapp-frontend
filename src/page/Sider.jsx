import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  getMyInfo,
  searchUserOrGroup,
} from "../Services/UserServices";
import { getChatRoomAll } from "../Services/ChatRoomServices";
import { Link } from "react-router-dom";
import { Button, Dropdown, Space } from "antd";
import { BarsOutlined,LogoutOutlined,ProfileOutlined,WechatOutlined} from "@ant-design/icons";


export default function Sider() {
  const [user, setUser] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState([]);
  const [info, setInfo] = useState([]);

  const items = [
    {
      key: "1",
      label: (
        <Link to="/profile" style={{textDecoration:"none"}}>Profile</Link>
      ),
      icon:<ProfileOutlined />
    },
    {
      key: "2",
      label: (
         <Link to="/create-room" style={{textDecoration:"none"}}>Create Room</Link>
      ),
      icon:<WechatOutlined />
    },
    {
      key: "3",
      danger: true,
      label: (
         <Link to="/logout" style={{textDecoration:"none"}}>Logout</Link>
      ),
      icon:<LogoutOutlined />
    }
  ];

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getAllUsers(token);
      const result = await getChatRoomAll(token);
      const infoUser = await getMyInfo(token);
      setInfo(infoUser.data);
      setChatRoom(result.data);
      setUser(res.data);
    };
    fetchAPI();
  }, []);

  console.log(chatRoom);

  const handleClick = async () => {
    const res = await searchUserOrGroup({ title: search }, token);
    console.log(res);
    if (res.data.chats == null) {
      setUser(res.data.users);
    }
    if (res.users == null) {
      setChatRoom(res.data.chats);
    }
  };

  return (
    <div className="col-md-4 col-xl-3 chat">
      <div style={{ maxHeight: "660px", overflowY: "auto" }}>
        <div className="card mb-sm-3 mb-md-0 contacts_card">
          <div className="card-info">
            <div className="card-thumnail">
              <img src={info?.picture || "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"} alt="loading..." />
              <div className="card-name">{info?.username}</div>
            </div>
            <div className="card-icon">
              <Dropdown
                arrow
                placement="bottomRight"
                trigger="click"
                menu={{
                  items,
                }}
              >
                  <Button icon={<BarsOutlined />} style={{backgroundColor:"transparent"}}> 
                  </Button>
              </Dropdown>
            </div>
          </div>
          <div className="card-header">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search..."
                name
                className="form-control search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="input-group-prepend">
                <span
                  className="input-group-text search_btn"
                  style={{ height: "100%" }}
                  onClick={handleClick}
                >
                  <i className="fas fa-search" />
                </span>
              </div>
            </div>
          </div>
          <div className="card-body contacts_body">
            <ul className="contacts">
              {(user || []).map((item, index) => (
                <li className="active" key={index}>
                  <Link
                    to={`/chatapp/friend/${item.id}`}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src={item?.picture || "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"}
                          className="rounded-circle user_img"
                          alt="loading"
                          style={{objectFit:"cover"}}
                        />
                        <span className="online_icon" />
                      </div>
                      <div className="user_info">
                        <span>{item.username}</span>
                        <p>Kalid is online</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              {(chatRoom || []).map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/chatapp/chatroom/${item.id}`}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src={item?.picture || "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"}
                          className="rounded-circle user_img"
                          alt="loading..."
                          style={{objectFit:"cover"}}
                        />
                        <span className="online_icon" />
                      </div>
                      <div className="user_info">
                        <span>{item.name}</span>
                        <p>Chatroom is online</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer" />
        </div>
      </div>
    </div>
  );
}
