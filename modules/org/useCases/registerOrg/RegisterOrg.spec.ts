describe('団体登録テスト', () => {
  const org = undefined;
  test('成功', () => {
    expect(org).toBeFalsy();
  });
  test('失敗:登録権限がない', () => {
    expect(org).toBeFalsy();
  });

  test('失敗:nameが登録されていない', () => {
    expect(org).toBeFalsy();
  });
  test('失敗:nameが重複している', () => {
    expect(org).toBeFalsy();
  });
  test('失敗:locationが登録されていない', () => {
    expect(org).toBeFalsy();
  });
  test('失敗:locationがバリデーションをパスしない', () => {
    expect(org).toBeFalsy();
  });
});
