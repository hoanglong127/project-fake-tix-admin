import createAction from ".";
import actionTypes from "../types";
import { request } from "../../api/request";
import { DOMAIN } from "../../utils/config";

export const signIn = (admin, pageRedirects, alertWarning) => {
  return async (dispatch) => {
    try {
      const res = await request({
        method: "POST",
        url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
        data: admin,
      });

      if (res.data.content.maLoaiNguoiDung === "QuanTri") {
        localStorage.setItem("t_a", res.data.content.accessToken);
        dispatch(createAction(actionTypes.SET_ADMIN_INFO, res.data.content));
        pageRedirects();
      } else {
        alertWarning("Bạn không phải admin");
      }
    } catch (err) {
      console.log(err);
      alertWarning("Tài khoản hoặc mật khẩu không chính xác");
    }
  };
};

export const logOut = (pageRedirects) => {
  return (dispatch) => {
    localStorage.removeItem("t_a");
    dispatch(createAction(actionTypes.SET_ADMIN_INFO, null));
    pageRedirects();
  };
};

export const fetchAdminInfo = async (dispatch) => {
  try {
    const res = await request({
      method: "POST",
      url: `${DOMAIN}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
    });

    dispatch(createAction(actionTypes.SET_ADMIN_INFO, res.data.content));
  } catch (err) {
    console.log(err);
  }
};
