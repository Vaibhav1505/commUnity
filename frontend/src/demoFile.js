// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// import Input from "@mui/joy/Input";
// import { useRouter } from "next/navigation";
// import {
//   LanguageLevel,
//   ExperienceType,
//   JobType,
//   Department,
//   skills,
// } from "@/components/common/Utility/JobsData";
// import { getAllAreas } from "@/services/slices/locationSlice";
// import Autocomplete from "@mui/joy/Autocomplete";
// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import Typography from "@mui/joy/Typography";
// import FormControl from "@mui/joy/FormControl";
// import Select from "@mui/joy/Select";
// import Option from "@mui/joy/Option";
// import { Chip, ChipDelete, Grid } from "@mui/joy";
// import { getDepartments } from "@/services/slices/jobDepartmentSlice";
// // import { postJob, getDepartments } from "@/services/slices/jobSlice";
// import { AppDispatch, RootState } from "@/store";
// import { useDispatch, useSelector } from "react-redux";
// import withAuth from "@/components/withAuth";
// import { log } from "console";


// const ReactQuill = dynamic(() => import("react-quill"), {
//   ssr: false,
//   loading: () => <div>Loading ...</div>
// });
// interface Props {
//   jobTitle: any;
//   setJobTitle: any;
//   jobDescription: any;
//   setJobDescription: any;
//   jobType: any;
//   setJobType: any;
//   department: string | null;
//   setDepartment: any;
//   numberOfOpening: number;
//   setNumberOfOpening: any;
//   language: any;
//   handleChangeLanguage: any;
//   experiences: any;
//   handleChangeExprience: any;
//   minSalary: number;
//   setMinSalary: any;
//   maxSalary: number;
//   setMaxSalary: any;
//   allAreasContent: any[];
//   setSearchTerm: any;
//   setLocations: any;
//   loading: boolean;
//   selectedSkills: any[];
//   handleSkillChange: any;
//   handleDeleteSkill: any;
//   departments: any[];
//   selectedJob: any;
//   organisationAllAdress: any[];
// }

// const EditJobJobForm: React.FC<Props> = ({
//   jobTitle,
//   setJobTitle,
//   jobDescription,
//   setJobDescription,
//   jobType,
//   setJobType,
//   department,
//   setDepartment,
//   numberOfOpening,
//   setNumberOfOpening,
//   language,
//   handleChangeLanguage,
//   experiences,
//   handleChangeExprience,
//   minSalary,
//   setMinSalary,
//   maxSalary,
//   setMaxSalary,
//   allAreasContent,
//   setSearchTerm,
//   setLocations,
//   loading,
//   selectedSkills,
//   handleSkillChange,
//   handleDeleteSkill,
//   departments,
//   selectedJob,
//   organisationAllAdress,
// }) => {
// alert("Department");
// console.log(Department);

// console.log(organisationAllAdress,"====>Edit Job organisationAllAdress page 2")
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <form
//         style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//       >
//         <FormControl>
//           <div className="text-sm text-gray-600 mb-2">
//             Job Title<sup className="text-red-500">*</sup>
//           </div>
//           <Input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             fullWidth
//             placeholder="Enter job title"
//             required
//           />
//         </FormControl>

//         <Grid xs={12} sm={12} md={12} sx={{ marginBottom: 7 }}>
//           <FormControl>
//             <div className="text-sm text-gray-600 mb-2">
//               Job Description
//             </div>
//             <ReactQuill
//               theme="snow"
//               value={jobDescription}
//               onChange={setJobDescription}
//               style={{ height: "200px", backgroundColor: "white" }}
//             />
//           </FormControl>
//         </Grid>

//         <Grid container spacing={2} sx={{ flexGrow: 1 }}>
//           <Grid xs={6} sm={6} md={6}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">
//                 Job Type<sup className="text-red-500">*</sup>
//               </div>
//               <Autocomplete
//                 options={JobType || []}
//                 freeSolo
//                 value={
                  
//                   JobType?.find((data: any) => data?.id === jobType) || null
//                 }
//                 getOptionLabel={(option) =>
//                   typeof option === "string" ? option : option?.name
//                 }
//                 onInputChange={(event, newInputValue) => {
//                   if (typeof newInputValue === "string") {
//                     console.log(newInputValue,"===>newInputValue")
//                     setDepartment(null); // Clear department if user types
//                   }
//                 }}
//                 onChange={(event, newValue) => {
//                   if (newValue && typeof newValue !== "string") {
//                     setJobType(newValue?.id);
//                   }
//                 }}
//               />
//             </FormControl>
//           </Grid>
//           <Grid xs={6} sm={6} md={6}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">
//                 Department<sup className="text-red-500">*</sup>
//               </div>
//               <Autocomplete
//                 value={
//                   Department?.find((data: any) => data?.id === selectedJob?.department?.id) || null
//                 }
//                 options={Department} // Make sure departments is an array of Department objects
//                 freeSolo
//                 getOptionLabel={(option) =>
//                   typeof option === "string" ? option : option?.name
//                 }
//                 onInputChange={(event, newInputValue) => {
//                   if (typeof newInputValue === "string") {
//                     const departmentId = parseInt(newInputValue, 10);
//                     const department = Department?.find(department => department.id === departmentId);

//                     if(department){
//                       setDepartment(department);
//                     }else {
//                       setDepartment(null);  
//                     }
//                     // setDepartment(null); // Clear department if user types
//                   }
//                 }}
//                 onChange={(event, newValue) => {
//                   if (newValue && typeof newValue !== "string") {
//                     setDepartment(newValue);
//                   }
//                 }}
//               />
//             </FormControl>
//           </Grid>
//           <Grid xs={6} sm={6} md={6}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">
//                 Number of Openings<sup className="text-red-500">*</sup>
//               </div>
//               <Input
//                 type="number"
//                 value={numberOfOpening}
//                 onChange={(e) =>
//                   setNumberOfOpening(parseInt(e.target.value))
//                 }
//                 fullWidth
//                 required
//               />
//             </FormControl>
//           </Grid>
//           <Grid xs={6} sm={6} md={6}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">Language</div>
//               <Select value={language} onChange={handleChangeLanguage}>
//                 <Option value="">Choose Language</Option>
//                 {LanguageLevel && LanguageLevel?.map((data: any) => (
//                   <Option key={data?.id} value={data?.value}>
//                     {data?.name}
//                   </Option>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid xs={6} sm={6} md={6}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">
//                 Experience<sup className="text-red-500">*</sup>
//               </div>
//               <Select value={experiences} onChange={handleChangeExprience}>
//                 {ExperienceType && ExperienceType.map((data: any) => (
//                   <Option key={data?.id} value={data?.value}>
//                     {data?.name}
//                   </Option>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid xs={6} sm={6} md={6}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">
//                 Min Salary<sup className="text-red-500">*</sup>
//               </div>
//               <Input
//                 type="number"
//                 value={minSalary}
//                 onChange={(e) => setMinSalary(parseInt(e.target.value))}
//                 fullWidth
//                 required
//               // InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
//               />
//             </FormControl>
//           </Grid>
//           <Grid xs={6} sm={6} md={6}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">
//                 Max Salary<sup className="text-red-500">*</sup>
//               </div>
//               <Input
//                 type="number"
//                 value={maxSalary}
//                 onChange={(e) => setMaxSalary(parseInt(e.target.value))}
//                 fullWidth
//                 required
//               // InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
//               // inputProps={{ min: 0 }}
//               />
//             </FormControl>
//           </Grid>
//           <Grid xs={6} sm={6} md={6}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">
//                 Locations<sup className="text-red-500">*</sup>
//               </div>
//               <Autocomplete
//                 options={organisationAllAdress || []}
//                 getOptionLabel={(option) =>
//                   ${option?.street}
//                 }
//                 onInputChange={(event, value) => {
//                   setSearchTerm(value);
//                 }}
//                 onChange={(event, newValue) => {

//                   if (newValue && typeof newValue !== "string") {
//                     setLocations(newValue?.id);
//                   }
//                 }}
//                 loading={loading}
//               // renderInput={(params) => (
//               //   <TextField {...params} label="Search Location" />
//               // )}
//               />
//             </FormControl>
//           </Grid>
//           <Grid xs={12} sm={12} md={12}>
//             <FormControl>
//               <div className="text-sm text-gray-600 mb-2">
//                 Skills Sets<sup className="text-red-500">*</sup>
//               </div>
//               <Autocomplete
//                 multiple
//                 id="skill-autocomplete"
//                 placeholder="Select skills"
//                 options={skills}
//                 getOptionLabel={(option) => option?.name}
//                 value={selectedSkills}
//                 onChange={handleSkillChange}
//                 // renderOption={(props, option) => (
//                 //   <li {...props} key={option?.id}>
//                 //     {option?.name}
//                 //   </li>
//                 // )}
//                 isOptionEqualToValue={(option, value) =>
//                   option?.id === value?.id
//                 }
//               />
//               <Box
//                 sx={{
//                   mb: 2,
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: 1,
//                   mt: 2,
//                 }}
//               >
//                 {selectedSkills && selectedSkills?.map((skill) => (
//                   <Chip
//                     key={skill?.id}
//                     color="primary"
//                     endDecorator={
//                       <ChipDelete
//                         onDelete={() => handleDeleteSkill(skill)}
//                       />
//                     }
//                     variant="solid"
//                   >
//                     {skill?.name}
//                   </Chip>
//                 ))}
//               </Box>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default withAuth(EditJobJobForm, 'RECRUITER');