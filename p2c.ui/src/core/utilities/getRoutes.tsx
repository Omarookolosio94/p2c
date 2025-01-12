import { Route } from "react-router-dom";

export const getRoutes = (routes: RoutesType[]): React.ReactElement[] => {
  return routes.map((prop, key) => {
    return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
  });
};
