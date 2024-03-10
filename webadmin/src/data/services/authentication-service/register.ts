// export const registerAccount = async (request: FormRegister) => {
//   try {
//     const response = await axios.post<LoginResponse>(`${url}/authentication/register`, {
//       name: request.name,
//       email: request.email,
//       phoneNumber: request.phoneNumber,
//       password: request.password,
//       confirmPassword: request.confirmPassword,
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw error.response?.data;
//     } else {
//       throw error;
//     }
//   }
// };
