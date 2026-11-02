"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import {
  ArrowUpRight,
  ArrowDown,
  Pause,
  Play,
  Plus,
  Minus,
  X,
  Menu,
  Check,
  Copy,
} from "lucide-react";

const OrbitScene = dynamic(
  () => import("./orbit-scene").then((m) => m.OrbitScene),
  { ssr: false },
);
const EMAIL = "info@polaris-enterprises.com";
const chapters = ["Origin", "Intelligence", "Software", "Commerce"];
const destinations = ["home", "intelligence", "software", "commerce"];
const systems = [
  {
    name: "Intelligence",
    label: "01 / THINK",
    title: "Make room for human ambition.",
    description:
      "Give repetitive work to a system built to handle it. We connect AI to the information and tools your team already uses.",
    items: [
      "AI assistants & agents",
      "Knowledge & document search",
      "Workflow automation",
    ],
    nodes: ["YOUR DATA", "AI AGENT", "YOUR TOOLS", "YOUR TEAM"],
    message:
      "An assistant that turns scattered information into a useful next step.",
    subject: "AI & automation",
  },
  {
    name: "Software",
    label: "02 / BUILD",
    title: "Your business. Your blueprint.",
    description:
      "From a first prototype to the tools your operations depend on. Purpose-built software shaped around how your business actually works.",
    items: [
      "Custom web applications",
      "Internal tools & dashboards",
      "APIs & system integrations",
    ],
    nodes: ["INTERFACE", "APPLICATION", "INTEGRATIONS", "YOUR TEAM"],
    message:
      "A connected workspace that gives your team a clearer view of the business.",
    subject: "Custom software",
  },
  {
    name: "Commerce",
    label: "03 / GROW",
    title: "A better journey, from first click.",
    description:
      "Online stores that bring your brand to life and connect the experience in front with the operations behind it.",
    items: [
      "Online store development",
      "Custom shopping experiences",
      "Commerce workflow integrations",
    ],
    nodes: ["STOREFRONT", "CHECKOUT", "OPERATIONS", "CUSTOMER"],
    message:
      "A storefront connected to the systems that keep every order moving.",
    subject: "Digital commerce",
  },
];
export function NorthStar({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 1.5 23.7 15.3 38.5 20 23.7 23.7 20 38.5 16.3 23.7 1.5 20 16.3 15.3Z"
        fill="currentColor"
      />
      <path
        d="m7 7 10 6M33 7l-6 10M33 33l-10-6M7 33l6-10"
        stroke="currentColor"
      />
    </svg>
  );
}
function OrbitLab({ selected }: { selected: number }) {
  return (
    <div
      className={`lab-visual lab-mode-${selected}`}
      aria-label={`Illustration of ${systems[selected].name.toLowerCase()} connecting four parts of a business`}
    >
      <div className="lab-topline">
        <span>
          <i /> SYSTEM EXPLORER
        </span>
        <span>INTERACTIVE CONCEPT</span>
      </div>
      <div className="lab-orbits" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <svg
        className="lab-connections"
        viewBox="0 0 600 400"
        fill="none"
        aria-hidden="true"
      >
        <path d="M90 90Q300 50 300 200T510 310M510 90Q300 50 300 200T90 310M90 90Q40 310 90 310M510 90Q560 310 510 310" />
        <path
          className="signal"
          d="M90 90Q300 50 300 200T510 310M510 90Q300 50 300 200T90 310"
        />
      </svg>
      <div className="lab-center">
        <NorthStar />
        <span>POLARIS</span>
      </div>
      {systems[selected].nodes.map((node, i) => (
        <div key={`${selected}-${i}`} className={`lab-node node-${i}`}>
          <span className="node-symbol">{["✳", "◇", "⌘", "◎"][i]}</span>
          <span>{node}</span>
        </div>
      ))}
      <div className="lab-bottom">
        <span className="status-dot" />
        <span>{systems[selected].message}</span>
      </div>
    </div>
  );
}
export function PolarisExperience() {
  const [paused, setPaused] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [inJourney, setInJourney] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [interest, setInterest] = useState("AI & automation");
  const [copied, setCopied] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPaused(media.matches);
    apply();
    media.addEventListener("change", apply);
    let queued = false;
    const update = () => {
      const rect = document.getElementById("journey")?.getBoundingClientRect();
      if (rect) {
        setChapter(
          Math.min(
            3,
            Math.max(0, Math.floor(-rect.top / (rect.height / 4) + 0.42)),
          ),
        );
        setInJourney(rect.bottom > window.innerHeight * 0.8);
      }
      queued = false;
    };
    const scroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", scroll);
      media.removeEventListener("change", apply);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (contactOpen) {
      dialogRef.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    dialogRef.current?.close();
  }, [contactOpen]);
  const openContact = (topic?: string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    if (topic) setInterest(topic);
    setEmailOpened(false);
    setContactOpen(true);
    setMenuOpen(false);
  };
  const closeContact = () => {
    dialogRef.current?.close();
    setContactOpen(false);
    triggerRef.current?.focus();
  };
  const emailProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hi Polaris,\n\nMy name is ${data.get("name")}.\nI'm interested in: ${interest}.\n\n${data.get("project")}\n\nReply to: ${data.get("email")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Let's talk: ${interest}`)}&body=${encodeURIComponent(body)}`;
    setEmailOpened(true);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  const faqs = [
    [
      "What can we build together?",
      "AI assistants, automated workflows, custom web applications, internal tools and online stores. We start with the business problem, then decide which combination of technology will serve it best.",
    ],
    [
      "Do I need to know exactly what I want?",
      "No. Bring us the challenge, the repetitive process or the idea. We can help turn that into a clear scope and a practical first version.",
    ],
    [
      "Can you work with our existing tools?",
      "Yes. We assess your current systems, the integrations they support and how your team uses them before proposing a solution.",
    ],
    [
      "How does a project start?",
      "Start with a short introduction. We discuss your goals, constraints and existing setup, then agree on scope, timing and costs before development begins.",
    ],
  ];
  return (
    <div className={`polaris-site ${paused ? "motion-paused" : ""}`}>
      <a className="skip-link" href="#capabilities">
        Skip animation and explore services
      </a>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Polaris home">
          <NorthStar />
          <span>
            polaris<span className="brand-period">.</span>
          </span>
        </a>
        <nav
          aria-label="Main navigation"
          className={menuOpen ? "navigation is-open" : "navigation"}
        >
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>
            What we do
          </a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>
            Our approach
          </a>
          <button className="nav-contact" onClick={() => openContact()}>
            Let’s talk <ArrowUpRight size={16} />
          </button>
        </nav>
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <div className="journey" id="journey">
          <div className="scene-sticky" aria-hidden="true">
            <div className={`scene-fallback ${sceneReady ? "is-ready" : ""}`}>
              <div />
              <span />
            </div>
            <OrbitScene paused={paused} onReady={setSceneReady} />
            <div className="scene-vignette" />
            <div className="scene-coordinate top-coordinate">
              P / {String(chapter + 1).padStart(2, "0")}
              <span>BOUNDLESS BY DESIGN</span>
            </div>
            <div className={`scene-caption stage-${chapter}`} key={chapter}>
              <span className="crosshair">+</span>
              <span>
                {
                  [
                    "THE ORIGIN OF WHAT’S NEXT",
                    "CONNECTED INTELLIGENCE",
                    "IDEAS BECOME SYSTEMS",
                    "EXPERIENCES THAT CONNECT",
                  ][chapter]
                }
                <small>
                  {
                    [
                      "One idea. Infinite directions.",
                      "Knowledge → Reasoning → Action",
                      "Interface / Logic / Integration",
                      "Discover → Connect → Convert",
                    ][chapter]
                  }
                </small>
              </span>
            </div>
            <span className="vertical-caption">
              POLARIS — APPLIED INTELLIGENCE STUDIO
            </span>
          </div>
          <section
            className="chapter hero"
            id="home"
            aria-labelledby="hero-heading"
          >
            <div className="chapter-copy">
              <p className="eyebrow">
                <span className="status-dot" /> HUMAN AMBITION. MEET MACHINE
                INTELLIGENCE.
              </p>
              <h1 id="hero-heading">
                A new <em>orbit.</em>
                <br />
                For your
                <br />
                business.
              </h1>
              <p className="hero-description">
                We build AI, software and digital experiences
                <br className="desktop-break" /> that move your business into
                what’s next.
              </p>
              <a className="round-link" href="#intelligence">
                <span className="arrow-circle">
                  <ArrowDown size={18} />
                </span>
                Explore the possibilities
              </a>
            </div>
            <div className="hero-footnote">
              <span>
                INDEPENDENT THINKING.
                <br />
                CONNECTED POSSIBILITIES.
              </span>
              <span>
                SCROLL TO ENTER THE ORBIT <ArrowDown size={13} />
              </span>
            </div>
          </section>
          <section
            className="chapter"
            id="intelligence"
            aria-labelledby="intelligence-heading"
          >
            <div className="chapter-copy">
              <p className="eyebrow">
                <span className="chapter-number">01</span> APPLIED ARTIFICIAL
                INTELLIGENCE
              </p>
              <h2 id="intelligence-heading">
                Less busywork.
                <br />
                <em>More possibility.</em>
              </h2>
              <p>
                What if your systems could do more of the thinking? We build AI
                that connects your knowledge, takes on repetitive work and gives
                your people room to move.
              </p>
              <div className="chapter-tags">
                <span>AI agents</span>
                <span>Automation</span>
                <span>Connected knowledge</span>
              </div>
              <button
                className="text-link"
                onClick={() => openContact("AI & automation")}
              >
                Put intelligence to work <ArrowUpRight size={18} />
              </button>
            </div>
          </section>
          <section
            className="chapter"
            id="software"
            aria-labelledby="software-heading"
          >
            <div className="chapter-copy">
              <p className="eyebrow">
                <span className="chapter-number">02</span> PURPOSE-BUILT
                SOFTWARE
              </p>
              <h2 id="software-heading">
                Your vision.
                <br />
                <em>Taking shape.</em>
              </h2>
              <p>
                Good software feels like it was made for you. Because it was. We
                turn complex processes into clear, connected tools your business
                can build on.
              </p>
              <div className="chapter-tags">
                <span>Web applications</span>
                <span>Internal tools</span>
                <span>Integrations</span>
              </div>
              <button
                className="text-link"
                onClick={() => openContact("Custom software")}
              >
                Build something that fits <ArrowUpRight size={18} />
              </button>
            </div>
          </section>
          <section
            className="chapter"
            id="commerce"
            aria-labelledby="commerce-heading"
          >
            <div className="chapter-copy">
              <p className="eyebrow">
                <span className="chapter-number">03</span> DIGITAL COMMERCE
              </p>
              <h2 id="commerce-heading">
                More than
                <br />
                <em>a storefront.</em>
              </h2>
              <p>
                A brand people feel. A store they can explore. An operation that
                connects behind the scenes. We bring every part of your online
                business into the same orbit.
              </p>
              <div className="chapter-tags">
                <span>Online stores</span>
                <span>Customer experience</span>
                <span>Commerce systems</span>
              </div>
              <button
                className="text-link"
                onClick={() => openContact("Digital commerce")}
              >
                Create your next storefront <ArrowUpRight size={18} />
              </button>
            </div>
          </section>
        </div>
        <div className={`journey-controls ${inJourney ? "" : "is-hidden"}`}>
          <div className="chapter-nav" aria-label="Animation chapters">
            {chapters.map((name, i) => (
              <a
                key={name}
                href={`#${destinations[i]}`}
                className={chapter === i ? "active" : ""}
                aria-current={chapter === i ? "step" : undefined}
              >
                <span>0{i + 1}</span>
                <span>{name}</span>
              </a>
            ))}
          </div>
          <button
            className="motion-toggle"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Resume animation" : "Pause animation"}
            aria-pressed={paused}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            <span>{paused ? "RESUME" : "PAUSE"}</span>
          </button>
        </div>
        <section className="manifesto section-wrap" id="about">
          <p className="eyebrow" data-reveal>
            <NorthStar /> THE POLARIS PERSPECTIVE
          </p>
          <h2 data-reveal>
            Technology is a universe
            <br />
            of possibilities.
            <br />
            <span>We help you find</span> <em>your direction.</em>
          </h2>
          <div className="manifesto-bottom" data-reveal>
            <span className="tiny-label">
              ONE PARTNER. A CONNECTED PERSPECTIVE.
            </span>
            <p>
              Polaris brings artificial intelligence, software development and
              digital commerce together. Thoughtful technology, built around
              real people and the businesses they want to create.
            </p>
          </div>
        </section>
        <section className="capabilities section-wrap" id="capabilities">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">THE POSSIBILITIES</p>
              <h2>
                Different worlds.
                <br />
                <em>One connected vision.</em>
              </h2>
            </div>
            <p>
              Explore what we can
              <br />
              build around your business.
            </p>
          </div>
          <div
            className="service-tabs"
            role="tablist"
            aria-label="Explore our services"
          >
            {systems.map((system, i) => (
              <button
                id={`service-tab-${i}`}
                role="tab"
                aria-selected={selected === i}
                aria-controls="service-panel"
                tabIndex={selected === i ? 0 : -1}
                key={system.name}
                onClick={() => setSelected(i)}
                onKeyDown={(event) => {
                  if (
                    ["ArrowRight", "ArrowLeft", "Home", "End"].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : (i + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                    setSelected(next);
                    document.getElementById(`service-tab-${next}`)?.focus();
                  }
                }}
              >
                <span>0{i + 1}</span>
                {system.name}
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div
            className="service-panel"
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${selected}`}
          >
            <div className="service-copy" key={selected}>
              <span className="tiny-label">{systems[selected].label}</span>
              <h3>{systems[selected].title}</h3>
              <p>{systems[selected].description}</p>
              <ul>
                {systems[selected].items.map((item) => (
                  <li key={item}>
                    <span />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className="text-link"
                onClick={() => openContact(systems[selected].subject)}
              >
                Explore your project <ArrowUpRight size={18} />
              </button>
            </div>
            <OrbitLab selected={selected} />
          </div>
        </section>
        <section className="approach section-wrap" id="approach">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">FROM FIRST SPARK TO WHAT’S NEXT</p>
              <h2>
                Ambitious ideas.
                <br />
                <em>Grounded execution.</em>
              </h2>
            </div>
            <p>
              A clear path through
              <br />a world of possibilities.
            </p>
          </div>
          <div className="process">
            {[
              [
                "01",
                "Find the signal.",
                "We listen first. Your goals, your bottlenecks, your people. Together, we find where technology can make a meaningful difference.",
              ],
              [
                "02",
                "Make it real.",
                "A clear plan becomes something you can see, use and improve. We design and build in focused steps, with you in the loop.",
              ],
              [
                "03",
                "Keep moving.",
                "We test, refine and prepare for launch. Then we help you understand the system and plan its next evolution.",
              ],
            ].map(([number, title, text]) => (
              <article className="process-step" key={number} data-reveal>
                <div className="process-line">
                  <span>{number}</span>
                  <NorthStar />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="faq section-wrap">
          <div data-reveal>
            <p className="eyebrow">A LITTLE CLARITY</p>
            <h2>
              Before
              <br />
              <em>we take off.</em>
            </h2>
          </div>
          <div className="faq-items">
            {faqs.map(([question, answer], i) => (
              <div className="faq-item" key={question}>
                <h3>
                  <button
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {question}
                    {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={openFaq !== i}>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="contact-section section-wrap" id="contact">
          <div className="contact-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="contact-content" data-reveal>
            <p className="eyebrow">
              <span className="status-dot" /> EVERY GREAT THING STARTS WITH A
              CONVERSATION
            </p>
            <h2>
              What’s your
              <br />
              <em>next possibility?</em>
            </h2>
            <button className="contact-button" onClick={() => openContact()}>
              Let’s build it together <ArrowUpRight size={24} />
            </button>
            <a className="contact-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <div className="footer-top">
          <a href="#home" className="brand" aria-label="Polaris home">
            <NorthStar />
            <span>polaris.</span>
          </a>
          <p>
            Human ambition.
            <br />
            Intelligent possibilities.
          </p>
          <a href="#home" className="back-top">
            BACK TO TOP <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Polaris Enterprises Group LLC</span>
          <span>30 N Gould St, Ste R, Sheridan, WY 82801, USA</span>
          <span>AI · SOFTWARE · COMMERCE</span>
        </div>
      </footer>
      <dialog
        ref={dialogRef}
        aria-label="Start a project with Polaris"
        className="contact-dialog"
        onCancel={closeContact}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeContact();
        }}
      >
        <div className="dialog-inner">
          <button
            className="dialog-close"
            aria-label="Close project enquiry"
            onClick={closeContact}
          >
            <X size={22} />
          </button>
          <p className="eyebrow">A NEW POSSIBILITY</p>
          <h2>
            Tell us what
            <br />
            <em>you have in mind.</em>
          </h2>
          <form onSubmit={emailProject}>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Alex Morgan"
                  maxLength={100}
                />
              </label>
              <label>
                Your email
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  maxLength={200}
                />
              </label>
            </div>
            <label>
              I’m interested in
              <select
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
              >
                <option>AI & automation</option>
                <option>Custom software</option>
                <option>Digital commerce</option>
                <option>Let’s explore together</option>
              </select>
            </label>
            <label>
              A little about your idea
              <textarea
                name="project"
                required
                rows={3}
                maxLength={3000}
                placeholder="The idea, the challenge, or the thing you wish worked better…"
              />
            </label>
            <button className="contact-button" type="submit">
              Open email with my project <ArrowUpRight size={19} />
            </button>
            <p className="form-note" role="status">
              {emailOpened
                ? "Your email draft is ready in your email app. Review it and press send there. If no app opened, email us directly below."
                : "This opens a draft in your email app. You review and send it from there."}
            </p>
          </form>
          <div className="dialog-direct">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button onClick={copyEmail} aria-label="Copy email address">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
