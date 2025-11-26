import { Option } from "../components/global/SelectComponent";

export const ZODIAC_SIGNS = [
  "Aries - मेष - March 21 - April 19",
  "Taurus - वृषभ - April 20 - May 20",
  "Gemini - मिथुन - May 21 - June 20",
  "Cancer - कर्क - June 21 - July 22",
  "Leo - सिंह - July 23 - August 22",
  "Virgo - कन्या - August 23 - September 22",
  "Libra - तुला - September 23 - October 22",
  "Scorpio - वृश्चिक - October 23 - November 21",
  "Sagittarius - धनु - November 22 - December 21",
  "Capricorn - मकर - December 22 - January 19",
  "Aquarius - कुंभ - January 20 - February 18",
  "Pisces - मीन - February 19 - March 20",
];

export const MARITAL_STATUS_OPTIONS = [
  { value: "SINGLE", label: "Single" },
  { value: "MARRIED", label: "Married" },
  { value: "DIVORCED", label: "Divorced" },
  { value: "WIDOWED", label: "Widowed" },
];

export const SMOKING_HABITS_OPTIONS = [
  { value: "NEVER", label: "Never" },
  { value: "OCCASIONALLY", label: "Occasionally" },
  { value: "REGULARLY", label: "Regularly" },
];

export const DIET_OPTIONS = [
  { value: "VEGAN", label: "Vegan" },
  { value: "NON_VEGAN", label: "Non-Vegan" },
  { value: "VEGETARIAN", label: "Vegetarian" },
];

export const BODY_TYPE_OPTIONS = [
  { value: "SLIM", label: "Slim" },
  { value: "AVERAGE", label: "Average" },
  { value: "ATHLETIC", label: "Athletic" },
  { value: "PLUS_SIZE", label: "Plus Size" },
];

export const FAMILY_TYPE_OPTIONS = [
  { value: "NUCLEAR", label: "Nuclear" },
  { value: "JOINT", label: "Joint" },
];

export const PARTNER_MARITAL_STATUS_OPTIONS = [
  { value: "SINGLE", label: "Single" },
  { value: "WIDOWED", label: "Widowed" },
  { value: "DIVORCED", label: "Divorced" },
  { value: "ANY", label: "Any" },
];

export const SIBLING_GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const PARTNER_OCCUPATION_OPTIONS = [
  "Any",
  "Business",
  "Government",
  "Private Sector",
  "Self Employed",
  "Not Working",
];

export const heightToString = (heightInCm: number): string => {
  const feet = Math.floor(heightInCm / 30.48);
  const inches = Math.round((heightInCm - feet * 30.48) / 2.54);
  return `${feet}'${inches}"`;
};

export const stringToHeight = (heightStr: string): number => {
  const [feet, inches] = heightStr
    .split("'")
    .map((part) => parseInt(part.replace('"', "")));
  return Math.round(feet * 30.48 + inches * 2.54);
};

export const HEIGHT_OPTIONS: Option[] = Array.from({ length: 49 }, (_, i) => {
  const heightInCm = 122 + i * 2.54; // Starting from 4'0" (122cm) to 8'0" (244cm)
  return {
    value: heightInCm.toString(),
    label: heightToString(heightInCm),
  };
});