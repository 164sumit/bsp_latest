// app/components/ProfileSelector.tsx

import { Suspense } from 'react';
import { getCurrentProfile } from "@/actions/appSettings.action";
// import { ProfileType } from "@/lib/interfaces/IAppSettings";
type ProfileType = '10mm' | '12mm' | '16mm' | '20mm' | '40mm';
import ProfileSelectorClient from './ProfileSelectorClient';

const profiles: ProfileType[] = ['10mm', '12mm', '16mm', '20mm', '40mm'];

async function getProfile(): Promise<ProfileType> {
  return await getCurrentProfile();
}

// Server Component
async function ProfileFetcher() {
  const profile = await getProfile();
  
  return <ProfileSelectorClient initialProfile={profile} profiles={profiles} />;
}

// Main component export
export default function ProfileSelector() {
  return (
    <Suspense fallback={<button className=' text-white'>Loading profile...</button>}>
      <ProfileFetcher />
    </Suspense>
  );
}