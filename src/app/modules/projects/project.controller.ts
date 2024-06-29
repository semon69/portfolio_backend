import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { projectServices } from './project.service';

const addProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.addProject(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project added successfully !',
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project data fetched successfully !',
    data: result,
  });
});
const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.getSingleProject(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Project data fetched successfully !',
    data: result,
  });
});
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.updateProject(req.body, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project data updated successfully !',
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.deleteProject(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted successfully !',
    data: result,
  });
});

export const projectController = {
  addProject,
  getAll,
  getSingleProject,
  updateProject,
  deleteProject,
};
