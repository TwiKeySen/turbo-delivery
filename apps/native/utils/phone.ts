import { Linking, Platform } from "react-native";

export const makePhoneCall = async (phoneNumber: string) => {
  const url =
    Platform.OS === "ios" ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Phone call not supported");
    }
  } catch (error) {
    console.error("Error making phone call:", error);
  }
};

export const openWebsite = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Cannot open URL");
    }
  } catch (error) {
    console.error("Error opening website:", error);
  }
};
