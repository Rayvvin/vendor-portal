import { defaultTheme } from "react-admin";

const theme = {
  ...defaultTheme,
  palette: {
    primary: {
      // main: "#333",
      // main: "rgb(0, 120, 103)",
      // main: "#344F16",
      // main: "#E48629",
      // main: "#007867",
      main: "#3D8B7A",
    },
    secondary: {
      main: "rgb(0, 240, 77)",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 960,
      xl: 1200,
    },
  },
  components: {
    ...defaultTheme.components,
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: {
          background: "var(--body-color)",
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
          "& .RaList-content": {
            marginLeft: "15px !important",
          },
          "& .MuiTablePagination-root > .MuiPaginationItem-text > .MuiPaginationItem-circular, .Mui-selected":
            {
              color: "white !important",
              background: "#3D8B7A !important",
              borderRadius: "6px",
            },

          "& .MuiTablePagination-root > .MuiSelect-select, .MuiTablePagination-select, .MuiSelect-standard":
            {
              color: "white !important",
              background: "#3D8B7A !important",
              borderRadius: "6px",
            },
          "& .MuiTablePagination-root > .MuiSelect-icon, .MuiTablePagination-selectIcon, .MuiSelect-iconStandard":
            {
              color: "white !important",
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
            padding: "10px 16px",
          },
          "& .RaDatagrid-headerCell": {
            background: "#F9F9F9",
          },
        },
      },
    },
    RaCreateButton: {
      styleOverrides: {
        root: {
          "&.RaCreateButton-floating": {
            // background: "#E0455F",
            color: "var(--white)",
            // boxShadow: "6px 6px 12px #b6b7b9, -6px -6px 12px #ffffff",
          },
        },
      },
    },
    RaSaveButton: {
      styleOverrides: {
        root: {
          // background: "#E0455F",
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
          background: "hsl(0, 0%, 100%);",
          color: "var(--onyx)",
          position: "fixed",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // border: "1px solid rgba(228, 228, 231, 1)",
          boxShadow: "0 1px 5px hsla(0, 0.00%, 0.00%, 0.14)",
          // boxShadow: 'none',
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
            // background: "rgb(245, 248, 255);",
            // background: "rgba(240, 255, 247);",
            background: "rgba(255, 255, 255, 1);",
          },
          "& .RaLayout-contentWithSidebar": {
            // background: "#222",
            // background: "#141A21",
            background: "#191919",
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
            background: "#141A21 !important",
            // background: "#191919 !important",
          },
          "& .RaSidebar-fixed": {
            background: "#141A21",
            // background: "#191919",
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          // "& span, p": {
          //   color: "white !important",
          // },
          // "& .MuiTableCell-root": {
          //   border: "0.94px solid #E4E4E7",
          // },
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
            // background: "rgba(0, 167, 111, .1)",
            background: "#3D8B7A",
            // color: "#5BE49B",
            color: "#FFFFFF",
            fontFamily: "Rubik",
            "& .RaMenuItemLink-icon": {
              // color: "#5BE49B",
              color: "#FFFFFF",
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

export default theme;
