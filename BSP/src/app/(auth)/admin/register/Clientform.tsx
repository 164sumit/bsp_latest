"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { z } from 'zod';

const Clientform = () => {
  const formSchema = z.object({
    name: z.string().min(1, { message: "This field has to be filled." }).max(30, { message: "Name can't be longer than 30 characters." }),
    email: z.string().email("This is not a valid email").max(300, { message: "Email can't be longer than 300 characters." }),
    password: z.string().min(6, { message: "Password has to be at least 6 characters long." }),
    userType: z.string(),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const parsedData = await formSchema.parse(formData);
      console.log(parsedData);
      // Submit the parsed data to the server
    } catch (error) {
      console.error(error);
      // Handle the validation error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input name="name" placeholder="Enter Your Name" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="Enter Your Email" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input name="password" placeholder="Enter the Password" type="password" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="userType">User Type</Label>
          <Select name="userType">
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
  );
};

export default Clientform;