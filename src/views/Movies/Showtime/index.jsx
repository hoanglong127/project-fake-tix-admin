import React, { useEffect, useState } from "react";
import {
  Typography,
  Form,
  Button,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchMovieInfo } from "../../../store/actions/movieAction";
import { request } from "../../../api/request";
import { DOMAIN } from "../../../utils/config";
import { useFormik } from "formik";
import moment from "moment";
import * as yup from "yup";
import Swal from "sweetalert2";

const { Title, Text } = Typography;

const schema = yup.object().shape({
  maRap: yup.string().required("Vui lòng chọn cụm rạp"),
  ngayChieuGioChieu: yup
    .string()
    .required("Vui lòng chọn ngày chiếu, giờ chiếu"),
});

const Showtime = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const movieInfo = useSelector((state) => state.movieReducer.movieInfo);
  const [cinema, setCinema] = useState({
    theaterSystemList: [],
    theaterList: [],
  });
  const { errors, touched, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      maPhim: params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 85000,
    },
    validateOnMount: true,
    validationSchema: schema,
    onSubmit: async (values, isValid) => {
      if (!isValid) return;

      try {
        await request({
          method: "POST",
          url: `${DOMAIN}/api/QuanLyDatVe/TaoLichChieu`,
          data: values,
        });

        Swal.fire({
          icon: "success",
          title: "Tạo lịch chiếu thành công!",
        }).then(() => {
          history.push("/movies");
        });
      } catch (err) {
        console.log(err.response.data.content);
      }
    },
  });

  useEffect(() => {
    const { id } = params;
    dispatch(fetchMovieInfo(id));

    async function fetchTheaterSystem() {
      try {
        const res = await request({
          method: "GET",
          url: `${DOMAIN}/api/QuanLyRap/LayThongTinHeThongRap`,
        });

        setCinema({
          ...cinema,
          theaterSystemList: res.data.content,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchTheaterSystem();
  }, []);

  const handleChangeDate = (value) => {
    const time = moment(value).format("DD/MM/YYYY HH:mm:ss");
    setFieldValue("ngayChieuGioChieu", time);
  };

  const handleOkDate = (value) => {
    const time = moment(value).format("DD/MM/YYYY HH:mm:ss");
    setFieldValue("ngayChieuGioChieu", time);
  };

  const handleChangeInputNumber = (value) => {
    setFieldValue("giaVe", value);
  };

  const handleChangeTheaterSystem = async (value) => {
    try {
      const res = await request({
        method: "GET",
        url: `${DOMAIN}/api/QuanLyRap/LayThongTinCumRapTheoHeThong`,
        params: { maHeThongRap: value },
      });

      setCinema({
        ...cinema,
        theaterList: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeTheaters = (value) => {
    setFieldValue("maRap", value);
  };

  const convertSelectTheaterSystem = () => {
    return cinema.theaterSystemList.map((system) => ({
      label: system.tenHeThongRap,
      value: system.maHeThongRap,
    }));
  };

  const convertSelectTheaters = () => {
    return cinema.theaterList.map((theater) => ({
      label: theater.tenCumRap,
      value: theater.maCumRap,
    }));
  };

  return (
    <div className="movieManage">
      <Title level={3}>Tạo lịch chiếu</Title>
      <div className="movie-detail">
        <img src={movieInfo?.hinhAnh} alt={movieInfo?.tenPhim} />
        <div>
          <Title level={5}>{movieInfo?.tenPhim}</Title>
          <Text>{movieInfo?.moTa}</Text>
        </div>
      </div>
      <Form
        onSubmitCapture={handleSubmit}
        name="showtime"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        autoComplete="off"
      >
        <Form.Item label="Hệ thống rạp">
          <Select
            options={convertSelectTheaterSystem()}
            onChange={handleChangeTheaterSystem}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Select
            options={convertSelectTheaters()}
            name="maRap"
            onChange={handleChangeTheaters}
            // onBlur={handleBlur}
            placeholder="Chọn cụm rạp"
          />
          {touched.maRap && (
            <span style={{ color: "red" }}>{errors.maRap}</span>
          )}
        </Form.Item>

        <Form.Item label="Ngày chiếu, giờ chiếu">
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm:ss"
            onChange={handleChangeDate}
            onOk={handleOkDate}
            name="ngayChieuGioChieu"
            placeholder="Chọn ngày giờ chiếu"
          />
          {touched.ngayChieuGioChieu && (
            <p style={{ color: "red", marginBottom: 0 }}>
              {errors.ngayChieuGioChieu}
            </p>
          )}
        </Form.Item>

        <Form.Item label="Giá vé">
          <InputNumber
            min={85000}
            max={150000}
            defaultValue={85000}
            onChange={handleChangeInputNumber}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Showtime;
