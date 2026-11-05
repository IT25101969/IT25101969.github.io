import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, BarChart3, Code2,
  Database, Github, Linkedin, Mail, MapPin, Menu, X,
} from 'lucide-react'
import { portfolio } from './data'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, aside }: { eyebrow: string; title: string; aside?: string }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {aside && <p className="section-aside">{aside}</p>}
    </div>
  )
}

function HeroGraphic() {
  return (
    <div className="hero-graphic" aria-hidden="true">
      <div className="graphic-orbit orbit-one" />
      <div className="graphic-orbit orbit-two" />
      <div className="graphic-glow" />
      <div className="visual-card visual-card-main">
        <div className="visual-card-top"><span className="window-dots"><i /><i /><i /></span><span>explore / analyze / build</span></div>
        <div className="visual-card-body">
          <div className="chart-label"><span className="pulse-dot" /> SIGNAL / 001</div>
          <svg className="data-chart" viewBox="0 0 440 225" role="img" aria-label="Abstract data analysis line chart">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#58d9ee" stopOpacity=".25" /><stop offset="100%" stopColor="#58d9ee" stopOpacity="0" /></linearGradient>
              <linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3583b7" /><stop offset="100%" stopColor="#85f1ef" /></linearGradient>
            </defs>
            <path className="chart-grid" d="M0 40H440 M0 90H440 M0 140H440 M0 190H440 M44 0V225 M132 0V225 M220 0V225 M308 0V225 M396 0V225" />
            <path d="M0 183 C29 177 44 184 68 159 S102 124 130 142 S174 174 204 134 S245 111 268 121 S307 73 335 95 S378 64 440 39 L440 225 L0 225Z" fill="url(#area)" />
            <path d="M0 183 C29 177 44 184 68 159 S102 124 130 142 S174 174 204 134 S245 111 268 121 S307 73 335 95 S378 64 440 39" fill="none" stroke="url(#line)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="335" cy="95" r="6" fill="#081522" stroke="#80e9e9" strokeWidth="3" />
            <circle cx="440" cy="39" r="5" fill="#8cefeb" />
          </svg>
          <div className="chart-footer"><span>DATA → INSIGHT</span><span>01 / 03</span></div>
        </div>
      </div>
      <div className="visual-card visual-card-float"><span className="small-square"><Database size={20} /></span><span>Curiosity<br /><strong>in practice.</strong></span><ArrowUpRight size={17} /></div>
      <div className="graphic-caption">A thoughtful approach to data &amp; development <span>↗</span></div>
    </div>
  )
}

function ProjectVisual({ type }: { type: string }) {
  if (type === 'fashion') {
    return <div className="project-visual visual-fashion" aria-hidden="true"><div className="fashion-grid">{Array.from({ length: 36 }, (_, index) => <span key={index} style={{ opacity: 0.12 + ((index * 17) % 11) / 13 }} />)}</div><div className="visual-readout"><span>DATASET / 01</span><strong>28 × 28</strong><small>FEATURE SPACE</small></div><div className="visual-cross">+</div></div>
  }
  if (type === 'fitness') {
    return <div className="project-visual visual-fitness" aria-hidden="true"><div className="fitness-rings"><span /><span /><span /></div><div className="fitness-panel"><span className="micro-label">MEMBERSHIP / SYSTEM</span><div className="fitness-bars"><i /><i /><i /><i /><i /><i /><i /></div><span className="micro-label">JAVA · SPRING BOOT</span></div></div>
  }
  return <div className="project-visual visual-helpdesk" aria-hidden="true"><div className="desk-lines"><span /><span /><span /></div><div className="desk-card"><div><span className="status-dot" /> STUDENT SUPPORT</div><span className="desk-bar long" /><span className="desk-bar" /><span className="desk-bar short" /><div className="desk-card-footer"><i /><i /><i /></div></div><div className="desk-chip">TICKET / 003</div></div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <nav className="nav-wrap container" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Sachin Jayathilaka, back to top">{portfolio.initials}</a>
          <div className="desktop-nav">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
          <a className="nav-contact" href={`mailto:${portfolio.email}`}>Let's connect <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </nav>
        {menuOpen && <div id="mobile-menu" className="mobile-nav"><div className="container">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16} /></a>)}<a href={`mailto:${portfolio.email}`} onClick={() => setMenuOpen(false)}>Let's connect<ArrowUpRight size={16} /></a></div></div>}
      </header>

      <main id="main">
        <section id="top" className="hero section-grid">
          <div className="hero-noise" />
          <div className="container hero-inner">
            <Reveal className="hero-copy">
              <div className="availability"><span className="availability-dot" /> OPEN TO INTERNSHIP OPPORTUNITIES</div>
              <p className="hero-kicker">Hello, I'm Sachin Jayathilaka <span className="wave">✳</span></p>
              <h1>Making sense<br />of data. <em>Building</em><br /><span>what matters.</span></h1>
              <p className="hero-description">{portfolio.role} with a curiosity for practical problems, clear insights, and useful software.</p>
              <div className="hero-actions"><a className="button button-primary" href="#projects">Explore projects <ArrowUpRight size={18} /></a><a className="button button-text" href="#about">More about me <ArrowDown size={17} /></a>{portfolio.resumeUrl && <a className="button button-text" href={portfolio.resumeUrl} download>Download CV <ArrowDown size={17} /></a>}</div>
              <div className="hero-meta"><span><MapPin size={16} /> {portfolio.location}</span><span className="meta-divider" /><span>DATA · SOFTWARE · SYSTEMS</span></div>
            </Reveal>
            <Reveal className="hero-visual-wrap" delay={0.15}><HeroGraphic /></Reveal>
          </div>
          <div className="hero-bottom container"><span>SCROLL TO EXPLORE</span><span className="hero-bottom-line" /><span>01 — INTRODUCTION</span></div>
        </section>

        <section id="about" className="section section-about">
          <div className="container about-layout">
            <Reveal><span className="eyebrow"><span className="eyebrow-line" />01 / ABOUT ME</span><h2 className="about-headline">A curious mind at the intersection of <span>data and technology.</span></h2></Reveal>
            <Reveal className="about-right" delay={0.1}><p className="about-lead">{portfolio.summary}</p><p>{portfolio.interests}</p><div className="about-facts"><div><span>BASED IN</span><strong>{portfolio.location}</strong></div><div><span>CURRENT FOCUS</span><strong>Learning, building &amp; growing</strong></div></div></Reveal>
          </div>
        </section>

        <section id="skills" className="section section-skills">
          <div className="container">
            <Reveal><SectionHeading eyebrow="02 / CAPABILITIES" title="Tools of the trade." aside="A growing toolkit shaped by coursework, hands-on projects, and a habit of learning by doing." /></Reveal>
            <div className="skills-grid">{portfolio.skills.map((group, index) => {
              const Icon = [BarChart3, Code2, Database][index]
              return <Reveal key={group.category} delay={index * 0.08}><article className="skill-card"><div className="skill-icon"><Icon size={24} strokeWidth={1.6} /></div><div className="skill-number">0{index + 1} / 03</div><h3>{group.category}</h3><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article></Reveal>
            })}</div>
          </div>
        </section>

        <section id="projects" className="section section-projects">
          <div className="container">
            <Reveal><SectionHeading eyebrow="03 / SELECTED WORK" title="Projects in focus." aside="A few ways I have applied analysis and development in academic work." /></Reveal>
            <div className="projects-grid">{portfolio.projects.map((project, index) => <Reveal key={project.number} delay={index * 0.07}><article className="project-card"><ProjectVisual type={project.visual} /><div className="project-content"><div className="project-topline"><span>{project.category}</span><span>{project.number} / 03</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-bottom">{project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>View repository <ArrowUpRight size={17} /></a> : <span className="project-no-link">Academic project · Repository unavailable</span>}</div></div></article></Reveal>)}</div>
            <Reveal className="projects-more"><a href={portfolio.github} target="_blank" rel="noopener noreferrer">Explore more on GitHub <ArrowUpRight size={18} /></a></Reveal>
          </div>
        </section>

        <section id="education" className="section section-education">
          <div className="container education-layout">
            <Reveal className="education-intro"><SectionHeading eyebrow="04 / LEARNING PATH" title="Built on curiosity." /><p>Two complementary paths in analytics and information technology, grounded in a commitment to keep learning.</p><div className="education-deco" aria-hidden="true"><span>LEARN</span><ArrowRight size={24} /><span>APPLY</span><ArrowRight size={24} /><span>GROW</span></div></Reveal>
            <div className="timeline">{portfolio.education.map((item, index) => <Reveal key={item.school} delay={index * 0.08}><article className="timeline-item"><div className="timeline-marker" /><div className="timeline-body"><div className="timeline-head"><span>0{index + 1}</span><span>{item.years}{item.expected && ' · EXPECTED'}</span></div><h3>{item.school}</h3>{item.detail && <p className="timeline-detail">{item.detail}</p>}<p className="timeline-degree">{item.degree}</p></div></article></Reveal>)}</div>
          </div>
        </section>

        <section className="section section-beyond" aria-labelledby="beyond-title"><div className="container beyond-layout"><Reveal><span className="eyebrow"><span className="eyebrow-line" />05 / BEYOND THE SCREEN</span><h2 id="beyond-title">Discipline in every arena.</h2><p>Outside technology, boxing taught me focus, resilience, and the value of showing up consistently.</p></Reveal><Reveal className="award-card" delay={0.1}><span className="award-icon"><Award size={28} strokeWidth={1.5} /></span><div><span className="award-label">ACHIEVEMENT / 2018</span><h3>{portfolio.achievement.title}</h3><span className="award-year">{portfolio.achievement.year}</span></div><span className="award-arrow">↗</span></Reveal></div></section>

        <section id="contact" className="section section-contact"><div className="container contact-layout"><Reveal><span className="eyebrow"><span className="eyebrow-line" />06 / GET IN TOUCH</span><h2>Have an opportunity<br />in mind? <em>Let's talk.</em></h2><p>I'm interested in internship opportunities where I can contribute, learn from experienced teams, and work on real problems.</p><a className="button button-primary contact-button" href={`mailto:${portfolio.email}`}>Send me an email <ArrowUpRight size={18} /></a></Reveal><Reveal className="contact-details" delay={0.12}><div className="contact-detail"><span className="detail-icon"><Mail size={19} /></span><div><span>EMAIL</span><a href={`mailto:${portfolio.email}`}>{portfolio.email}</a></div><ArrowUpRight size={18} /></div><div className="contact-detail"><span className="detail-icon"><Linkedin size={19} /></span><div><span>LINKEDIN</span><a href={portfolio.linkedIn} target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a></div><ArrowUpRight size={18} /></div><div className="contact-detail"><span className="detail-icon"><Github size={19} /></span><div><span>GITHUB</span><a href={portfolio.github} target="_blank" rel="noopener noreferrer">Explore my code</a></div><ArrowUpRight size={18} /></div><div className="languages"><span>LANGUAGES</span><strong>{portfolio.languages.join(' · ')}</strong></div></Reveal></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#top" aria-label="Back to top">{portfolio.initials}</a><p>© {new Date().getFullYear()} {portfolio.name}. Built with care in Sri Lanka.</p><a href="#top" className="back-top">Back to top ↑</a></div></footer>
    </>
  )
}

export default App
