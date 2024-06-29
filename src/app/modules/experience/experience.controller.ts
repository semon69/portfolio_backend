import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { experienceServices } from './experience.service';

const addEx = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceServices.addEx(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience added successfully !',
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceServices.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience data fetched successfully !',
    data: result,
  });
});
const getSingleEx = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceServices.getSingleEx(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Experience data fetched successfully !',
    data: result,
  });
});
const updateEx = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceServices.updateEx(req.body, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience data updated successfully !',
    data: result,
  });
});

const deleteEx = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceServices.deleteEx(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience deleted successfully !',
    data: result,
  });
});

export const skillController = {
  addEx,
  getAll,
  getSingleEx,
  updateEx,
  deleteEx,
};
