import styled from "styled-components";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { MedicineItem, MedicineLevels } from "../App";

const StyledForm = styled.form`
  align-self: flex-start;
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: right;
  margin-bottom: 100px;
  padding: 0 20px 0 20px;
`;

const StyledInput = styled.input`
  border: solid gray 2px;
  border-radius: 25px;
  width: 400px;
  height: 40px;
  font-size: 18px;
  padding-left: 35px;
  box-sizing: border-box;
  background-image: url("./icons/search.svg");
  background-repeat: no-repeat;
  background-position: 8px center;
  background-size: 20px 20px;

  @media (max-width: 767.98px) {
    width: 300px;
    height: 30px;
    font-size: 14px;
  }
`;

const SuggestionsList = styled.ul`
  text-align: left;
  position: absolute;
  top: 65px;
  width: 400px;
  background: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  max-height: 350px;
  overflow-y: auto;
  z-index: 1000;
  @media (max-width: 767.98px) {
    width: 300px;
    font-size: 14px;
  }
`;

const SuggestionItem = styled.li`
  padding: 8px;
  &:hover {
    background: #f0f0f0;
  }
`;

const DrugName = styled.p`
  margin: 0;
  font-weight: bold;
`;

const DrugInfo = styled.p`
  margin: 0;
`;

type Props = {
  data: MedicineItem[];
};

const SearchField = ({ data }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<MedicineItem[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openSuggestions = (search: string) => {
    if (search.length > 0) {
      const filteredMedicine = data.filter((drug: MedicineItem) => drug.name.toLowerCase().includes(search.toLowerCase()));
      setIsSuggestionsOpen(true);
      setSuggestions(filteredMedicine);
    } else {
      setIsSuggestionsOpen(false);
    }
  };

  const handleInputChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    openSuggestions(event.target.value);
  }, 300);

  return (
    <StyledForm ref={formRef}>
      <StyledInput
        autoComplete="off"
        onChange={handleInputChange}
        onClick={() => openSuggestions(inputValue)}
        placeholder="Search meds..."
      />
      {isSuggestionsOpen &&
        (suggestions.length > 0 ? (
          <SuggestionsList>
            {suggestions.map((drug) => {
              const lvlKeys = Object.keys(drug).filter((key) => key.endsWith("Lvl")) as (keyof MedicineLevels)[];
              return (
                <SuggestionItem key={drug.name}>
                  <DrugName>{drug.name}</DrugName>
                  <DrugInfo>
                    {lvlKeys.map(
                      (key) =>
                        ` ${
                          key.charAt(0).toUpperCase() + key.slice(1, -3).replace(/([a-z])([A-Z])|([A-Z])([A-Z][a-z])/g, "$1$3 $2$4")
                        } lvl: ${drug[key]}`
                    )}{" "}
                    | Duration (s): {drug.durationTimeSec}sec
                  </DrugInfo>
                </SuggestionItem>
              );
            })}
          </SuggestionsList>
        ) : (
          <SuggestionsList>
            <SuggestionItem>Not Found</SuggestionItem>
          </SuggestionsList>
        ))}
    </StyledForm>
  );
};

export default SearchField;
