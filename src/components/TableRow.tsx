import styled from "styled-components";

interface Props {
   name: string
   durationTimeSec: number
   lvl: number | string | undefined
   overdose: number
}
export const DrugCell = styled.div`
  outline: solid ${(props) => props.theme.colors.borderColor} 1px;
  padding: 7px;
  text-align: left;
  border-collapse: collapse;
`;

const TableRow = ({ name, durationTimeSec, lvl, overdose }: Props) => {
  return (
    <>
      <DrugCell>{lvl ? lvl : null}</DrugCell>
      <DrugCell>{name}</DrugCell>
      <DrugCell>{durationTimeSec}</DrugCell>
      <DrugCell>{overdose}</DrugCell>
    </>
  );
};

export default TableRow;
