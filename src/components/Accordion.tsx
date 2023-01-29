import { useState } from "react";

type questionAnswer = {
  question: string;
  answer: string;
};

interface AccordionProps {
  list: questionAnswer[];
  // children: React.ReactNode;
}

export const Accordion = ({ list }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <>
      {list.map((item, idx) => {
        return (
          <AccordionItem
            key={idx}
            index={idx}
            ariaExpanded={idx === activeIndex}
            item={item}
            onToggleAccordion={() => {
              idx === activeIndex ? setActiveIndex(-1) : setActiveIndex(idx);
            }}
          />
        );
      })}
    </>
  );
};

interface AccordionItemsProps {
  ariaExpanded: boolean;
  item: questionAnswer;
  index: number
  onToggleAccordion: () => void;
}

const AccordionItem = (props: AccordionItemsProps) => {
  const { ariaExpanded, item, index, onToggleAccordion } = props;
  return (
    <div>
      <button
        aria-expanded={ariaExpanded}
        className="bg-red-300 w-full transition flex space-x-5 px-5 items-center h-16"
        onClick={onToggleAccordion}
      >
        {item.question}
      </button>
      <div className={`px-5 pt-0 overflow-hidden ${ariaExpanded ? "" : "max-h-0"}`}
      >
        {item.answer}
      </div>
    </div>
  );
}
