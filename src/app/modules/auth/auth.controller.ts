import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  forgotPassword,
  loginUser,
  registerUserIntoDb,
  resetPassword,
} from "./auth.service";

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


export const forgotPasswordRequest = catchAsync(async (req, res) => {
  const result = await forgotPassword(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});


export const resetPasswordRequest = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;

  if (!token) {
    throw new Error('A reset token is required');
  }

  const result = await resetPassword(req.body, token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});
  