import rawData from "./data.json";
import TableList from "./components/TableList";
import SearchField from "./components/SearchField";
import "./App.css";

export type MedicineLevels = Record<string, number | string | undefined>;

export interface MedicineItem extends MedicineLevels {
  type: string;
  name: string;
  durationTimeSec: number;
  overdose: number;
}

export type GroupedMeds = Record<string, MedicineItem[]>;

interface Data {
  meds: MedicineItem[];
}

const data: Data = rawData;

const groupedMedsByCategory: GroupedMeds = data.meds.reduce((acc, drug: MedicineItem) => {
  Object.keys(drug).forEach((key) => {
    if (key.endsWith("Lvl")) {
      const typedKey = key as keyof MedicineLevels;
      if (!acc[typedKey]) acc[typedKey] = [];
      acc[typedKey]!.push(drug);
    }
  });
  return acc;
}, {} as GroupedMeds);

function App() {
  return (
    <>
      <SearchField data={data.meds}></SearchField>
      <TableList data={groupedMedsByCategory} />
    </>
  );
}

export default App;
