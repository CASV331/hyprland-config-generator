import { useState } from "react";
import SectionButton from "../../ui/button/SectionButton";

function Sidebar() {

  const [activeSection, setActiveSection] = useState("Options");

  const sections = ["Options", "Settings", "About"];

  return (
    <aside className="sidebar w-5/8 aspect-video lg:max-w-1/3">
      <ul className="sidebar__list w-full flex flex-col">
        {sections.map(section => (<li
          key={section}>
          <SectionButton value={section} isActive={section === activeSection} onClick={() => setActiveSection(section)} />
        </li>))}
      </ul>
    </aside>
  );
}

export default Sidebar;