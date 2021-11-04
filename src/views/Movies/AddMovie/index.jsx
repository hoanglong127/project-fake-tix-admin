import React, { useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import {
  Typography,
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import { useHistory } from "react-router";
import { GROUP_ID } from "../../../utils/config";
import { useDispatch } from "react-redux";
import { addMovie } from "../../../store/actions/movieAction";

const { Title } = Typography;

const AddMovie = () => {
  const [file, setFile] = useState(null);
  const [errorFile, setErrorFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmitForm = (values) => {
    if (!file) {
      setErrorFile("Vui lòng chọn hình ảnh");
      return;
    }

    const newMovie = {
      ...values,
      ngayKhoiChieu: moment(values.ngayKhoiChieu).format("DD/MM/YYYY"),
      hinhAnh: file,
      dangChieu: !!values.dangChieu,
      sapChieu: !!values.sapChieu,
      hot: !!values.hot,
      maNhom: GROUP_ID,
    };

    const formData = new FormData();

    for (let key in newMovie) {
      formData.append(key, newMovie[key]);
    }

    dispatch(
      addMovie(formData, () => {
        Swal.fire({
          icon: "success",
          title: "Thêm phim thành công!",
        }).then(() => {
          history.push("/movies");
        });
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    if (!file) setErrorFile("Vui lòng chọn hình ảnh");
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      setErrorFile(null);

      // Tạo đối tượng để đọc file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };

      setFile(file);
    } else {
      setErrorFile("Vui lòng chọn hình ảnh");
    }
  };

  return (
    <div className="movieManage">
      <Title level={3}>Thêm phim mới</Title>
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinishFailed={onFinishFailed}
        onFinish={handleSubmitForm}
      >
        <Form.Item
          label="Tên phim"
          name="tenPhim"
          rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
        >
          <Input name="tenPhim" />
        </Form.Item>

        <Form.Item
          label="Trailer"
          name="trailer"
          rules={[{ required: true, message: "Vui lòng nhập trailer" }]}
        >
          <Input name="trailer" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="moTa"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input name="moTa" />
        </Form.Item>

        <Form.Item
          label="Ngày khởi chiếu"
          name="ngayKhoiChieu"
          rules={[{ required: true, message: "Vui lòng chọn ngày khởi chiếu" }]}
        >
          <DatePicker name="ngayKhoiChieu" placeholder="Chọn ngày khởi chiếu" />
        </Form.Item>

        <Form.Item label="Sắp chiếu" name="sapChieu" valuePropName="checked">
          <Switch name="sapChieu" autoFocus={true} />
        </Form.Item>

        <Form.Item label="Đang chiếu" name="dangChieu" valuePropName="checked">
          <Switch name="dangChieu" autoFocus={true} />
        </Form.Item>

        <Form.Item label="Hot" name="hot" valuePropName="checked">
          <Switch name="hot" autoFocus={true} />
        </Form.Item>

        <Form.Item
          label="Đánh giá"
          name="danhGia"
          rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
        >
          <InputNumber name="danhGia" />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input onChange={handleChangeFile} type="file" />
          {errorFile && (
            <p style={{ color: "red", marginBottom: 0 }}>{errorFile}</p>
          )}
          {imgSrc && (
            <img
              style={{ marginTop: 10, width: 100, objectFit: "cover" }}
              src={imgSrc}
              alt="imgSrc"
            />
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMovie;
