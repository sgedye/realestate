import { useState } from "react";

type ListItem = {
  visibleContent: React.ReactNode;
  hiddenContent: React.ReactNode;
};

interface AccordionProps {
  list: ListItem[];
}

export const Accordion = ({ list }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <>
      {list.map((item, idx) => {
        return (
          <AccordionItem
            key={idx}
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
  item: ListItem;
  onToggleAccordion: () => void;
}

const AccordionItem = (props: AccordionItemsProps) => {
  const { ariaExpanded, item, onToggleAccordion } = props;
  return (
    <article className="bg-gray-400 overflow-hidden rounded-lg mb-6">
      <button
        aria-expanded={ariaExpanded}
        // className="bg-red-300 w-full transition flex space-x-5 px-5 items-center h-16"
        className="block w-full"
        onClick={onToggleAccordion}
      >
        {item.visibleContent}
      </button>
      <section
        className={`overflow-hidden ${ariaExpanded ? "max-h-full" : "max-h-0"}`}
      >
        {item.hiddenContent}
      </section>
    </article>
  );
};
