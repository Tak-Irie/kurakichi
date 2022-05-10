// import { createMockValidUser, MockUserRepo } from "../../testHelper";
// import { RegisterUserUsecase } from "./RegisterUserUseCase";

// describe("ユーザー登録テスト", () => {
//   const repo = new MockUserRepo();
//   const registerUserUsecase = new RegisterUserUsecase(repo);
//   test("登録成功", async () => {
//     const validUser = await createMockValidUser();
//     const result = await registerUserUsecase.execute({
//       email: validUser.getEmail(),
//       password: validUser.getPassword(),
//     });

//     expect(result.isRight()).toBeTruthy();
//   });
//   test("短すぎる名前により登録失敗", async () => {
//     const invalidNameMock = {
//       userName: "f",
//       email: "valid@test.com",
//       password: "validPassword",
//     };
//     const result = await registerUserUsecase.execute(invalidNameMock);

//     expect(result.isLeft()).toBeTruthy();
//     expect(result.value.getErrorValue()).toBe("ユーザー名は最小2文字です");
//   });
//   test("長過ぎる名前により登録失敗", async () => {
//     const invalidNameMock = {
//       userName: "YourNameIsSoLongPleaseChangeThis",
//       email: "valid@test.com",
//       password: "validPassword",
//     };
//     const result = await registerUserUsecase.execute(invalidNameMock);

//     expect(result.isLeft()).toBeTruthy();
//     expect(result.value.getErrorValue()).toBe("ユーザー名は最大20文字です");
//   });
//   test("不正なメールアドレスにより登録失敗", async () => {
//     const invalidNameMock = {
//       userName: "validName",
//       email: "invalid",
//       password: "validPassword",
//     };
//     const result = await registerUserUsecase.execute(invalidNameMock);

//     expect(result.isLeft()).toBeTruthy();
//     expect(result.value.getErrorValue()).toBe(
//       "メールアドレスに使用できない文字が含まれています"
//     );
//   });
//   test("不正なパスワードにより登録失敗", async () => {
//     const invalidNameMock = {
//       userName: "validName",
//       email: "valid@test.com",
//       password: "invalid",
//     };
//     const result = await registerUserUsecase.execute(invalidNameMock);

//     expect(result.isLeft()).toBeTruthy();
//     expect(result.value.getErrorValue()).toBe(
//       "パスワードは8文字以上に設定してください"
//     );
//   });
//   test("メールアドレスの重複により登録失敗", async () => {
//     const invalidEmailMock = {
//       userName: "validName",
//       email: "dupulicate@example.com",
//       password: "validPassword",
//     };
//     const result = await registerUserUsecase.execute(invalidEmailMock);

//     console.log(":", result.isLeft());
//     expect(result.isLeft()).toBeTruthy();
//     expect(result.value.getErrorValue()).toBe(
//       'こちらのEmail"dupulicate@example.com"は既に登録されています'
//     );
//   });
// });
