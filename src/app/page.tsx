import LandingPage from "./../components/LandingPage";
import { cookies } from 'next/headers'

export default async  function Home() {
  const token=(await cookies()).get('auth-token')||null;
 
   // Get token value or empty string

  console.log("Token:", token); // Debugging

  return <LandingPage token={token} />
  



};
