import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { skillServices } from './skills.service';

const addSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillServices.addSkill(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill added successfully !',
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await skillServices.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill data fetched successfully !',
    data: result,
  });
});
const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillServices.getSingleSkill(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Skill data fetched successfully !',
    data: result,
  });
});
const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillServices.updateSkill(req.body, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill data updated successfully !',
    data: result,
  });
});



const deleteSkill= catchAsync(async (req: Request, res: Response) => {
  const result = await skillServices.deleteSkill(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted successfully !',
    data: result,
  });
});

export const skillController = {
  addSkill,
  getAll,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
