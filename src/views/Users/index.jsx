import React, { Fragment, useEffect } from "react";
import { Button, Typography, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.css";
import InputSearch from "../../component/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../store/actions/userAction";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { request } from "../../api/request";
import { DOMAIN } from "../../utils/config";
import Swal from "sweetalert2";

const { Title, Text } = Typography;

const Users = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userReducer.userList);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Thao tác",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (username) => (
        <Fragment>
          <Link
            to={`/users/editUser/${username}`}
            style={{ marginRight: 12, fontSize: 20 }}
          >
            <Text type="warning">
              <EditOutlined />
            </Text>
          </Link>
          <Text
            onClick={() => handleDeleteUser(username)}
            style={{ fontSize: 20, cursor: "pointer" }}
            type="danger"
          >
            <DeleteOutlined />
          </Text>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDeleteUser = (username) => {
    Swal.fire({
      icon: "question",
      title: "Bạn có chắc muốn xoá người dùng này chứ?",
      showCancelButton: true,
      cancelButtonText: "Huỷ",
      confirmButtonText: "Xoá",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(
          deleteUser(username, (status, title) => {
            if (status)
              Swal.fire({
                icon: "success",
                title: title,
              });
            else
              Swal.fire({
                icon: "error",
                title,
              });
          })
        );
      }
    });
  };

  const handleChangePagination = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSearch = (fullName) => {
    dispatch(fetchUsers(fullName));
  };

  return (
    <div className="userManage">
      <Title level={3}>Danh sách người dùng</Title>
      <div className="userManage-controls">
        <Button
          onClick={() => history.push("/users/addUser")}
          type="primary"
          icon={<PlusOutlined />}
        >
          Thêm người dùng
        </Button>
        <InputSearch onSearch={onSearch} />
      </div>
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="taiKhoan"
        pagination={{
          position: ["bottomCenter"],
          onChange: handleChangePagination,
        }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default Users;
