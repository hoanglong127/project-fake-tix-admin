import createAction from ".";
import { request } from "../../api/request";
import { DOMAIN, GROUP_ID } from "../../utils/config";
import actionTypes from "../types";

export const fetchMovies = (movieName = "") => {
  return async (dispatch) => {
    try {
      const res = await (movieName
        ? request({
            method: "GET",
            url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachPhim`,
            params: { MaNhom: GROUP_ID, TenPhim: movieName },
          })
        : request({
            method: "GET",
            url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachPhim`,
            params: { MaNhom: GROUP_ID },
          }));

      dispatch(createAction(actionTypes.SET_MOVIE_LIST, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchMovieInfo = (id) => {
  return async (dispatch) => {
    try {
      const res = await request({
        method: "GET",
        url: `${DOMAIN}/api/QuanLyPhim/LayThongTinPhim`,
        params: { MaPhim: id },
      });

      dispatch(createAction(actionTypes.SET_MOVIE_INFO, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addMovie = (newMovie, alertSuccess) => {
  return async (dispatch) => {
    try {
      await request({
        method: "POST",
        url: `${DOMAIN}/api/QuanLyPhim/ThemPhimUploadHinh`,
        data: newMovie,
      });

      alertSuccess();
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateMovie = (movie, alertMessage) => {
  return async (dispatch) => {
    try {
      await request({
        method: "POST",
        url: `${DOMAIN}/api/QuanLyPhim/CapNhatPhimUpload`,
        data: movie,
      });

      alertMessage(true, "success", "Cập nhập phim thành công");
    } catch (err) {
      console.log(err.response);
      alertMessage(false, "warning", err.response.data.content);
    }
  };
};

export const deleteMovie = (id, alertSuccess) => {
  return async (dispatch) => {
    try {
      await request({
        method: "DELETE",
        url: `${DOMAIN}/api/QuanLyPhim/XoaPhim`,
        params: { MaPhim: id },
      });

      alertSuccess();
      dispatch(fetchMovies());
    } catch (err) {
      console.log(err);
    }
  };
};
