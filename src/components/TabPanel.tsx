import styled from "styled-components";

const StyledTab = styled.div`
  margin: 20px auto;
  width: fit-content;
  padding: 10px;
  background-color: rgba(246, 247, 248, 0.5);
  border-radius: 10px;
  outline: solid ${(props) => props.theme.colors.borderColor} 1px;
`;

const StyledBox = styled.div`
  padding: 5px;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <StyledTab role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <StyledBox>{children}</StyledBox>}
    </StyledTab>
  );
};

export default TabPanel;
