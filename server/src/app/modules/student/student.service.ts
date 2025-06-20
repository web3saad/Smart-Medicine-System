/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { ApiError } from '../../../handlingError/ApiError';
import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    studentSearchableFields,
    sortBy,
    sortOrder
  );
  const result = await Student.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById({ _id: id });
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<any> => {
  const result = await Student.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  }).select('-password -role');
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};
const getUserName = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

const createStudent = async (payload: IStudent) => {
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }
  const existingStudent = await Student.findOne({ email: payload?.email });
  if (existingStudent) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Email already exists in the database'
    );
  }

  const createdStudent = await Student.create(payload);
  const { password, ...result } = createdStudent.toObject();
  return result;
};

export const StudentService = {
  getAllStudents,
  createStudent,
  getUserName,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
