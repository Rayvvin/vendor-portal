import { defaultTheme } from "react-admin";

const darkTheme = {
  ...defaultTheme,
  palette: {
    // mode: 'dark',
    primary: {
      main: "#333",
      // main: "rgb(0, 120, 103)",
      // main: "#344F16",
      // main: "#E48629"
    },
    secondary: {
      main: "rgb(0, 240, 77)",
    },
  },
  components: {
    ...defaultTheme.components,
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: {
          background: "var(--body-color)",
          "& .MuiInputLabel-outlined": {
            // color: "white",
          },
          "& .Mui-focused": {
            color: "rgba(0, 0, 0, 0.87)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          "& .Mui-selected": {
            background: "#000000",
          },
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: {
          "& .MuiToolbar-root": {
            background: "transparent",
            // boxShadow: '6px 6px 12px #c9c9c9, -6px -6px 12px #ffffff',
            // borderRadius: '6px'
          },
        },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          // boxShadow: "6px 6px 12px #b6b7b9, -6px -6px 12px #ffffff",
          // borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            // color: 'primary.main',
          },
          "& .RaDatagrid-row": {
            padding: "7px",
          },
          "& .RaDatagrid-rowEven": {
            // background: "var(--onyx-row)",
          },
          "& .MuiTableCell-root": {
            padding: "16px",
          },
        },
      },
    },
    RaCreateButton: {
      styleOverrides: {
        root: {
          "&.RaCreateButton-floating": {
            background: "#fff",
            // color: "var(--white)",
            // boxShadow: "6px 6px 12px #b6b7b9, -6px -6px 12px #ffffff",
          },
        },
      },
    },
    RaSaveButton: {
      styleOverrides: {
        root: {
          background: "#E0455F",
          // background: 'linear-gradient(to bottom right, #610212, #E0455F)',
          color: "var(--white)",
          "&:hover": {
            background: "hsl(357, 86%, 57%)",
            // background: 'linear-gradient(to bottom right, #610212, #E0455F)',
            color: "var(--white)",
          },
        },
      },
    },
    RaTabbedForm: {
      styleOverrides: {
        root: {
          paddingBottom: "0px !important",
          "& .Mui-selected": {
            background: "#E0455F !important",
            color: "var(--white) !important",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 20px hsla(0, 0%, 0%, 0.06)",
          // background: 'hsl(357, 86%, 57%)',
          background: "#222",
          color: "white",
          position: "fixed",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 20px hsla(0, 0%, 0%, 0.06)",
          borderRadius: "6px",
          margin: "10px",
        },
      },
    },
    RaLayout: {
      styleOverrides: {
        root: {
          // background: "transparent",
          "& .RaLayout-appFrame": {
            // marginTop: "0px",
          },
          "& .RaLayout-content": {
            background: "rgba(0, 0, 0, 0.1)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
          },
          "& .RaLayout-contentWithSidebar": {
            background: "#222",
            // marginTop: '20px'
          },
        },
      },
    },
    RaFilterForm: {
      styleOverrides: {
        root: {
          minHeight: "0px !important",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          "& .MuiDrawer-paper": {
            background: "#222 !important",
          },
          "& .RaSidebar-fixed": {
            background: "#222",
          },
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          "& span, p": {
            color: "white !important",
          },
          "& .MuiTableCell-root": {
            background: "#222",
            border: "1px solid rgba(224, 224, 224, 0.3) !important",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: "white !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: "white",
          boxShadow: "none",
        },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          color: "#8d9498",
          margin: "5px 10px",
          fontSize: "13px",
          padding: "8px 1px",
          borderLeft: "3px solid transparent",
          borderRadius: "6px",
          background: "transparent",

          "&.RaMenuItemLink:hover, RaMenuItemLink-root:hover": {
            background: "rgba(0, 0, 0, 0.1)",
          },

          "&.RaMenuItemLink-active": {
            // borderLeft: '4px solid #E0455F',
            background: "var(--onyx)",
            color: "#fff",
            fontFamily: "Rubik",
            "& .RaMenuItemLink-icon": {
              color: "#fff",
            },
          },
          "& .RaMenuItemLink-icon": {
            color: "#8d9498",
          },
        },
      },
    },
  },
};

export default darkTheme;
