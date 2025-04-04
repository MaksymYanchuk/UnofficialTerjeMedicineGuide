import styled from "styled-components";
import TableSection from "./TableSection";
import { MedicineItem } from "../App";

interface Table {
  category: string;
  pills: MedicineItem[];
  ampoulsAndInjectors: MedicineItem[];
  salves: MedicineItem[];
}

const StyledGrid = styled.div`
  background-color: white;
  outline: solid ${(props) => props.theme.colors.borderColor} 1px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "header header";
  
  @media (max-width: 767.98px ){
    grid-template-areas: 
    "header"
    "pills"
    "ampouls"
    "salves"
  }
`;

const TableHeader = styled.h2`
  grid-area: header;
`;

const Table = ({ category, pills, ampoulsAndInjectors, salves }: Table) => {
  const tableHeader = category.charAt(0).toUpperCase() + category.slice(1, -3).replace(/([a-z])([A-Z])|([A-Z])([A-Z][a-z])/g, "$1$3 $2$4");
  return (
    <StyledGrid>
      <TableHeader>{tableHeader}</TableHeader>
      <TableSection category={category} header={"Pills"} data={pills}></TableSection>
      <TableSection category={category} header={"Ampouls/injectors"} data={ampoulsAndInjectors}></TableSection>
      <TableSection category={category} header={"Salves"} data={salves}></TableSection>
    </StyledGrid>
  );
};

export default Table;
