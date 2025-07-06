import React from 'react';
import './SideMenu.css';

const SideMenu = ({ activeSection, setActiveSection, menuOpen, setMenuOpen }) => {
  const sections = [
    { id: 'about', label: 'About Me' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleClick = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false); // Close menu when item is clicked
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`side-menu ${menuOpen ? 'active' : ''}`}>
      <ul>
        {sections.map((section) => (
          <li
            key={section.id}
            className={activeSection === section.id ? 'active' : ''}
            onClick={() => handleClick(section.id)}
          >
            {section.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;