import { RegisterUserUseCase } from './RegisterUserUseCase';
import { createMockValidUser, MockUserRepo } from '../../testHelper';

describe('ユーザー登録テスト', () => {
  const repo = new MockUserRepo();
  const registerUserUseCase = new RegisterUserUseCase(repo);
  test('登録成功', async (done) => {
    const validUser = await createMockValidUser();
    const result = await registerUserUseCase.execute({
      email: validUser.getEmail(),
      password: validUser.getPassword(),
      userName: validUser.getUsername(),
    });

    expect(result.isRight()).toBeTruthy();
    done();
  });
  test('短すぎる名前により登録失敗', async (done) => {
    const invalidNameMock = { userName: 'f', email: 'valid@test.com', password: 'validPassword' };
    const result = await registerUserUseCase.execute(invalidNameMock);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value.getErrorValue()).toBe('ユーザー名は最小2文字です');
    done();
  });
  test('長過ぎる名前により登録失敗', async (done) => {
    const invalidNameMock = {
      userName: 'YourNameIsSoLongPleaseChangeThis',
      email: 'valid@test.com',
      password: 'validPassword',
    };
    const result = await registerUserUseCase.execute(invalidNameMock);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value.getErrorValue()).toBe('ユーザー名は最大20文字です');
    done();
  });
  test('不正なメールアドレスにより登録失敗', async (done) => {
    const invalidNameMock = { userName: 'validName', email: 'invalid', password: 'validPassword' };
    const result = await registerUserUseCase.execute(invalidNameMock);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value.getErrorValue()).toBe('メールアドレスに使用できない文字が含まれています');
    done();
  });
  test('不正なパスワードにより登録失敗', async (done) => {
    const invalidNameMock = { userName: 'validName', email: 'valid@test.com', password: 'invalid' };
    const result = await registerUserUseCase.execute(invalidNameMock);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value.getErrorValue()).toBe('パスワードは8文字以上に設定してください');
    done();
  });
  test('メールアドレスの重複により登録失敗', async (done) => {
    const invalidNameMock = {
      userName: 'validName',
      email: 'dupulicate@test.com',
      password: 'validPassword',
    };
    const result = await registerUserUseCase.execute(invalidNameMock);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value.getErrorValue()).toBe(
      'こちらのEmail"dupulicate@test.com"は既に登録されています',
    );
    done();
  });
});

// describe('ユーザー検索テスト', () => {
//   test('検索成功', async (done) => {
//     const getUserByIdUseCase = new GetUserByIdUseCase(repo);
//     const result = await getUserByIdUseCase.execute('1');

//     expect(result.isRight()).toBeTruthy();
//     expect(result.value.getValue()).toBe(dummyValidUser);
//     done();
//   });

//   test('検索失敗', async (done) => {
//     const getUserByIdUseCase = new GetUserByIdUseCase(repo);
//     const result = await getUserByIdUseCase.execute('999');

//     expect(result.isLeft()).toBeTruthy();
//     expect(result.value.getErrorValue()).toBe(
//       'こちらのユーザーID"999"を持つユーザーは見つかりませんでした',
//     );
//     done();
//   });
// });

// describe('ユーザーズ取得テスト', () => {
//   test('検索成功', async (done) => {
//     const getUsersUseCase = new GetUsersUseCase(repo);
//     const result = await getUsersUseCase.execute();

//     expect(result.isRight()).toBeTruthy();
//     expect(result.value.getValue()).toStrictEqual({ users: [dummyValidUser, dummyValidUser] });
//     done();
//   });
// });

// describe('ダミー', () => {
//   test('ダミー', (done) => {
//     const one = 1;

//     expect(one).toBeTruthy();
//     done();
//   });
// });
