import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../../../';
import { clearGetIndustrySlice, industryGet } from '../../../../store/reducers/dropdown/industry';
import { careerProfileUpdate } from '../../../../store/reducers/jobSeekerProfile/careerProfileUpdate';
import { clearGetDepartmentSlice, departmentGet } from '../../../../store/reducers/dropdown/department';
import { clearGetRoleCategorySlice, roleCategoryGet } from '../../../../store/reducers/dropdown/roleCategory';
import { clearGetJobRoleSlice, jobRoleGet } from '../../../../store/reducers/dropdown/jobRole';
import { clearGetCurrencySlice, currencyGet } from '../../../../store/reducers/dropdown/currency';
import { clearGetLocationSlice, locationGet } from '../../../../store/reducers/dropdown/location';
import { clearGetEmployeeTypeSlice, employeeTypeGet } from '../../../../store/reducers/dropdown/employeeType';
import { clearGetJobTypeSlice, jobTypeGet } from '../../../../store/reducers/dropdown/jobType';
import { clearGetPreferredShiftSlice, preferredShiftGet } from '../../../../store/reducers/dropdown/preferredShift';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import SingleCheckbox from './SingleCheckbox';

interface IFormInputs {
  industry: { value: string; label: string; }
  roleCategory: { value: string; label: string; }
  department: { value: string; label: string; }
  jobType: string[]
  jobRole: { value: string; label: string; }
  employeeType: string[]
  preferredShift: string[]
  preferredWorkLocation: { value: string; label: string; }
  currency: { value: string; label: string; }
  expectedSalary: string
}

const CareerProfileSchema = yup.object().shape({
  industry: yup.object().shape({
    value: yup.string().required("Please select industry"),
    label: yup.string().required("Please select industry"),
  }).nullable().required("Please select industry"),
  roleCategory: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  department: yup.object().shape({
    value: yup.string().required("Please select department"),
    label: yup.string().required("Please select department"),
  }),
  jobType: yup.array().min(1).of(yup.string().required()).required("Please check Job type"),
  jobRole: yup.object().shape({
    value: yup.string().required("Please select job role"),
    label: yup.string().required("Please select job role"),
  }),
  employeeType: yup.array().min(1).of(yup.string().required()).required("Please check employee type"),
  preferredShift: yup.array().min(1).of(yup.string().required()).required("Please check preferred shift"),
  preferredWorkLocation: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  currency: yup.object().shape({
    value: yup.string().required("Select currency"),
    label: yup.string().required("Select currency"),
  }),
  expectedSalary: yup.string().label("Please enter expected salary").required(),
}).required();

const CareerProfileForm = ({ id, profileDashboard, closeDialog }: any) => {

  const dispatch = useAppDispatch();
  const { success: industrySuccess, industry } = useAppSelector((state) => state.getIndustry);
  const { success: departmentSuccess, department } = useAppSelector((state) => state.getDepartment);
  const { success: roleCategorySuccess, roleCategory } = useAppSelector((state) => state.getRoleCategory);
  const { success: jobRoleSuccess, jobRole } = useAppSelector((state) => state.getJobRole);
  const { success: currencySuccess, currency } = useAppSelector((state) => state.getCurrency);
  const { success: locationSuccess, location } = useAppSelector((state) => state.getLocation);
  const { success: employeeTypeSuccess, employeeType } = useAppSelector((state) => state.getEmployeeType);
  const { success: jobTypeSuccess, jobType } = useAppSelector((state) => state.getJobType);
  const { success: preferredShiftSuccess, preferredShift } = useAppSelector((state) => state.getPreferredShift);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(CareerProfileSchema),
    // defaultValues: {
    //   industry: { value: '', label: '' },
    //   department: { value: '', label: '' },
    //   roleCategory: { value: '', label: '' },
    //   jobRole: { value: '', label: '' },
    //   preferredWorkLocation: { value: '', label: '' },
    //   currency: { value: '', label: '' },
    //   expectedSalary: '',
    //   jobType: [],
    //   employeeType: [],
    //   preferredShift: []
    // }
    defaultValues: {
      industry: profileDashboard?.industry && { value: profileDashboard?.industry?.id && profileDashboard?.industry?.id, label: profileDashboard?.industry?.title && profileDashboard?.industry?.title },
      department: profileDashboard?.department && { value: profileDashboard?.department?.id, label: profileDashboard?.department?.title },
      roleCategory: profileDashboard?.roleCategory && { value: profileDashboard?.roleCategory?.id, label: profileDashboard?.roleCategory?.title },
      jobRole: profileDashboard?.jobRole && { value: profileDashboard?.jobRole?.id, label: profileDashboard?.jobRole?.title },
      preferredWorkLocation: profileDashboard?.careerProfilePreferredLocations && { value: profileDashboard?.careerProfilePreferredLocations[0]?.location?.id, label: profileDashboard?.careerProfilePreferredLocations[0]?.location?.title },
      currency: profileDashboard?.currency && { value: profileDashboard?.currency?.id, label: profileDashboard?.currency?.title },
      expectedSalary: profileDashboard?.expectedSalary && profileDashboard?.expectedSalary,
      jobType: [],
      employeeType: [],
      preferredShift: []
    }
  });

  useEffect(() => {
    if (profileDashboard) {
      profileDashboard?.industry && setValue('industry', { label: profileDashboard?.industry?.title, value: profileDashboard?.industry?.id });
      profileDashboard?.department && setValue('department', { label: profileDashboard?.department?.title, value: profileDashboard?.department?.id });
      profileDashboard?.roleCategory && setValue('roleCategory', { label: profileDashboard?.roleCategory?.title, value: profileDashboard?.roleCategory?.id });
      profileDashboard?.jobRole && setValue('jobRole', { label: profileDashboard?.jobRole?.title, value: profileDashboard?.jobRole?.id });
      profileDashboard?.expectedSalary && setValue('expectedSalary', profileDashboard?.expectedSalary);
      profileDashboard?.currency && setValue('currency', { label: profileDashboard?.currency?.title, value: profileDashboard?.currency?.id });
      profileDashboard?.careerProfileEmployeeType && setValue('employeeType', profileDashboard?.careerProfileEmployeeType);
      profileDashboard?.careerProfilePreferredLocations && setValue('preferredWorkLocation', { label: profileDashboard?.careerProfilePreferredLocations[0]?.location?.title, value: profileDashboard?.careerProfilePreferredLocations[0]?.location?.id });
      profileDashboard?.careerProfileJobType && setValue('jobType', profileDashboard?.careerProfileJobType);
      profileDashboard?.careerProfilePreferredShift && setValue('preferredShift', profileDashboard?.careerProfilePreferredShift);
    }
  }, [setValue, profileDashboard]);

  useEffect(() => {
    dispatch(industryGet());
    dispatch(departmentGet());
    dispatch(roleCategoryGet());
    dispatch(jobRoleGet());
    dispatch(currencyGet());
    dispatch(locationGet());
    dispatch(employeeTypeGet());
    dispatch(jobTypeGet());
    dispatch(preferredShiftGet());

  }, [dispatch]);

  useEffect(() => {
    if (industrySuccess)
      dispatch(clearGetIndustrySlice());
    if (departmentSuccess)
      dispatch(clearGetDepartmentSlice());
    if (roleCategorySuccess)
      dispatch(clearGetRoleCategorySlice());
    if (jobRoleSuccess)
      dispatch(clearGetJobRoleSlice());
    if (currencySuccess)
      dispatch(clearGetCurrencySlice());
    if (locationSuccess)
      dispatch(clearGetLocationSlice());
    if (employeeTypeSuccess)
      dispatch(clearGetEmployeeTypeSlice());
    if (jobTypeSuccess)
      dispatch(clearGetJobTypeSlice());
    if (preferredShiftSuccess)
      dispatch(clearGetPreferredShiftSlice());

  }, [dispatch, roleCategorySuccess, industrySuccess, departmentSuccess, jobRoleSuccess, currencySuccess, locationSuccess, employeeTypeSuccess, jobTypeSuccess, preferredShiftSuccess]);

  const onSubmit = (data: IFormInputs) => {
    const jobType = data.jobType.map(jobType => ({ jobType }));
    const employeeType = data.employeeType.map(employeeType => ({ employeeType }));
    const preferredLocations = [data.preferredWorkLocation].map(location => ({ location: location.value }));
    const preferredShift = data.preferredShift.map(preferredShift => ({ preferredShift }));

    dispatch(careerProfileUpdate({ industry: data.industry.value, department: data.department.value, roleCategory: data.roleCategory.value, jobRole: data.jobRole.value, careerProfileJobType: jobType, careerProfileEmployeeType: employeeType, careerProfilePreferredLocations: preferredLocations, careerProfilePreferredShift: preferredShift, currency: data.currency.value, expectedSalary: data.expectedSalary, jobSeekerProfile: id }));
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-medium text-gray-900">Career profile</h1>
      </div>
      <span className="text-sm text-gray-500 mb-3">
        This information will help the recruiters  know about your current job profile and also your desired job criteria. This will also help us personalize your job recommendations.
      </span>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Current industry</div>
          <div className="mt-1">
            <AutocompleteBox
              control={control}
              isClearable={true}
              fieldName={"industry"}
              dropdownData={industry?.map(({ id, title }: any) => ({ value: id, label: title }))}
              default={watch("industry")}
              placeholder={"Select industry"}
            />
            {errors?.industry && <p className="font-normal text-xs text-red-500 absolute">{errors?.industry?.label?.message}</p>}
          </div>
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Department</div>
          <div className="mt-1">
            <AutocompleteBox
              control={control}
              isClearable={true}
              fieldName={"department"}
              dropdownData={department.map(({ id, title }: any) => ({ value: id, label: title }))}
              default={watch("department")}
              placeholder={"Select department"}
            />
            {errors?.department && <p className="font-normal text-xs text-red-500 absolute">{errors?.department?.label?.message}</p>}
          </div>
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Role category</div>
          <div className="mt-1">
            <AutocompleteBox
              control={control}
              isClearable={true}
              fieldName={"roleCategory"}
              dropdownData={roleCategory?.map(({ id, title }: any) => ({ value: id, label: title }))}
              default={watch("roleCategory")}
              placeholder={"Select role category"}
            />
            {errors?.roleCategory && <p className="font-normal text-xs text-red-500 absolute">{errors?.roleCategory?.label?.message}</p>}
          </div>
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Job role</div>
          <div className="mt-1">
            <AutocompleteBox
              control={control}
              isClearable={true}
              fieldName={"jobRole"}
              dropdownData={jobRole?.map(({ id, title }: any) => ({ value: id, label: title }))}
              default={watch("jobRole")}
              placeholder={"Select job role"}
            />
            {errors?.jobRole && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobRole?.label?.message}</p>}
          </div>
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Desired job type</div>
          <div className='grid grid-cols-3 gap-4 mt-1'>
            {jobType?.map((item, key) => <div key={item.id}>
              <SingleCheckbox
                register={register}
                fieldName="jobType"
                dbFieldName="jobType"
                singleData={item}
                checkData={profileDashboard?.careerProfileJobType}
              />
            </div>)}
            <div className='grid grid-cols-3 gap-4'></div>

          </div>
          {errors?.jobType && <div className="font-normal text-xs text-red-500 ">{errors?.jobType?.message}</div>}
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Desired employment type</div>
          <div className='grid grid-cols-3 gap-4 mt-1'>
            {employeeType?.map((item, key) => <div key={item.id}>
              <SingleCheckbox
                register={register}
                fieldName="employeeType"
                dbFieldName="employeeType"
                singleData={item}
                checkData={profileDashboard?.careerProfileEmployeeType}
              />
            </div>)}
          </div>
          {errors?.employeeType && <div className="font-normal text-xs text-red-500 ">{errors?.employeeType?.message}</div>}
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Preferred shift</div>
          <div className='grid grid-cols-3 gap-4 mt-1'>
            {preferredShift?.map((item, key) => <div key={item.id}>
              <SingleCheckbox
                register={register}
                fieldName="preferredShift"
                dbFieldName="preferredShift"
                singleData={item}
                checkData={profileDashboard?.careerProfilePreferredShift}
              />
            </div>
            )}
          </div>
          {errors?.preferredShift && <div className="font-normal text-xs text-red-500 ">{errors?.preferredShift?.message}</div>}
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Preferred work location</div>
          <div className="mt-1">

            <AutocompleteBox
              control={control}
              isClearable={true}
              fieldName={"preferredWorkLocation"}
              dropdownData={location?.map(({ id, title }: any) => ({ value: id, label: title }))}
              placeholder={"Select location"}
            />
            {errors?.preferredWorkLocation && <p className="font-normal text-xs text-red-500 absolute">{errors?.preferredWorkLocation?.label?.message}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="expectedSalary" className="block text-sm font-medium leading-6 text-gray-900">Expected salary</label>
          <div className="grid grid-cols-8 gap-4 mt-1">
            <div className="mt-1 col-span-1">
              <AutocompleteBox
                control={control}
                fieldName={"currency"}
                dropdownData={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                default={watch("currency")}
                placeholder={""}
              />
              {errors?.currency && <p className="font-normal text-xs text-red-500 absolute">{errors?.currency?.label?.message}</p>}
            </div>
            <div className="mt-1 col-span-7">

              <input defaultValue={profileDashboard?.expectedSalary}
                className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1'
                placeholder={"Salary"}
                {...register("expectedSalary")} />
              {errors?.expectedSalary && <p className="font-normal text-xs text-red-500">{errors?.expectedSalary?.message}</p>}
            </div>
          </div>
        </div>



        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-3xl bg-blue-500 text-white px-5 py-1.5" >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CareerProfileForm;