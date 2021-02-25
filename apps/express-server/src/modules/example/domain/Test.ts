interface TestProps {
  id: string;
  name: string;
}

export class Test {
  constructor(readonly props: TestProps) {}

  public static create(props: TestProps): Test {
    const test = new Test({ ...props });
    return test;
  }
}
