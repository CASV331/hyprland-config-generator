import { useState } from "react";
import SectionButton from "../../ui/button/SectionButton";
import StatusBarConfig from "../../preview/DeComponents/statusBar/StatusBar_config";
import TerminalConfig from "../../preview/DeComponents/terminal/Terminal_config";

function Sidebar() {

  const [activeSection, setActiveSection] = useState("Options");

  const sections = ["Status Bar", "Terminal"];

  const componentMap = {
    "Status Bar": StatusBarConfig,
    "Terminal": TerminalConfig
  };

  const handleClick = (section) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <ul className="flex flex-col gap-2">
          {sections.map(section => {
            const Component = componentMap[section];
            return (
              <li key={section}>
                <SectionButton value={section} isActive={activeSection === section} onClick={() => handleClick(section)}>
                  <Component />
                </SectionButton>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;