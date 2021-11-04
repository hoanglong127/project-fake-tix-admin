import createAction from ".";
import { request } from "../../api/request";
import { DOMAIN, GROUP_ID } from "../../utils/config";
import actionTypes from "../types";

export const fetchUsers = (fullName = "") => {
  return async (dispatch) => {
    try {
      const res = await (fullName
        ? request({
            method: "GET",
            url: `${DOMAIN}/api/QuanLyNguoiDung/LayDanhSachNguoiDung`,
            params: { MaNhom: GROUP_ID, tuKhoa: fullName },
          })
        : request({
            method: "GET",
            url: `${DOMAIN}/api/QuanLyNguoiDung/LayDanhSachNguoiDung`,
            params: { MaNhom: GROUP_ID },
          }));

      dispatch(createAction(actionTypes.SET_USER_LIST, res.data.content));
    } catch (err) {
      console.log(err.response?.data.content);
    }
  };
};

export const fetchUserType = async (dispatch) => {
  try {
    const res = await request({
      method: "GET",
      url: `${DOMAIN}/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
    });

    dispatch(createAction(actionTypes.SET_USER_TYPE_LIST, res.data.content));
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserInfo = (username) => {
  return async (dispatch) => {
    try {
      const res = await request({
        method: "POST",
        url: `${DOMAIN}/api/QuanLyNguoiDung/LayThongTinNguoiDung`,
        params: { taiKhoan: username },
      });

      dispatch(createAction(actionTypes.SET_USER_INFO, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (username, alertMessage) => {
  return async (dispatch) => {
    try {
      const res = await request({
        method: "DELETE",
        url: `${DOMAIN}/api/QuanLyNguoiDung/XoaNguoiDung`,
        params: { TaiKhoan: username },
      });

      console.log(res);
      dispatch(fetchUsers());
      alertMessage(true, res.data.content);
    } catch (err) {
      console.log(err.response.data.content);
      alertMessage(false, err.response.data.content);
    }
  };
};
