import AuthenticateAndRolesMiddleware from "../Middleware";


const routesName = "/dashboards/transactionHistory";

export const historyRoute = [
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
