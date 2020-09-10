// import React, { FC } from "react";

// interface Props {
//   path: string | string[];
//   component: FC;
//   fallback: FC;
//   exact?: boolean;
//   isAllow: (user) => boolean;
// }
// const useUser = ()=>{
//   if(window.sessionStorage.id)
//   {
//     return true;
//   }
//   else{
//     return false;
//   }
// }
// export const RestrictRoute = (
//   component: Component,
//   fallback: Fallback,
//   isAllow: () => {
//   const user = useUser();
//   }
//   return isAllow(user) ? <Component /> : <Fallback />;
// };