export const publicRoutes = [
    "/login",
    "/signup"
    // Add other public routes here
  ];
  
  export const adminOnlyRoutes = [
    "/admin/register",
    "/logs"
  ];
  
  export const normalUserRoutes = [
    "/dashboard",
  ];
  
  export const powerUserRestrictedRoutes = [
    /^\/admin\/?.*/, // Regex to match /admin and any sub-routes
    "/logs"
  ];