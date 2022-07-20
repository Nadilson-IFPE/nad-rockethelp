import NavigationContainer from "./../../node_modules/@react-navigation/native/lib/module/NavigationContainer";
import { AppRoutes } from "./app.routes";
import { SignIn } from "./src/screens/Signin";

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
