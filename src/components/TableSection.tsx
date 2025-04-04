import { useState } from "react";
import styled from "styled-components";
import TableRow from "./TableRow";
import { MedicineItem } from "../App";
import { MedicineLevels } from "../App";

import SortAsc from "/icons/sort-up.svg";
import SortDesc from "/icons/sort-down.svg";

interface Table {
  category: string;
  header: string;
  data: MedicineItem[];
}

enum SortDirection {
  asc = "asc",
  desc = "desc",
}

enum KeyToSort {
  lvl = "lvl",
  name = "name",
  durationTimeSec = "durationTimeSec",
  overdose = "overdose",
}

interface Sort {
  keyToSort: keyof MedicineItem;
  direction: SortDirection;
}

const TableGrid = styled.div`
  outline: solid ${(props) => props.theme.colors.borderColor} 1px;
  display: grid;
  grid-template-columns: 1fr 170px 115px 100px;
  border-collapse: collapse;

  @media (max-width: 990.98px) {
    font-size: 12px;
    grid-template-columns: 65px 120px 95px 85px;
  }
`;

const StyledSection = styled.div`
  outline: solid ${(props) => props.theme.colors.borderColor} 1px;
`;

const ColumnHeader = styled.div`
  font-weight: bold;
  padding-left: 5px;
  outline: solid ${(props) => props.theme.colors.borderColor} 1px;
  position: relative;
  text-align: left;
  cursor: pointer;
  &:hover img {
    opacity: 1;
  }
`;

const SortImg = styled.img`
  position: relative;
  top: 4px;
  opacity: 0;
  width: 20px;
  height: 20px;
`;

const TableSection = ({ category, header, data }: Table) => {
  const [sort, setSort] = useState<Sort>({ keyToSort: KeyToSort.lvl, direction: SortDirection.asc });

  if (!data || data.length === 0) {
    return;
  }

  const transformedData: MedicineItem[] = data.map((drug) => {
    const lvlKey = Object.keys(drug).find((key) => key.includes(category));
    const lvlValue = drug[category as keyof MedicineLevels];
    const drugCopy = { ...drug };

    if (lvlKey && lvlKey in drugCopy) {
      delete drugCopy[lvlKey as keyof MedicineItem];
    }
    return { ...drugCopy, lvl: lvlValue };
  });

  const handleSortClick = (header: KeyToSort) => {
    setSort({
      keyToSort: header,
      direction:
        header === sort.keyToSort ? (sort.direction === SortDirection.asc ? SortDirection.desc : SortDirection.asc) : SortDirection.desc,
    });
  };

  function getSortedArray(array: MedicineItem[]): MedicineItem[] {
    const keyToSort = sort.keyToSort as keyof MedicineItem;

    return array.sort((a, b) => {
      const aValue = a[keyToSort];
      const bValue = b[keyToSort];

      if (aValue === "Vaccine") return sort.direction === SortDirection.asc ? 1 : -1;
      if (bValue === "Vaccine") return sort.direction === SortDirection.asc ? -1 : 1;

      if (aValue == null || bValue == null) {
        return 0;
      }

      if (sort.direction === SortDirection.asc) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }

  const sortedData = getSortedArray(transformedData);

  return (
    <>
      {sortedData.length > 0 && (
        <StyledSection>
          <h3>{header}</h3>
          <TableGrid>
            <ColumnHeader onClick={() => handleSortClick(KeyToSort.lvl)}>
              Lvl
              <SortImg src={sort.direction === SortDirection.asc ? SortAsc : SortDesc} />
            </ColumnHeader>
            <ColumnHeader onClick={() => handleSortClick(KeyToSort.name)}>
              Name
              <SortImg src={sort.direction === SortDirection.asc ? SortAsc : SortDesc} />
            </ColumnHeader>
            <ColumnHeader onClick={() => handleSortClick(KeyToSort.durationTimeSec)}>
              Duration (s)
              <SortImg src={sort.direction === SortDirection.asc ? SortAsc : SortDesc} />
            </ColumnHeader>
            <ColumnHeader onClick={() => handleSortClick(KeyToSort.overdose)}>
              Overdose
              <SortImg src={sort.direction === SortDirection.asc ? SortAsc : SortDesc} />
            </ColumnHeader>
          </TableGrid>

          {transformedData.map((drug) => {
            return (
              <TableGrid key={drug.name}>
                <TableRow name={drug.name} durationTimeSec={drug.durationTimeSec} lvl={drug.lvl} overdose={drug.overdose} />
              </TableGrid>
            );
          })}
        </StyledSection>
      )}
    </>
  );
};

export default TableSection;
