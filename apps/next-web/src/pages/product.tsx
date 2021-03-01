import { NextPage } from 'next';
import { FC } from 'react';
import { useTestsGetQuery } from '../generated/graphql';

const Product: NextPage = () => {
  const { data, loading, error, refetch } = useTestsGetQuery();

  if (loading) return <p>loading</p>;
  if (!data && !loading) return <p>{error.message}</p>;

  return (
    <>
      {data.getTests.tests.map((t) =>
        !t ? (
          <p>do not</p>
        ) : (
          <ol>
            <li key={t.id}>{t.name}</li>
          </ol>
        ),
      )}
      <div>
        <button onClick={() => refetch()}> refetch </button>
      </div>
    </>
  );
};

export default Product;
