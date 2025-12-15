import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { MatrimonialInterestCard } from "../../../components/global/InterestCard";
import { useRespondToInterest } from "../../../lib/react-query/mutation";
import { useReceivedInterests } from "../../../lib/react-query/queries";

type Props = {};

const ReceivedInterest = ({}: Props) => {
  const { data, isLoading, error } = useReceivedInterests();
  const { mutate, isPending } = useRespondToInterest();

  const interests =
    data?.pages?.flatMap((page: any) => page.interests) || [];

  const acceptMatch = useCallback(
    (interestId: string, status = "ACCEPTED") => {
      mutate({ interestId, status });
    },
    [mutate]
  );

  const declineMatch = useCallback(
    (interestId: string, status = "DECLINED") => {
      mutate({ interestId, status });
    },
    [mutate]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoading && error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Something went wrong while fetching Data!
        </Text>
      </View>
    );
  }

  if (interests.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>
          You didn't get any interest yet! Try connecting with users!!!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={interests}
      keyExtractor={(item) => item.id}
      numColumns={2} // change to 1 for small screens
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <MatrimonialInterestCard
          {...item}
          onAccept={acceptMatch}
          onReject={declineMatch}
          isPending={isPending}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  list: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    color: "rgba(0,0,0,0.6)",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default ReceivedInterest;