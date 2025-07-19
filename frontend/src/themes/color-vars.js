import * as themeObject from "@mui/material/colors"

export const getThemeColorObject = (variant) => {
     // Check if the variant exists in the themeObject
     if (themeObject[variant]) {
         // Call the variant function to get the color object and return it
         return themeObject[variant];
     } else {
         // Handle case where variant does not exist (optional)
         console.warn(`Color variant '${variant}' does not exist in themeObject.`);
         return null; // or handle differently based on your application logic
     }
 }
 