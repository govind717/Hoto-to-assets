import {
  PACKAGE_NO,
} from "./constants";

export const package_no_data_disptach = function (selectedValue) {
  return async (dispatch) => {
    dispatch({
      type: PACKAGE_NO,
      payload: selectedValue,
    });
  };
};
