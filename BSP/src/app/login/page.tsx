// import React from "react";
// import { auth } from "../../auth";

// import Clientform from "./Clientform";

// const Page = async () => {
//   const session = await auth();
//   return (
//     <section style={{ background: "rgb(89, 110, 145)" }}>
//       <Clientform />
//     </section>
//   );
// };

// export default Page;


import React from "react";
import { auth } from "../../auth";

import Clientform from "./Clientform";

const Page = async () => {
  const session = await auth();
  return (
    <section style={{
      backgroundImage: "url('https://etimg.etb2bimg.com/photo/66150934.cms')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Clientform />
    </section>
  );
};

export default Page;

