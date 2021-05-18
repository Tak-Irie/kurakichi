import { useRouter } from 'next/router';
import { isServer } from './isServer';

type QueryId = {
  id?: string;
  inqid?: string;
  messid?: string;
};

export const useGetIdFromUrl = (): QueryId => {
  const router = useRouter();
  let ids: QueryId;
  if (isServer()) return ids;
  // const idReg = /\[([a-z]+id)\]/;
  // console.log('router:', router);
  // // console.log('routerQuery:', router.query);
  // // console.log('typeof oid:', typeof router.query.oid);
  // // console.log('asPath:', router.asPath);
  // // console.log('pathname:', router.pathname);
  // const pathArr = router.asPath.split('/');
  // console.log('pathArr:', pathArr);
  // const pathNameArr = router.pathname.split('/');
  // console.log('pathNameArr:', pathNameArr);

  // const match = pathNameArr.map((path) => {
  //   if (path.match(idReg)) {
  //     return path.replace(idReg, '$1');
  //   }
  //   return undefined;
  // });

  // console.log('match:', match);
  // match.forEach((value, index) => {
  //   console.log('value:', value);
  //   if (value) {
  //     ids[value] = pathArr[index];
  //   }
  // });

  // console.log('generatedIds:', ids);

  if (typeof router.query.id === 'string') ids.id = router.query.id;
  if (typeof router.query.inqid === 'string') ids.inqid = router.query.inqid;
  if (typeof router.query.messid === 'string') ids.messid = router.query.messid;
  // if (typeof router.query.oid === 'string') ids.oid = router.query.oid;
  // if (typeof router.query.iid === 'string') ids.iid = router.query.iid;
  // if (typeof router.query.inqtid === 'string') ids.inqtid = router.query.inqtid;

  return ids;
};

// import React from 'react';
// import { withRouter } from 'next/router';
// import queryString from 'query-string';

// export interface NextPageWithRouterProps {
//   router: NextRouter;
// }

// export type NextPageWithRouter = React.FunctionComponent<NextPageWithRouterProps>;

// export const withPageRouter = (Component: NextPageWithRouter) => {
//   return withRouter(({ router, ...props }) => {
//     router.query = queryString.parse(router.asPath.split(/\?/)[1]) as { [key: string]: string };
//     return <Component {...props} router={router} />;
//   });
// };
