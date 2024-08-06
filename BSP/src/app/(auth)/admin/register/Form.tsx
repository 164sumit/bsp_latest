"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/actions/user.actions";

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(30, { message: "Name can't be longer than 30 characters." }),
    email: z
      .string()
      .email("This is not a valid email")
      .max(300, { message: "Email can't be longer than 300 characters." }),
    password: z
      .string()
      .min(6, { message: "Password has to be at least 6 characters long." }),
    userType: z.string(),
  });

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: "normal", // Set default user type to "normal"
    },
  });
  const { toast } = useToast();
  const [practices, setPractices] = useState("normal");

  const handleRegister = async (values: z.infer<typeof formSchema>) => {
    const userdata={ ...values, userType: practices }
    console.log(userdata);
    await registerUser(userdata).then((data)=>{
      toast({
        description: String(data.message),
        
      });
      
    }).catch((error)=>{
      toast({
        description: String(error.message),
        
      });
      console.log(error);
      
    })
    // const response = await fetch("/api/auth/register", {
    //   method: "POST",
    //   body: JSON.stringify({ ...values, userType: practices }),
    // });

    // const data = await response.json();
    // console.log(data);

    // if (data.success) {
    //   toast({
    //     description: "Account Created Successfully",
    //     // position: "bottom-right",
    //   });
    // }

    // if (data.error) {
    //   // Handle error
    //   toast({
    //     description: data.error,
    //     // position: "bottom-right",
    //   });
    //   return;
    // }

    // Handle successful registration
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create an account to start using our platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Name"
                  {...form.register("name")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter Your Email"
                  {...form.register("email")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter the Password"
                  type="password"
                  {...form.register("password")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={practices}
                  onValueChange={(value) => {
                    setPractices(value);
                  }}
                >
                  <SelectTrigger id="userType">
                    <SelectValue placeholder="Select userType" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="poweruser">Poweruser</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button type="submit">Register</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
