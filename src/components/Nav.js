import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

// ------------------------------------------------------------------
export default function Nav() 
{
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // >>>>> 2
  const navigate = useNavigate();

  // ___________________________________
  // Change color of NavBar when scrolling.
  // ?? WHY we need useEffect( ,[]) ??
  useEffect(() => {
    window.addEventListener("scroll", () => {

      console.log("window.scrollY", window.scrollY);

      if (window.scrollY > 50) 
      {
        setShow(true);
      } 
      else 
      {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  // ___________________________________
  // Move to a requested page.
  const handleChange = (e) => { // >>>>> 1
    setSearchValue(e.target.value); // >>>>> 2

    navigate(`/search?q=${e.target.value}`);
  };

  // ___________________________________
  // NavBar UI
  return (
    // If show becomes false, then just the className = nav.
    // If show becomes true, then the className = nav nav__black.
    <nav className={`nav ${show && "nav__black"} `}>
      
      {/* ___________________________________________ */}
      {/* Logo in NavBar */}
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        className="nav__logo"

        // When you click the Netflix logo in Nav, the web page will be reloaded. 
        onClick={() => (window.location.href = "/")}
      />

      {/* ___________________________________________ */}
      {/* SearchBar in NavBar */} {/* >>>>> */}
      <input
        value={searchValue}
        onChange={handleChange} // >>>>> 1
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요."
      />

      {/* ___________________________________________ */}
      {/* User's Avatar Image in NavBar */}
      <img
        alt="User logged"
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        className="nav__avatar"
      />
    </nav>
  );
}
