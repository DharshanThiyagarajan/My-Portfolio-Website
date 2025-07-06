import React, { useEffect } from 'react';
import './dharsh.css';
import dharshPic from './assets/dharshh.jpg';
import Resume from './assets/Resume dharsh.pdf';
import Spline from '@splinetool/react-spline';

const words = [
  'FULLSTACK DEVELOPER',
  'APP DEVELOPER',
  'FREE-LANCER',
  'FRONT-END DEVELOPER',
  'BACK-END DEVELOPER'
];

export default function Portfolio() {
  useEffect(() => {
    const typedText = document.getElementById('typed-text');
    let wordIndex = 0;
    let charIndex = 0;
    let typingForward = true;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (typingForward) {
        if (typedText) {
          typedText.textContent = currentWord.substring(0, charIndex + 1);
        }
        charIndex++;
        if (charIndex === currentWord.length) {
          typingForward = false;
          setTimeout(typeEffect, 1000);
          return;
        }
      } else {
        if (typedText) {
          typedText.textContent = currentWord.substring(0, charIndex - 1);
        }
        charIndex--;
        if (charIndex === 0) {
          typingForward = true;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(typeEffect, typingForward ? 150 : 75);
    }

    typeEffect();

    const cursorBg = document.querySelector('.cursor-background');
    const handleMouseMove = (e) => {
      if (cursorBg) {
        cursorBg.style.top = `${e.clientY}px`;
        cursorBg.style.left = `${e.clientX}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div className="cursor-background"></div>
      <nav>
        <a href="#about">About Me</a>
        <p>|</p>
        <a href="#projects">My Projects</a>
        <p>|</p>
        <a href="#proficiencies">Proficiencies</a>
        <p>|</p>
        <a href="#contact">Contact</a>
      </nav>
      <div className="dharshan">
          <img className="images" src={dharshPic} alt="Dharsh" />
      </div>
      <div className="Name">
        <div>
          <h4>Hello Spectator!! </h4>
          <h4>Welcome To My Portfolio I'm</h4>

          <h1 style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>DHARSHAN</h1>
          <div className="typing">
            🎯<span id="typed-text"></span><span className="cursor">_</span>
          </div>
          <a href={Resume} download>
            <button className="resume">Download Resume</button>
          </a>
          <section>
            <div style={{ width: '450px', height: '70px' }}>
              <a href='https://github.com/DharshanThiyagarajan'><img className="icons" src="/github.png" alt="GitHub" /></a>
              <a href='mailto:dharshan.tlda@gmail.com'><img className="icons" src="/email.png" alt="Email" /></a>
              <a href='https://www.instagram.com/ziddy._.king._.11?igsh=ZGFtc252Y2EybXdu' ><img className="icons" src="/insta.png" alt="Instagram" /></a>
              <a href='https://x.com/dharsh_shan'><img className="icons" src="/twitter.png" alt="Twitter" /></a>
              <a href="https://wa.me/919941700784?text=IntrestedOnUrWork!"><img className="icons" src="/whatsapp.png" alt="WhatsApp" /></a>
            </div>
          </section>
        </div>
        <div className="spline"><Spline scene="/scene.splinecode" /></div>
      </div>

      <h2>About Me</h2>
      <section id="about">
        <p>
          I am pursuing a Bachelor's degree in Electronics and Communication Engineering at M. Kumarasamy College of
          Engineering. I aim to work in a dynamic organization where I can apply my skills and grow professionally.
        </p>
      </section>
      <h2>My Projects</h2>
      <section id="projects" className="projects">
        <div className="project">
          <img src="" alt="Heart Disease Prediction" />
          <h3>Heart Disease Prediction</h3>
          <p>Machine learning model for early detection and diagnosis of cardiovascular conditions.</p>
        </div>
        <div className="project">
          <img src="https://via.placeholder.com/300" alt="License Plate Recognition" />
          <h3>License Plate Recognition</h3>
          <p>Enhanced image processing for accurate license plate recognition in various conditions.</p>
        </div>
      </section>

      <h2>I Used Work In</h2>
      <section id="proficiencies">
        <img className="skills" src="/html.png" alt="HTML" />
        <img className="skills" src="/css.png" alt="CSS" />
        <img className="skills" src="/js.png" alt="JavaScript" />
        <img className="skills" src="/react.png" alt="React" />
        <img className="skills" src="/aws.png" alt="AWS" style={{ backgroundColor: '#00BFFF', borderRadius: '50px' }} />
      </section>
      <div>
        <footer>&copy; 2025 Dharshan Thiyagarajan. All rights reserved.</footer>
      </div>
    </div>
  );
}