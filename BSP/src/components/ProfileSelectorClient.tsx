// app/components/ProfileSelectorClient.tsx

"use client";

import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/actions/appSettings.action";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { ProfileType } from "@/lib/interfaces/IAppSettings";

interface ProfileSelectorClientProps {
  initialProfile: ProfileType;
  profiles: ProfileType[];
}

export default function ProfileSelectorClient({ initialProfile, profiles }: ProfileSelectorClientProps) {
  const { toast } = useToast();
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>(initialProfile);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleProfileSelect = (profile: ProfileType): void => {
    if (profile !== initialProfile) {
      setSelectedProfile(profile);
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  };

  const handleSaveProfile = async (): Promise<void> => {
    startTransition(async () => {
      try {
        const url = process.env.NEXT_PUBLIC_METAFLOW_URL || "http://localhost:5000";
        const response = await fetch(`${url}/api/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profile: selectedProfile }),
        });
        
        if (response.ok) {
          setShowSaveButton(false);
          await updateProfile(selectedProfile);
          toast({
            description: `Profile ${selectedProfile} processed successfully`
          });
        } else {
          throw new Error('Failed to save profile');
        }
      } catch (error) {
        console.error("Error saving profile:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white text-dc3 font-bold">
            {selectedProfile}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {profiles.map((profile) => (
            <DropdownMenuItem key={profile} onSelect={() => handleProfileSelect(profile)}>
              {profile}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {showSaveButton && (
        <Button 
          onClick={handleSaveProfile}
          className="bg-green-500 text-white"
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save Profile'}
        </Button>
      )}
    </div>
  );
}