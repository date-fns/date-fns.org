import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "4rem",
});

export const header = style({
  fontSize: "1.1rem",
  fontWeight: 500,
  textAlign: "center",

  color: "#9b818d",

  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#9b818d",
    },
  },
});

export const logo = style({
  display: "block",
  width: "170px",
  maxWidth: "calc(100vw - 60px)",
  height: "auto",
  opacity: 0.7,
});
