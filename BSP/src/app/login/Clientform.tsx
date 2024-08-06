"use client";
import { signInWithCreds } from "@/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import React from "react";

const Clientform = () => {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <div className="w-full h-lvh flex flex-row items-center justify-center">
      <div
        className="w-1/3 py-7 px-4 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col 
  items-center justify-center gap-6 bg-white rounded-3xl"
      >
        <p className="text-bold">BHILAI STEEL PLANT</p>
        <div className="flex flex-row justify-center items-center w-full">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Steel_Authority_of_India_logo.svg/220px-Steel_Authority_of_India_logo.svg.png"
            alt="logo"
            style={{ width: "35%", marginRight: "5%" }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/6/61/IIT_Bhilai_logo.png"
            alt="iit bhilai logo"
            style={{ width: "30%" }}
          />
        </div>

        {/* <p className="text-bold">BHILAI STEEL PLANT</p> */}
        <form
          className="flex flex-col items-center gap-5"
          action={async (formdata) => {
            const email = formdata.get("email") as string;
            const password = formdata.get("password") as string;
            console.log(email);
            if (!email || !password) {
              toast({
                description: "please provide all fields",
              });
              return;
            }
            await signInWithCreds(email, password).then((data) => {
              if (data?.error) {
                toast({
                  description: String(data.error),
                });
              } else {
                toast({
                  description: "Login Successfully",
                });
                router.refresh();
                router.push("/");
              }
            });
          }}
        >
          <div>
            <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
              <input
                name="email"
                placeholder="Enter Your Email"
                className="w-[300px] max-sm:w-full bg-transparent outline-none"
              />
              <EmailOutlined sx={{ color: "#737373" }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
              <input
                name="password"
                placeholder=" Password"
                type="password"
                className="w-[300px] max-sm:w-full bg-transparent outline-none"
              />
              <LockOutlined sx={{ color: "#737373" }} />
            </div>
          </div>

          <button
            className=" w-full px-5 py-3 mt-5 mb-7 rounded-xl cursor-pointer bg-blue-1 hover:bg-red-1 text-white text-body-bold text-bold "
            type="submit"
          >
            Login
          </button>
        </form>

        {/* <h2 className="text-center">BSP</h2> */}
      {/* <p className="text-bold">BHILAI STEEL PLANT</p> */}
      </div>
    </div>
  );
};

export default Clientform;
