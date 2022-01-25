import { useContext } from "react";
import { css } from "@emotion/css";
import type { Strings } from "../constants/strings";
import { MediaContext, ThemeType } from "./MediaContext";
import { camelCase } from "../utils/camelCase";

export function useMediaContext() {
  const mediaContext = useContext(MediaContext);

  const getStyles = (
    themeKey: keyof ThemeType["styles"],
    className?: string,
    flags: any = {}
  ): any => {
    if (!(themeKey in mediaContext.style.styles)) {
      throw new Error(
        `"${themeKey}" not found in [${Object.keys(
          mediaContext.style.styles
        ).join(", ")}]`
      );
    }

    const styles = mediaContext.style.styles[themeKey](
      mediaContext.style.theme,
      flags
    );

    const getUtilitySelectors = (flagsObject: any) => {
      if (Object.keys(flagsObject).length) {
        return Object.entries(flagsObject)
          .map((key) => {
            const objectType = typeof key[1];
            return objectType === "boolean" && key[1]
              ? `zora-${themeKey}--${key[0]}`
              : objectType === "string"
              ? `zora-${themeKey}__${key[0]}--${camelCase(key[1] as string)}`
              : "";
          })
          .join(" ");
      } else {
        return "";
      }
    };

    return {
      className: `${className ? `${className} ` : ""}zora-${themeKey}${
        mediaContext.style.useDefaultStyles ? ` ${css(styles)}` : ""
      } ${getUtilitySelectors(flags)}`,
    };
  };

  const getString = (stringName: keyof typeof Strings) => {
    return mediaContext.strings[stringName];
  };

  return { ...mediaContext, getString, getStyles };
}
