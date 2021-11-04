import React, { useEffect } from "react";
import { Typography, Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserInfo,
  fetchUserType,
} from "../../../store/actions/userAction";
import { useHistory, useParams } from "react-router";
import { useFormik } from "formik";
import { DOMAIN, GROUP_ID } from "../../../utils/config";
import * as yup from "yup";
import { request } from "../../../api/request";
import Swal from "sweetalert2";

const { Title } = Typography;
const { Option } = Select;

const schema = yup.object().shape({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không đúng định dạng"),
  soDt: yup.string().required("Vui lòng nhập số điện thoại"),
  hoTen: yup.string().required("Vui lòng nhập họ và tên"),
});

const EditUser = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo, userTypeList } = useSelector((state) => state.userReducer);
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      taiKhoan: userInfo?.taiKhoan,
      matKhau: userInfo?.matKhau,
      email: userInfo?.email,
      soDt: userInfo?.soDT,
      maNhom: GROUP_ID,
      maLoaiNguoiDung: userInfo?.maLoaiNguoiDung,
      hoTen: userInfo?.hoTen,
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: schema,
    onSubmit: async (values, isValid) => {
      if (!isValid) return;

      try {
        await request({
          method: "POST",
          url: `${DOMAIN}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
          data: values,
        });

        Swal.fire({
          icon: "success",
          title: "Cập nhập người dùng thành công!",
        }).then(() => {
          history.push("/users");
        });
      } catch (err) {
        console.log(err.response.data.content);
        Swal.fire({
          icon: "error",
          title: err.response.data.content,
        });
      }
    },
  });

  useEffect(() => {
    const { username } = params;
    dispatch(fetchUserInfo(username));
    dispatch(fetchUserType);
  }, []);

  const handleChangeSelect = (value) => {
    setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <div className="userManage">
      <Title level={3}>Cập nhập thông tin người dùng</Title>
      <Form
        name="add-user"
        onSubmitCapture={handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        autoComplete="off"
      >
        <Form.Item label="Tài khoản">
          <Input
            name="taiKhoan"
            value={values.taiKhoan}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          {touched.taiKhoan && (
            <span style={{ color: "red" }}>{errors.taiKhoan}</span>
          )}
        </Form.Item>

        <Form.Item label="Mật khẩu">
          <Input.Password
            name="matKhau"
            value={values.matKhau}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.matKhau && (
            <span style={{ color: "red" }}>{errors.matKhau}</span>
          )}
        </Form.Item>

        <Form.Item label="Họ và tên">
          <Input
            name="hoTen"
            value={values.hoTen}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.hoTen && (
            <span style={{ color: "red" }}>{errors.hoTen}</span>
          )}
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && (
            <span style={{ color: "red" }}>{errors.email}</span>
          )}
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <Input
            name="soDt"
            value={values.soDt}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.soDt && <span style={{ color: "red" }}>{errors.soDt}</span>}
        </Form.Item>

        <Form.Item label="Loại người dùng">
          <Select
            value={values.maLoaiNguoiDung}
            onChange={handleChangeSelect}
            name="maLoaiNguoiDung"
          >
            {userTypeList.map((item) => (
              <Option key={item.maLoaiNguoiDung} value={item.maLoaiNguoiDung}>
                {item.tenLoai}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Cập nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
