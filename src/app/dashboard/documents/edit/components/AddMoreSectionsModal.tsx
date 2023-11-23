"us cliet";
import Modal from "@/components/Modal.components";
import { documentContext } from "@/contexts/TemplateContext";
import { TemplateSection } from "@/types/template";
import React, { useContext, useState } from "react";
import { BiPlus } from "react-icons/bi";

const additionalSections = [
  "Volunteer",
  "Community Service",
  "Awards",
  "Publications",
  "Affiliation",
  "Additional Information",
  "Language",
];

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}
const AddMoreSectionsModal = ({ setIsModalOpen, isModalOpen }: Props) => {
  const { handleAddMoreSections, resumeSections } = useContext(documentContext);
  const [sectionTitle, setSectionTitle] = useState<string[]>([]);
  const [manualEntry, setManualEntry] = useState("");
  const [disableManualEntry, setDisableManualEntry] = useState(true);

  const handleAddSection = (section: string[]) => {
    console.log(manualEntry);
    console.log("section is ", section);
    if (section) {
      if (manualEntry) {
        section.push(manualEntry);
      }
      const sections = section.map((item) => ({
        sectionTitle: item,
        subheading: "",
        content: "",
        heading: "",
      }));
      handleAddMoreSections([...sections]);
      setIsModalOpen(false);
    }
  };
  return (
    <Modal>
      <div
        onClick={() => setIsModalOpen(false)}
        className={`fixed top-0 left-0 lg:px-[58px] flex-col flex items-center justify-center
                h-screen w-screen backdrop-blur-sm bg-[rgba(141,172,216,0.25)] ${
                  isModalOpen ? "block" : "hidden"
                }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[90%] pt-[60px] pb-[45px] max-w-[964px] flex flex-col items-center h-fit bg-white rounded-[20px]"
        >
          <p className="text-[30px] leading-[40px] font-[600] text-center">
            Additional Sections
          </p>
          <p>Select up to 4</p>
          <div className="grid lg:grid-cols-2 gap-[14px] pt-[86px]">
            {additionalSections?.map((section, id) => (
              <div key={id} className="flex items-center gap-[14px]">
                <CheckBox
                  sectionTitle={sectionTitle}
                  section={section}
                  id={section.split(" ").join("-")}
                  setSectionTitle={setSectionTitle}
                />
                <label
                  htmlFor={section.split(" ").join("-")}
                  className="text-[20px]  leading-[20px] font-inter text-primary-gray-700"
                >
                  {section}
                </label>
              </div>
            ))}
            <div className="flex items-center gap-[14px]">
              <CheckBox
                onChange={() => {
                  setDisableManualEntry((prev) => !prev);
                }}
                isManual={true}
                id="other"
              />
              <input
                disabled={disableManualEntry}
                onChange={(e) => {
                  setManualEntry(e.target.value);
                }}
                type="text"
                placeholder="Other"
                className="border-[1px] disab font-inter font-[500] border-gray-300 rounded-[3px] w-[280px] px-[10px] outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => handleAddSection(sectionTitle)}
            className="w-full mt-[49px] uppercase gap-2 max-w-[280px] h-[40px] text-[14px] leading-[20px] text-center font-inter font-[600] bg-base-primary-green rounded-[3px] text-white flex  items-center justify-center"
          >
            <BiPlus /> <span>Add Sections</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMoreSectionsModal;

interface CheckBoxProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  id: string;
  section?: string;
  sectionTitle?: string[];
  setSectionTitle?: React.Dispatch<React.SetStateAction<string[]>>;
  isManual?: boolean;
}
const CheckBox = ({
  onChange,
  id,
  sectionTitle,
  section,
  setSectionTitle,
  isManual,
}: CheckBoxProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = () => {
    if (section && sectionTitle && setSectionTitle) {
      if (!sectionTitle.includes(section)) {
        setSectionTitle((prev) => [...prev, section]);
      } else {
        const filterOutCurrentSection = sectionTitle.filter(
          (item) => item !== section
        );
        setSectionTitle(filterOutCurrentSection);
      }
    }
  };
  return (
    <label
      className={`h-[20px] w-[20px] rounded-[5px] border-[1px] border-base-primary-green ${
        isSelected ? "bg-base-primary-green" : "bg-white"
      }`}
      htmlFor={id}
    >
      <input
        onChange={(e) => {
          setIsSelected((prev) => !prev);
          onChange && isManual ? onChange(e) : handleChange();
        }}
        type="checkbox"
        hidden
        id={id}
      />
    </label>
  );
};
