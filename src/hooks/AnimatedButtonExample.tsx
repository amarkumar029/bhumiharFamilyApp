import { TouchableOpacity, Text, View } from "react-native";
import { useAnimatedButtonState } from "../useAnimatedButtonState";

export default function AnimatedButtonExample() {
  const { status, handleClick } = useAnimatedButtonState(false, () => {
    console.log("Animation complete!");
  });

  return (
    <TouchableOpacity
      onPress={handleClick}
      disabled={status !== "idle"}
      style={{
        padding: 16,
        backgroundColor: status === "idle" ? "blue" : status === "loading" ? "orange" : "green",
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>
        {status === "idle" ? "Submit" : status === "loading" ? "Loading..." : "Success"}
      </Text>
    </TouchableOpacity>
  );
}