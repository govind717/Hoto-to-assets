import AuthenticateAndRolesMiddleware from "../Middleware";


const routesName = "/dashboards/myStore";

export const storeRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/",
      },
    ],
    routes: [
      {
        path: `${routesName}`,
        // element: <Page component={Home} />
      },
      {
        path: `${routesName}/add`,
        // element: <Page component={AdminCustomers} />,
      },
      {
        path: `${routesName}/edit`,
        // element: <Page component={EditCloudstratClient} />,
      },
    ],
  },]
