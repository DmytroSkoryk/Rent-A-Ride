const makeStyles = ({ style }) => ({
  control: (baseStyles, state) => ({
    ...baseStyles,
    width: 224,
    borderRadius: 14,
    backgroundColor: "#F7F7FB",
    cursor: "pointer",
  }),
  indicatorSeparator: (baseStyles, state) => ({
    ...baseStyles,
    display: "none",
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    color: "#121417",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: "1.11",
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "#121417",
    transform: state.selectProps.menuIsOpen ? "rotate(0.5turn)" : "unset",
    padding: 14,
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    width: 224,
    borderRadius: 14,
    backgroundColor: "#F7F7FB",
    paddingRight: 8,
    paddingLeft: 18,
    paddingTop: 14,
    paddingBottom: 14,
  }),
});

export default makeStyles;
