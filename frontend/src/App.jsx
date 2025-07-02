import { UserProvider } from "./contexts/userContext";
import { TabProvider } from "./contexts/tabContext";

import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <UserProvider>
      <TabProvider>
        <AppRoutes />
      </TabProvider>
    </UserProvider>
  );
};

export default App;
