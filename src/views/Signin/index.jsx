import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "./style.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn } from "../../store/actions/authAction";
import Swal from "sweetalert2";

const { Title } = Typography;

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(
      signIn(
        values,
        () => {
          history.push("/movies");
        },
        (title) => {
          Swal.fire({
            icon: "warning",
            title,
            text: "Vui lòng đăng nhập lại!",
          });
        }
      )
    );
  };

  return (
    <Form
      className="signIn"
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ width: "50%", margin: "0 auto" }}
    >
      <Title level={2}>Đăng nhập Admin</Title>

      <Form.Item
        label="Tài khoản"
        name="taiKhoan"
        rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="matKhau"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password autoComplete="true" />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
        <Button htmlType="reset">Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default Signin;
