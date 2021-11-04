import React, { Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Avatar, Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.css";
import { logOut } from "../../store/actions/authAction";

const { Text } = Typography;

const AdminAvatar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const adminInfo = useSelector((state) => state.authReducer.adminInfo);

  const handleLogout = () => {
    dispatch(
      logOut(() => {
        history.push("/");
      })
    );
  };

  return (
    <Fragment>
      {adminInfo && (
        <div className="adminAvatar">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          <Text className="adminAvatar-name">{adminInfo?.hoTen}</Text>
          <Button onClick={handleLogout}>Đăng xuất</Button>
        </div>
      )}
    </Fragment>
  );
};

export default memo(AdminAvatar);
