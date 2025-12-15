import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import LeftSideBar from "../../components/global/LeftSideBar";
import ToolTipButtons from "../../components/global/ToolTipButtons";
import Topbar from "../../components/global/TopBar";
import UserSearchDialog from "../../components/global/UserSearchDailog";
import { useGetUsersCount } from "../../lib/react-query/queries";
import Dashboard from "../dashboard";

// type Props = {
//   children?: React.ReactNode; // replaces <Outlet />
// };

export default function Home() {
// export default function Home({ children }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const { data: count, isFetching: isGettingCounts } =
    useGetUsersCount();

  return (
    <View style={styles.container}>      
      {/* LEFT SIDEBAR – Tablet only */}
      {isTablet && (
        <View style={styles.sidebar}>
          <LeftSideBar />
        </View>
      )}

      {/* MAIN CONTENT */}
      <View style={styles.mainContent}>        
        {/* TOP BAR – Desktop */}
        {isTablet && (
          <View style={styles.topBar}>
            <UserSearchDialog />
            {!isGettingCounts && (
              <ToolTipButtons count={count ?? 0} />
            )}
          </View>
        )}

        {/* TOP BAR – Mobile */}
        {!isTablet && (
          <View style={styles.mobileTopBar}>
            <Topbar />
          </View>
        )}

        {/* SCREEN CONTENT */}
        <View style={styles.content}>
          {/* {children} */}
          <Dashboard />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f2f4f7",
  },
  sidebar: {
    width: 260,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mobileTopBar: {
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  content: {
    flex: 1,
  },
});
