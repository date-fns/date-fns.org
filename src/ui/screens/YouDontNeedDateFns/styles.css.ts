import { style } from "@vanilla-extract/css";

export const screen = style({
  height: "100%",
  width: "100%",
  overflowY: "scroll",
  background: "#fffdf9",

  "@media": {
    "(prefers-color-scheme: dark)": {
      backgroundColor: "#12020a",
    },
  },
});

export const navBarContainer = style({
  flex: "none",
  height: "2rem",
  position: "sticky",
  top: 0,
  zIndex: 1,
});

export const content = style({
  flex: "auto",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  position: "relative",
  maxWidth: "80rem",
  margin: "0 auto",
  width: "100%",
  minHeight: "100%",
  fontSize: "18px",
});

export const wrapper = style({
  width: "100%",
  padding: "30px",
  color: "#4a3142",
  backgroundColor: "#fffdf9",
  minHeight: "100%",

  "@media": {
    "(prefers-color-scheme: dark)": {
      backgroundColor: "#1a030f",
      color: "#cbc0c7",
      borderLeft: "1px solid #2c1622",
      borderRight: "1px solid #2c1622",
    },
  },
});

export const inner = style({
  maxWidth: "50rem",
  margin: "0 auto",
  padding: "3rem 0",
});
