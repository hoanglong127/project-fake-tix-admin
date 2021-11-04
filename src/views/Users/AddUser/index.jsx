import React, { useEffect } from "react";
import { Typography, Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserType } from "../../../store/actions/userAction";
import { request } from "../../../api/request";
import { DOMAIN, GROUP_ID } from "../../../utils/config";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const { Title } = Typography;
const { Option } = Select;

const AddUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userTypeList = useSelector((state) => state.userReducer.userTypeList);

  useEffect(() => {
    dispatch(fetchUserType);
  }, []);

  const handleAddUser = async (values) => {
    const newUser = {
      ...values,
      maNhom: GROUP_ID,
    };

    try {
      await request({
        method: "POST",
        url: `${DOMAIN}/api/QuanLyNguoiDung/ThemNguoiDung`,
        data: newUser,
      });

      Swal.fire({
        icon: "success",
        title: "Thêm người dùng thành công!",
      }).then(() => {
        history.push("/users");
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: err.response.data.content,
      });
    }
  };

  return (
    <div className="userManage">
      <Title level={3}>Thêm người dùng</Title>
      <Form
        name="add-user"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={handleAddUser}
        autoComplete="off"
      >
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
        >
          <Input name="taiKhoan" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password name="matKhau" />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="hoTen"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input name="hoTen" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input name="hoTen" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="soDt"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input name="soDt" />
        </Form.Item>

        <Form.Item
          label="Loại người dùng"
          name="maLoaiNguoiDung"
          rules={[
            { required: true, message: "Vui lòng chọn loại người dùng!" },
          ]}
        >
          <Select placeholder="Chọn loại người dùng" name="maLoaiNguoiDung">
            {userTypeList.map((item) => (
              <Option key={item.maLoaiNguoiDung} value={item.maLoaiNguoiDung}>
                {item.tenLoai}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
