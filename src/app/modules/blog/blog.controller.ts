import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { blogServices } from './blog.service';

const addBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.addBlog(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog added successfully !',
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog data fetched successfully !',
    data: result,
  });
});
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getSingleBlog(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Blog data fetched successfully !',
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.updateBlog(req.body, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog data updated successfully !',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.deleteBlog(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully !',
    data: result,
  });
});

export const blogController = {
  addBlog,
  getAll,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
