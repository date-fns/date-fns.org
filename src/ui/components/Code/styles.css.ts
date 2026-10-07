import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
});

export const copyButton = style({
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  padding: "0.25rem 0.5rem",
  fontSize: "0.75rem",
  color: "#5d583b",
  backgroundColor: "#fffffe",
  border: "1px solid #b9a2b2",
  borderRadius: "4px",
  cursor: "pointer",
  opacity: 0.7,
  transition: "opacity 0.2s",

  ":hover": {
    opacity: 1,
  },

  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#c5c4c2",
      backgroundColor: "#12000a",
      borderColor: "#2c1622",
    },
  },
});

export const code = style({
  display: "block",
  color: "#5d583b",
  backgroundColor: "#fffffe",
  font: "13px Consolas, 'Liberation Mono', Menlo, Courier, monospace",

  "::after": {
    display: "none",
  },

  "::before": {
    display: "none",
  },

  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#c5c4c2",
      backgroundColor: "#12000a",
    },
  },
});

export const pre = style({
  overflowX: "auto",
  border: "1px solid #b9a2b2",
  backgroundColor: "#fffffe",
  padding: ".25rem .5rem",
  borderRadius: "4px",

  "@media": {
    "(prefers-color-scheme: dark)": {
      backgroundColor: "#12000a",
      borderColor: "#2c1622",
    },
  },
});
