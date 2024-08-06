"use server";

import { auth } from "@/auth";
// import { ProfileType } from "@/lib/interfaces/IAppSettings";
import { logger } from "@/lib/logger";
// import { ProfileType } from "@/lib/interfaces/IAppSettings";
import AppSettings from "@/lib/models/AppSettings.model";
import connectToDB from "@/lib/mongoose";
type ProfileType = '10mm' | '12mm' | '16mm' | '20mm' | '40mm';

export async function updateProfile(profile: ProfileType) {
  const session = await auth();
  if(!session){
    throw new Error("Unauthorized");
  }
  const user = session?.user;
  await connectToDB();

  try {
    let settings = await AppSettings.findOne();
    if (!settings) {
      settings = new AppSettings();
    }
    settings.currentProfile = profile;
    await settings.save();
    logger.info(
      `Profile ${profile} processed successfully`,
      { metadata: { owner: user?.email } }
    );

    return settings.currentProfile;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
}

export async function getCurrentProfile(): Promise<ProfileType> {
  await connectToDB();

  try {
    const settings = await AppSettings.findOne();
    return settings ? settings.currentProfile : "10mm";
  } catch (error) {
    console.error("Failed to get current profile:", error);
    throw error;
  }
}
