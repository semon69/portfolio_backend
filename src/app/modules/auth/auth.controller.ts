import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginUser, registerUserIntoDb } from "./auth.service";

export  const registerUser = catchAsync(async (req, res) => {
  const result = await registerUserIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Registered successfully',
    data: result,
  });
});



export const userLogin = catchAsync(async (req, res) => {
    const result = await loginUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User login successful',
      data: result
    });
  });
  