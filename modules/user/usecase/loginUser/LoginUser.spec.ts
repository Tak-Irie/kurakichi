// import { MockUserRepository, invalidEmail, validPassword } from '../../../test/helper/userHelper';
// import { LoginUserUseCase } from './LoginUserUseCase';

// const repo = new MockUserRepository();

// describe('ユーザーログインテスト', () => {
//   const useLoginUserUseCase = new LoginUserUseCase(repo);

//   //TODO: Jestがargon2を読み込まない。ApolloMockテストのときまた考える
//   // test('ログイン成功', async (done) => {
//   //   const result = await useLoginUserUseCase.execute({
//   //     email: validEmail,
//   //     password: validPassword,
//   //   });

//   //   expect(result.isRight()).toBeTruthy();
//   //   done();
//   // });
//   test('存在しないEmailアドレスにより失敗', async (done) => {
//     const result = await useLoginUserUseCase.execute({
//       email: invalidEmail,
//       password: validPassword,
//     });

//     expect(result.isLeft()).toBeTruthy();
//     expect(result.value.getErrorValue()).toBe(
//       'アカウントが存在しないか、パスワードが正しくありません',
//     );
//     done();
//   });
//   // 同上
//   // test('誤ったパスワードにより失敗', async (done) => {
//   //   const result = await useLoginUserUseCase.execute({
//   //     email: validEmail,
//   //     password: invalidPassword,
//   //   });

//   //   expect(result.isLeft()).toBeTruthy();
//   //   expect(result.value.getErrorValue()).toBe(
//   //     'アカウントが存在しないか、パスワードが正しくありません',
//   //   );
//   //   done();
//   // });
// });
