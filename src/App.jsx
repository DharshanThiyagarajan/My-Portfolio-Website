import { useState, useEffect } from 'react'
import './App.css'
import SideMenu from './SideMenu'
import dharshPic from './assets/dharshh.jpg'
import Resume from './assets/Resume dharsh.pdf'
import Spline from '@splinetool/react-spline'

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
              <img className="profile-image" src={dharshPic} alt="Dharsh" />
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
            </div>
            <div className="spline-container">
            <Spline scene="/scene.splinecode" />
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
            <p>
              I am pursuing a Bachelor's degree in Electronics and Communication Engineering at M. Kumarasamy College
              of Engineering. I aim to work in a dynamic organization where I can apply my skills and grow professionally.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <h2>Education</h2>
          <div className="education-container">
            <div className="education-item">
              <h3>Bachelor's in ECE</h3>
              <p className="institution">M. Kumarasamy College of Engineering</p>
              <p className="duration">2021 - 2025</p>
              <p className="description">Specialized in Electronics and Communication Engineering</p>
            </div>
            <div className="divider"></div>
            <div className="education-item">
              <h3>Higher Secondary</h3>
              <p className="institution">ABC Matriculation School</p>
              <p className="duration">2019 - 2021</p>
              <p className="description">Computer Science with 95% aggregate</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2>My Projects</h2>
          <div className="projects-container">
            <div className="project-card">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250" alt="Heart Disease Prediction" />
              </div>
              <div className="project-details">
                <h3>Heart Disease Prediction</h3>
                <p>Machine learning model for early detection and diagnosis of cardiovascular conditions.</p>
                <div className="tech-stack">
                  <span>Python</span>
                  <span>TensorFlow</span>
                  <span>Flask</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250" alt="License Plate Recognition" />
              </div>
              <div className="project-details">
                <h3>License Plate Recognition</h3>
                <p>Enhanced image processing for accurate license plate recognition in various conditions.</p>
                <div className="tech-stack">
                  <span>Python</span>
                  <span>OpenCV</span>
                  <span>Tesseract OCR</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2>Technical Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Frontend</h3>
              <div className="skills-list">
                <img src="/html.png" alt="HTML" title="HTML5" />
                <img src="/css.png" alt="CSS" title="CSS3" />
                <img src="/js.png" alt="JavaScript" title="JavaScript" />
                <img src="/react.png" alt="React" title="React" />
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <div className="skills-list">
                <img src="/nodejs.png" alt="Node.js" title="Node.js" />
                <img src="/python.png" alt="Python" title="Python" />
              </div>
            </div>
            <div className="skill-category">
              <h3>Cloud & DevOps</h3>
              <div className="skills-list">
                <img src="/aws.png" alt="AWS" title="AWS" />
                <img src="/docker.png" alt="Docker" title="Docker" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
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

        <footer>
          <p>&copy; 2025 Dharshan Thiyagarajan. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}