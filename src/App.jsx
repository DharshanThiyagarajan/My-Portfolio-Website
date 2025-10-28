import { useState, useEffect } from 'react'
import './App.css'
import SideMenu from './SideMenu'
import Resume from './assets/Dharshan_Resume.pdf'
import Spline from '@splinetool/react-spline'
import dharsh1 from './assets/dharsh.jpg'
import StarfieldBackground from './StarfieldBackground'
import Chatbot from './chatbot.jsx'

const words = [
  'FULLSTACK DEVELOPER',
  'APP DEVELOPER',
  'FREE-LANCER',
  'FRONT-END DEVELOPER',
  'BACK-END DEVELOPER'
]

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const typedText = document.getElementById('typed-text')
    let wordIndex = 0
    let charIndex = 0
    let typingForward = true

    function typeEffect() {
      const currentWord = words[wordIndex]

      if (typingForward) {
        if (typedText) {
          typedText.textContent = currentWord.substring(0, charIndex + 1)
        }
        charIndex++
        if (charIndex === currentWord.length) {
          typingForward = false
          setTimeout(typeEffect, 1000)
          return
        }
      } else {
        if (typedText) {
          typedText.textContent = currentWord.substring(0, charIndex - 1)
        }
        charIndex--
        if (charIndex === 0) {
          typingForward = true
          wordIndex = (wordIndex + 1) % words.length
        }
      }

      setTimeout(typeEffect, typingForward ? 150 : 75)
    }

    typeEffect()

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    }, {
      threshold: 0.1
    })

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section)
    })

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
      document.querySelectorAll('.section').forEach(section => {
        observer.unobserve(section)
      }
      )
    }
  }, [])

  return (
    <div className="portfolio-container">
      <StarfieldBackground />
      <div className="cursor-background"></div>

      {/* Mobile Menu Button */}
      <button
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <SideMenu
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">

            <div className="profile-container">

              <div className="profile-text">
                <h4>Hello Spectator!!</h4>
                <h4>Welcome To My Portfolio I'm</h4>
                <h1>DHARSHAN</h1>
                <div className="typing">
                  🎯<span id="typed-text"></span><span className="cursor">_</span>
                </div>
                <a href={Resume} download>
                  <button className="resume-btn">Download Resume</button>
                </a>

              </div>
              <div className="spline-container">
                <Spline scene="/scene.splinecode" />
              </div>
            </div>

          </div>
          <div className="social-icons">
            <a href='https://github.com/DharshanThiyagarajan'><img className="icon" src="/github.png" alt="GitHub" /></a>
            <a href='mailto:dharshan.tlda@gmail.com'><img className="icon" src="/email.png" alt="Email" /></a>
            <a href='https://www.instagram.com/ziddy._.king._.11?igsh=ZGFtc252Y2EybXdu'><img className="icon" src="/insta.png" alt="Instagram" /></a>
            <a href='https://x.com/dharsh_shan'><img className="icon" src="/twitter.png" alt="Twitter" /></a>
            <a href="https://wa.me/919941700784?text=IntrestedOnUrWork!"><img className="icon" src="/whatsapp.png" alt="WhatsApp" /></a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <h2>About Me</h2>
          <div className="section-content">
            <div className="about-me">
              <p>
              Aspiring Full Stack Developer | ECE Student @ MKCE <br></br>
                As an Electronics and Communication Engineering student, I discovered my passion for
                building complete web solutions. I specialize in creating seamless user experiences
                on the frontend and designing efficient systems on the backend.<br></br>

                🛠️ Proficient in the MEAN Stack (MongoDB, Express.js, Angular, Node.js)<br></br>
                💡 Experienced with modern web technologies and agile development practices<br></br>
                ✨ Passionate about writing clean, maintainable code and following best practices<br></br>

                🎯 Currently seeking full stack developer roles to contribute to meaningful projects
                and grow as a software professional.<br></br>

                <em> This portfolio was built with React, demonstrating my frontend capabilities. </em>
              </p>
            </div>
            
            <div className="about-image">
              <img className='profile-image' src = {dharsh1} alt="Dharsh" />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <h2>Education</h2>
          <div className="education-container">
            <div className="education-item">
              <h3>Bachelor's Degree</h3>
              <p className="institution">M. Kumarasamy College of Engineering</p>
              <p className="duration">2022 - 2026</p>
              <p className="description">Specialized in Electronics and Communication Engineering</p>
            </div>
            <div className="divider"></div>
            <div className="education-item">
              <h3>Schooling</h3>
              <p className="institution">Sri Ramakrishna Boys Matriculation Hr Sec School</p>
              <p className="duration">2020 - 2022</p>
              <p className="institution">Evaans Matriculation  Hr Sec School</p>
              <p className="duration">2010 - 2020</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2>My Projects</h2>
          <div className="projects-container">
            <div className="project-card">
              <div className="project-image">
                <img src="/flow.png" alt="APP'ENABLES Project" />
                <div className="project-overlay">
                  <div className="project-details">
                    <h3>MetroFlow Sentinel</h3>
                    <p>Smart Blockage Detection and Clearance in Metropolitan Drainage Systems Using Flow Sensors.</p>
                    <div className="tech-stack">
                      <a href='https://github.com/DharshanThiyagarajan'><span><img src="/git.png" alt="g" />View In Detail</span></a>
                      {/* <span>Embedded C</span>
                      <span>Arduino</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <img src="/appenable.png" alt="APP'ENABLES Project" />
                <div className="project-overlay">
                  <div className="project-details">
                    <h3>APP'ENABLES</h3>
                    <p>An AI-Powered Navigation System for Disabled Individuals to Locate and Utilize Accessibility Features in Unknown Environments.</p>
                    <div className="tech-stack">
                      <a href='https://github.com/DharshanThiyagarajan'><span><img src="/git.png" alt="g" /> View In Detail</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <h2>Technical Skills</h2>
          <div className="skills-container">
            <div className="skills-marquee">
              <div className="skills-list">
                {(() => {
                  const skills = [
                    { src: "/cpp.png", alt: "C++", title: "C++ Programming" },
                    { src: "/html.png", alt: "HTML", title: "HTML5" },
                    { src: "/css.png", alt: "CSS", title: "CSS3" },
                    { src: "/js.png", alt: "JavaScript", title: "JavaScript" },
                    { src: "/react.png", alt: "React", title: "React" },
                    { src: "/python.png", alt: "Python", title: "Python" },
                    { src: "/nodejs.png", alt: "Node.js", title: "Node.js" },
                    { src: "/aws.png", alt: "AWS", title: "AWS" },
                    { src: "/docker.png", alt: "Docker", title: "Docker" },
                    { src: "/flutter.png", alt: "Flutter", title: "Flutter" },
                    { src: "/java.png", alt: "Java", title: "Java" },
                    { src: "/c.png", alt: "C", title: "C Programming" },
                    { src: "/sql.png", alt: "SQL", title: "SQL" }
                  ];
                  const items = [];
                  let i = 0;
                  while (i < 50) {
                    skills.forEach((skill, idx) => {
                      items.push(
                        <img
                          key={`${i}-${idx}`}
                          src={skill.src}
                          alt={skill.alt}
                          title={skill.title}
                        />
                      );
                    });
                    i++;
                  }
                  return items;
                })()}
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="section">
          <h2>Contact Me</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p><i className="icon">📧</i> dharshan.tlda@gmail.com</p>
              <p><i className="icon">📱</i> +91 9941700784</p>
              <div className="contact-social">
                <a href='https://github.com/DharshanThiyagarajan'><img src="/github.png" alt="GitHub" /></a>
                <a href='https://x.com/dharsh_shan'><img src="/twitter.png" alt="Twitter" /></a>
                <a href='https://www.linkedin.com/'><img src="/linkedin.png" alt="LinkedIn" /></a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </section>
        <Chatbot />
        <footer>
          <p>&copy; 2025 Dharshan Thiyagarajan. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}