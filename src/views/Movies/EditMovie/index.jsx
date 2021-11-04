import React, { useEffect, useState } from "react";
import moment from "moment";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Typography, Form, Input, Button, DatePicker, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useFormik } from "formik";
import {
  fetchMovieInfo,
  updateMovie,
} from "../../../store/actions/movieAction";
import { GROUP_ID } from "../../../utils/config";

const { Title } = Typography;

const schema = yup.object().shape({
  tenPhim: yup.string().required("Vui lòng nhập tên phim"),
  trailer: yup.string().required("Vui lòng nhập trailer"),
  moTa: yup.string().required("Vui lòng nhập mô tả"),
  danhGia: yup
    .string()
    .required("Vui lòng nhập đánh giá")
    .matches(/^[0-9]+$/g, { message: "Vui lòng nhập số từ 1 -> 10" }),
});

const EditMovie = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const movieInfo = useSelector((state) => state.movieReducer.movieInfo);
  const [imgSrc, setImgSrc] = useState(null);
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
      maPhim: movieInfo?.maPhim,
      tenPhim: movieInfo?.tenPhim,
      trailer: movieInfo?.trailer,
      moTa: movieInfo?.moTa,
      ngayKhoiChieu: movieInfo?.ngayKhoiChieu,
      sapChieu: movieInfo?.sapChieu,
      dangChieu: movieInfo?.dangChieu,
      hot: movieInfo?.hot,
      danhGia: movieInfo?.danhGia,
      hinhAnh: null,
      maNhom: GROUP_ID,
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: schema,
    onSubmit: (values, isValid) => {
      if (!isValid) return;

      const formData = new FormData();

      for (let key in values) {
        if (key === "hinhAnh" && values.hinhAnh)
          formData.append(key, values[key]);
        else if (key === "ngayKhoiChieu")
          formData.append(key, moment(values[key]).format("DD/MM/YYYY"));
        else formData.append(key, values[key]);
      }

      dispatch(
        updateMovie(formData, (status, icon, title) => {
          if (status)
            Swal.fire({
              icon,
              title,
            }).then(() => {
              history.push("/");
            });
          else
            Swal.fire({
              icon,
              title,
            });
        })
      );
    },
  });

  useEffect(() => {
    const { id } = params;
    dispatch(fetchMovieInfo(id));
  }, []);

  const handleChangeSwitch = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };

  const handleChangeDate = (value) => {
    const formatDate = moment(value);
    setFieldValue("ngayKhoiChieu", formatDate);
  };

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await setFieldValue("hinhAnh", file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  return (
    <div className="movieManage">
      <Title level={3}>Chỉnh sửa phim</Title>
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            value={values.tenPhim}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.tenPhim && (
            <span style={{ color: "red" }}>{errors.tenPhim}</span>
          )}
        </Form.Item>

        <Form.Item label="Trailer">
          <Input
            name="trailer"
            value={values.trailer}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.trailer && (
            <span style={{ color: "red" }}>{errors.trailer}</span>
          )}
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            value={values.moTa}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.moTa && <span style={{ color: "red" }}>{errors.moTa}</span>}
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            name="ngayKhoiChieu"
            format="DD/MM/YYYY"
            value={moment(values.ngayKhoiChieu)}
            onChange={handleChangeDate}
            allowClear={false}
          />
        </Form.Item>

        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            name="sapChieu"
            autoFocus={true}
            checked={values.sapChieu}
            onChange={handleChangeSwitch("sapChieu")}
          />
        </Form.Item>

        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            name="dangChieu"
            autoFocus={true}
            checked={values.dangChieu}
            onChange={handleChangeSwitch("dangChieu")}
          />
        </Form.Item>

        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            name="hot"
            autoFocus={true}
            checked={values.hot}
            onChange={handleChangeSwitch("hot")}
          />
        </Form.Item>

        <Form.Item label="Đánh giá">
          <Input
            name="danhGia"
            value={values.danhGia}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.danhGia && (
            <span style={{ color: "red" }}>{errors.danhGia}</span>
          )}
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} />
          <img
            style={{ marginTop: 10, width: 100, objectFit: "cover" }}
            src={imgSrc ? imgSrc : movieInfo?.hinhAnh}
            alt="imgSrc"
          />
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

export default EditMovie;
