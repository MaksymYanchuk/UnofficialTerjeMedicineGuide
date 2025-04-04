import Table from "./Table";
import { GroupedMeds } from "../App";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import TabPanel from "./TabPanel";

enum MedicineTypes {
  Pills = "Pills",
  Ampouls = "Ampouls",
  Injectors = "Injectors",
  Salves = "Salves",
}

const icons = {
  adrenalineLvl: "/src//icons/adrenaline.svg",
  biohazardLvl:"/src//icons/biohazard.png",
  antibioticLvl:"/src//icons/influenza.png",
  antidepressantLvl:"/src//icons/mental.png",
  foodPoisoningLvl:"/src//icons/poisoning.png",
  radiationLvl:"/src//icons/radiation.png",
  bloodRegenLvl:"/src//icons/blood-regeneration.png",
  concussionLvl:"/src//icons/concussion.png",
  painkillerLvl:"/src//icons/pain.png",
  toxicantLvl:"/src//icons/toxicant.svg",
  zVirusLvl:"/src//icons/Z-virus.png",
  sepsisLvl:"/src//icons/sepsis.png",
  hematomasLvl:"/src//icons/hematoma.png",
  rabiesLvl: "/src//icons/rabies.png",
  bloodHemostaticLvl: "/src//icons/hemostatic.png"
} 

const TableList = ({ data }: { data: GroupedMeds }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" sx={{ width: "100%", padding: "10px" }}>
        {Object.entries(data)
          .sort()
          .map(([category], index) => {
            const transformedCategory = category.replace(/([a-z])([A-Z])|([A-Z])([A-Z][a-z])/g, "$1$3 $2$4");

            return (
              <Tab
                key={index}
                sx={{ fontSize: "14px", padding: "10px", "&:focus": { outline: "none" } }}
                icon={<img style={{width: "20px"}} src={icons[category as keyof typeof icons]}/>}
                label={transformedCategory.slice(0, -3)}
              />
            );
          })}
      </Tabs>

      {Object.entries(data)
        .sort()
        .map(([category, drugList], index) => {
          const pills = drugList.filter((drug) => drug.type === MedicineTypes.Pills).sort((a, b) => a.name.localeCompare(b.name));

          const ampoulsAndInjectors = drugList
            .filter((drug) => drug.type === MedicineTypes.Ampouls || drug.type === MedicineTypes.Injectors)
            .sort((a, b) => a.name.localeCompare(b.name));

          const salves = drugList.filter((drug) => drug.type === MedicineTypes.Salves).sort((a, b) => a.name.localeCompare(b.name));

          return (
            <TabPanel key={category} value={value} index={index}>
              <Table category={category} pills={pills} ampoulsAndInjectors={ampoulsAndInjectors} salves={salves} />
            </TabPanel>
          );
        })}
    </Box>
  );
};
export default TableList;
