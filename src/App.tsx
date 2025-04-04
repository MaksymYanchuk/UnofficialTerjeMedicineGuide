import data from "./data.json";
import TableList from "./components/TableList";
import SearchField from "./components/SearchField";
import "./App.css";

type MedicineLvl = number | string;

export interface MedicineLevels {
  adrenalineLvl?: MedicineLvl;
  antibiohazardLvl?: MedicineLvl;
  antibioticLvl?: MedicineLvl;
  antidepressantLvl?: MedicineLvl;
  antipoisonLvl?: MedicineLvl;
  radiationLvl?: MedicineLvl;
  bloodRegenLvl?: MedicineLvl;
  concussionLvl?: MedicineLvl;
  painkillerLvl?: MedicineLvl;
  toxicantLvl?: MedicineLvl;
  zVirusLvl?: MedicineLvl;
  sepsisLvl?: MedicineLvl;
  hematomasLvl?: MedicineLvl;
  rabiesLvl?: MedicineLvl;
  bloodHemostaticLvl?: MedicineLvl;
}

export interface MedicineItem extends MedicineLevels {
  type?: string;
  lvl?: MedicineLvl;
  category?: string | string[];
  name: string;
  durationTimeSec: number;
  overdose: number;
}

export type GroupedMeds = Record<string, MedicineItem[]>;

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
