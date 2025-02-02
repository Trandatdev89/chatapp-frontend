import PrivateRoute from "../AllRouter/PrivateRoute";
import Login from "../Auth/Login.jsx";
import Logout from "../Auth/Logout.jsx";
import Register from "../Auth/Register.jsx";
import Home from "../page/Home.jsx";
import MyInfo from "../page/MyInfo.jsx";
import Friend from "../page/PrivatePage/Friend.jsx";
import ChatRoom from "../page/PublicPage/ChatRoom.jsx";
import CreateRoom from "../page/PublicPage/CreateRoom.jsx";
export const route = [
  {
    index:true,
    path: "/",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <PrivateRoute allowedRoles={["MEMBER", "ADMIN"]} />,
    children: [
      {
        path: "/chatapp",
        element: <Home />,
        children: [
          {
            path: "/chatapp/friend/:id",
            element: <Friend />,
          },
          {
            path: "/chatapp/chatroom/:id",
            element: <ChatRoom />,
          },
        ],
      },
      {
        path: "/profile",
        element: <MyInfo />,
      },
      {
        path: "/create-room",
        element: <CreateRoom/>,
      },
    ],
  },
];
