import { useState, useEffect, useRef } from 'react'
import logo from './assets/520logo.png'
import heroImg from './assets/hero.jpg'
import teagueImg from './assets/jteague.png'
import wellsImg from './assets/djwells.png'
import hennImg from './assets/bhenn.png'
import shirtImg from './assets/shirt.png'
import hoodieImg from './assets/hoodie.png'
import hatImg from './assets/hat.png'
import adidasLogo from './assets/adidas.png'
import boostLogo from './assets/boost.png'
import doordashLogo from './assets/doordash.png'
import gldLogo from './assets/gld.webp'
import hardRockLogo from './assets/hard rock bet .svg'
import volumeLogo from './assets/volume.png'
import './App.css'

const CHANNEL_ID = 'UCoA3lm9UTWDWK8Z1kcoWQcA'
const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`)}`

const LINKS = {
  youtube: 'https://www.youtube.com/@club520podcast',
  instagram: 'https://www.instagram.com/club520podcast',
  facebook: 'https://www.facebook.com/p/Club-520-Podcast-61550677286196/',
  tiktok: 'https://www.tiktok.com/@club520podcast',
  twitter: 'https://x.com/club520podcast',
  spotify: 'https://open.spotify.com/show/7ez8SsDDKbf0q5vaH2ulJf',
  patreon: 'https://www.patreon.com/Club520',
  apple: 'https://podcasts.apple.com/us/podcast/club-520-podcast/id1397682720',
  merch: 'https://shopclub520.com/',
  adidas: 'https://news.adidas.com/basketball/adidas-basketball-announces-partnership-with-club-520/s/58ef9a2f-f6ff-448d-bde2-1c195c1e843d',
}

const HOSTS = [
  { name: 'Jeff Teague', role: 'Host & NBA Veteran', img: teagueImg, instagram: 'https://www.instagram.com/jeffteague/', igHandle: '@jeffteague', bio: 'Former NBA All-Star point guard, 12 seasons in the league. The heart of the show — self-deprecating, hilarious, and holding nothing back about life in the NBA.', color: '#FF5200' },
  { name: 'DJ Wells', role: 'Co-Host', img: wellsImg, instagram: 'https://www.instagram.com/thatsanopiniondj/', igHandle: '@thatsanopiniondj', bio: "Teague's childhood best friend and the perfect comedic foil. Sharp cultural commentary, high energy, and unfiltered takes that keep the internet talking.", color: '#FF8C00' },
  { name: 'B Hen', role: 'Co-Host & Sports Betting', img: hennImg, instagram: 'https://www.instagram.com/outthepearlys/', igHandle: '@outthepearlys', bio: 'The grounded everyday-fan voice the crew needs. Owns the sports betting segments and plays willing target of whatever the squad dishes out.', color: '#FFAA00' },
]

const GUESTS = [
  { category: 'NBA Legends & Players', color: '#FF5200', names: ['Jayson Tatum', 'Gary Payton', 'Matt Barnes', 'Spencer Dinwiddie', 'James Johnson', 'Gary Harris', 'Shelvin Mack', 'Lou Williams'] },
  { category: 'Hip-Hop & Music', color: '#FF8C00', names: ['Fat Joe', 'Kenny "Babyface" Edmonds', 'Bow Wow', 'Starlito', 'Belly Gang Kushington', 'Gillie Da King', 'Murda Beatz'] },
  { category: 'Comedians & Media', color: '#FFAA00', names: ['Colin Cowherd', 'Bill Bellamy', 'Ryan Clark', 'Bubba Dub'] },
  { category: 'Sports & Entertainment', color: '#FF6800', names: ['Adam Silver', 'Dana White', 'Mark Cuban', 'Angelo Dawkins', 'Jacob Fatu', 'Zaire Franklin'] },
]

const SPONSORS = [
  { name: 'Adidas', logo: adidasLogo, desc: 'Exclusive shoe & apparel partner', link: 'https://www.adidas.com/us', highlight: true },
  { name: 'Boost Mobile', logo: boostLogo, desc: 'Official wireless partner', link: 'https://www.boostmobile.com/' },
  { name: 'The Volume', logo: volumeLogo, desc: 'Podcast network home', link: 'https://www.thevolume.com/' },
  { name: 'DoorDash', logo: doordashLogo, desc: 'Official food delivery partner', link: 'https://www.doordash.com/' },
  { name: 'GLD', logo: gldLogo, desc: 'Jewelry partner', link: 'https://www.gld.com/' },
  { name: 'Hard Rock Bet', logo: hardRockLogo, desc: 'Sports betting partner', link: 'https://www.hardrock.bet/' },
]

const MARQUEE_ITEMS = ['NO SCRIPTS', 'NO FILTERS', 'JUST BALL', 'OUT THE GATE', 'HOW YOU WHAT', "WE DON'T RUN", 'CLUB 520', 'THE COUCH', 'THE CULTURE', 'THE SHOW', 'UNFILTERED', 'THE VOLUME']

const EVENTS = [
  { title: '520 Field Day', type: 'Annual Community Event', icon: '🏟', desc: 'The biggest annual outdoor event in Club 520 history — fan competitions, celebrity appearances, and culture all day long.' },
  { title: 'Live Pop-Up Shows', type: 'Live Taping', icon: '🎙', desc: 'Club 520 hits the road with surprise live tapings and pop-up episodes bringing the energy directly to the fans.' },
  { title: 'Fan Activations', type: 'Fan Experience', icon: '🏀', desc: "Meet the crew, exclusive merch drops, and fan experiences at some of the culture's biggest moments." },
]

const MERCH_CATS = [
  { name: 'Tees & Tops', desc: 'Club 520 graphic tees and statement tops', tag: 'Best Sellers', img: shirtImg },
  { name: 'Hoodies', desc: 'Premium fleece and pullover hoodies', tag: 'Fan Favorite', img: hoodieImg },
  { name: 'Hats & Accessories', desc: 'Caps, chains, and Club 520 accessories', tag: 'New Drops', img: hatImg },
]

const GALLERY = [
  { img: heroImg, label: 'The Crew', span: 'wide' },
  { img: teagueImg, label: 'Jeff Teague' },
  { img: wellsImg, label: 'DJ Wells' },
  { img: hennImg, label: 'B Hen' },
]

// ─── HOOKS ─────────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.12) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}

function useCountUp(end, active, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active || !end) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const timer = setInterval(() => {
      frame++
      setCount(Math.round(end * Math.min(frame / totalFrames, 1)))
      if (frame >= totalFrames) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [active, end, duration])
  return count
}

// ─── BASE COMPONENTS ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal${visible ? ' revealed' : ''}${className ? ` ${className}` : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function SplitTitle({ children, center = false, delay = 0 }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const words = typeof children === 'string' ? children.split(' ') : null
  return (
    <h2 ref={ref} className={`section-title${center ? ' center' : ''}`} style={{ overflow: 'hidden' }}>
      {words ? words.map((word, i) => (
        <span key={i} className={`split-word${visible ? ' split-word-in' : ''}`} style={{ transitionDelay: `${delay + i * 70}ms` }}>
          {word}{i < words.length - 1 ? ' ' : ''}
        </span>
      )) : children}
    </h2>
  )
}

function MarqueeTicker() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">{item}<span className="marquee-dot"> ·</span></span>
        ))}
      </div>
    </div>
  )
}

function Lightbox({ videoId, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
        <iframe className="lightbox-iframe" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title="Club 520 Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
    </div>
  )
}

// ─── LOADING SCREEN ────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [fading, setFading] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1800)
    const t2 = setTimeout(onDone, 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])
  return (
    <div className={`loading-screen${fading ? ' loading-out' : ''}`}>
      <img src={logo} alt="Club 520" className="loading-logo" />
    </div>
  )
}

// ─── CUSTOM CURSOR ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  const target = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  useEffect(() => {
    const move = e => {
      target.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`
    }
    let rafId
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      if (ringRef.current) ringRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    window.addEventListener('mousemove', move, { passive: true })
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(rafId) }
  }, [])
  return (
    <>
      <div ref={dotRef} className="cursor-ball-wrap"><span className="cursor-ball">🏀</span></div>
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

// ─── SCROLL PROGRESS ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div className="scroll-progress">
      <div className="scroll-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  )
}

// ─── LIVE BADGE ───────────────────────────────────────────────────────────────
function LiveBadge() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    fetch(RSS_URL)
      .then(r => r.json())
      .then(d => {
        if (d.items?.length) {
          const hours = (Date.now() - new Date(d.items[0].pubDate)) / 3600000
          setShow(hours < 48)
        }
      })
      .catch(() => {})
  }, [])
  if (!show) return null
  return <span className="live-badge"><span className="live-dot" />NEW EP</span>
}

// ─── PODCAST PLAYER ───────────────────────────────────────────────────────────
function PodcastPlayer() {
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)
  if (gone) return null
  return (
    <div className={`podcast-player${open ? ' podcast-open' : ''}`}>
      <div className="podcast-bar">
        <div className="podcast-bar-left">
          <SpotifyIcon size={18} />
          <span className="podcast-bar-label">Club 520 Podcast</span>
          <span className="podcast-bar-sub">Listen on Spotify</span>
        </div>
        <div className="podcast-bar-right">
          <button className="podcast-toggle" onClick={() => setOpen(o => !o)}>
            {open ? 'Collapse ↓' : 'Listen Now ↑'}
          </button>
          <button className="podcast-dismiss" onClick={() => setGone(true)} aria-label="Dismiss">✕</button>
        </div>
      </div>
      {open && (
        <iframe
          className="podcast-iframe"
          src="https://open.spotify.com/embed/show/7ez8SsDDKbf0q5vaH2ulJf?utm_source=generator&theme=0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
    </div>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [ready, setReady] = useState(false)
  return !ready ? <LoadingScreen onDone={() => setReady(true)} /> : (
    <div className="site">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <MarqueeTicker />
        <Brand />
        <Hosts />
        <YouTubeFeed />
        <Gallery />
        <Guests />
        <Events />
        <Sponsors />
        <MerchShowcase />
        <Newsletter />
        <Watch />
      </main>
      <Footer />
      <PodcastPlayer />
    </div>
  )
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#" className="nav-logo"><img src={logo} alt="Club 520" /></a>
        <LiveBadge />
        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li><a href="#hosts" onClick={() => setOpen(false)}>Hosts</a></li>
          <li><a href="#shows" onClick={() => setOpen(false)}>Shows</a></li>
          <li><a href="#guests" onClick={() => setOpen(false)}>Guests</a></li>
          <li><a href="#partners" onClick={() => setOpen(false)}>Partners</a></li>
          <li><a href={LINKS.merch} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Merch</a></li>
        </ul>
        <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-primary nav-cta">Watch Now</a>
        <button className="nav-mobile-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu"><HamburgerIcon open={open} /></button>
      </div>
    </nav>
  )
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const imgRef = useRef()
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) imgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section className="hero">
      <div className="hero-img-wrap">
        <img ref={imgRef} src={heroImg} alt="Club 520 Crew" className="hero-bg-img" />
        <div className="hero-overlay" />
      </div>
      <div className="hero-top">
        <img src={logo} alt="Club 520 Podcast" className="hero-logo" />
      </div>
      <div className="hero-bottom">
        <p className="hero-sub">
          Three guys who really know the game.{' '}
          <span className="hero-sub-accent">No scripts. No filters. Just ball.</span>
        </p>
        <div className="hero-ctas">
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><YoutubeIcon size={18} /> Watch on YouTube</a>
          <a href={LINKS.spotify} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><SpotifyIcon size={18} /> Listen on Spotify</a>
        </div>
        <div className="hero-social-row">
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon size={20} /></a>
          <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon size={20} /></a>
          <a href={LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X"><XIcon size={20} /></a>
          <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon size={20} /></a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">↓</div>
    </section>
  )
}

// ─── BRAND ─────────────────────────────────────────────────────────────────────
function StatCard({ value, suffix = '', display, label, active }) {
  const count = useCountUp(value, active)
  return (
    <div className="bstat">
      <span className="bstat-num text-gold">{display ?? `${count}${suffix}`}</span>
      <span className="bstat-label">{label}</span>
    </div>
  )
}

function Brand() {
  const ref = useRef()
  const inView = useInView(ref, 0.2)
  return (
    <section className="brand-statement">
      <div className="container">
        <div className="brand-statement-inner">
          <Reveal className="brand-statement-text-wrap">
            <div className="brand-statement-text">
              <p className="section-label">More Than a Podcast</p>
              <h2>
                Three guys who really<br />know the game —<br />
                <span className="text-gold">no scripts, no filters,</span><br />zero apologies.
              </h2>
              <p className="brand-body">
                What started as conversations <span className="text-gold">became a movement.</span>{' '}
                We built this for the ones who really know the game.
              </p>
            </div>
          </Reveal>
          <div className="brand-statement-stats" ref={ref}>
            <StatCard value={12} label="Years in the NBA" active={inView} />
            <StatCard display="1st" label="Podcast with Adidas deal" active={inView} />
            <StatCard display="∞" label="Unfiltered episodes" active={inView} />
            <StatCard value={1} suffix="×" label="NBA All-Star" active={inView} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HOSTS ─────────────────────────────────────────────────────────────────────
function Hosts() {
  return (
    <section className="hosts" id="hosts">
      <div className="container">
        <Reveal><p className="section-label center">The Crew</p></Reveal>
        <SplitTitle center>Meet the Hosts</SplitTitle>
        <div className="hosts-grid">
          {HOSTS.map((host, i) => (
            <Reveal key={host.name} delay={i * 120}>
              <div className="host-card" style={{ '--host-color': host.color }}>
                <div className="host-photo-wrap">
                  <img src={host.img} alt={host.name} className="host-photo" />
                </div>
                <div className="host-info">
                  <h3>{host.name}</h3>
                  <p className="host-role">{host.role}</p>
                  <p className="host-bio">{host.bio}</p>
                  <a href={host.instagram} target="_blank" rel="noopener noreferrer" className="host-ig-btn">
                    <InstagramIcon size={16} /> Follow {host.igHandle}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── YOUTUBE FEED ──────────────────────────────────────────────────────────────
function YouTubeFeed() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    fetch(RSS_URL)
      .then(r => r.json())
      .then(d => { if (d.items) setVideos(d.items.filter(v => !v.link.includes('/shorts/'))) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const scroll = dir => scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  const getVideoId = url => { const m = url.match(/[?&]v=([^&]+)/); return m ? m[1] : null }
  const featured = videos[0]
  const rest = videos.slice(1)

  return (
    <section className="yt-feed" id="shows">
      {activeVideo && <Lightbox videoId={activeVideo} onClose={() => setActiveVideo(null)} />}
      <div className="container">
        <Reveal><p className="section-label center">Latest Videos</p></Reveal>
        <SplitTitle center>Watch the Show</SplitTitle>
        <Reveal delay={160}>
          <div className="yt-feed-cta">
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><YoutubeIcon size={16} /> Visit Full Channel</a>
          </div>
        </Reveal>
        {featured && !loading && (
          <Reveal delay={200}>
            <div className="yt-featured" onClick={() => setActiveVideo(getVideoId(featured.link))}>
              <div className="yt-featured-thumb-wrap">
                <img src={`https://img.youtube.com/vi/${getVideoId(featured.link)}/maxresdefault.jpg`} alt={featured.title} className="yt-featured-thumb" />
                <div className="yt-featured-play"><span>▶</span></div>
                <span className="yt-featured-badge">Latest Episode</span>
              </div>
              <div className="yt-featured-info">
                <p className="yt-featured-label">Now Playing</p>
                <h3 className="yt-featured-title">{featured.title}</h3>
                <p className="yt-date">{new Date(featured.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
      <div className="yt-scroll-outer">
        <button onClick={() => scroll(-1)} aria-label="Scroll left" className="yt-arrow yt-arrow-left">‹</button>
        <div className="yt-scroll" ref={scrollRef}>
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div className="yt-card skeleton" key={i}>
              <div className="yt-thumb skeleton-img" />
              <div className="yt-card-body"><div className="skeleton-line" /><div className="skeleton-line short" /></div>
            </div>
          ))}
          {!loading && rest.map(video => {
            const id = getVideoId(video.link)
            if (!id) return null
            return (
              <div key={id} className="yt-card" onClick={() => setActiveVideo(id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setActiveVideo(id)}>
                <div className="yt-thumb-wrap">
                  <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={video.title} className="yt-thumb" loading="lazy" />
                  <div className="yt-play">▶</div>
                </div>
                <div className="yt-card-body">
                  <p className="yt-title">{video.title}</p>
                  <p className="yt-date">{new Date(video.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            )
          })}
        </div>
        <button onClick={() => scroll(1)} aria-label="Scroll right" className="yt-arrow yt-arrow-right">›</button>
      </div>
    </section>
  )
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section className="gallery">
      <div className="container">
        <Reveal><p className="section-label center">Behind the Scenes</p></Reveal>
        <SplitTitle center>The Culture</SplitTitle>
        <div className="gallery-grid">
          {GALLERY.map((item, i) => (
            <Reveal key={i} delay={i * 80} className={`gallery-item-wrap${item.span === 'wide' ? ' gallery-wide' : ''}`}>
              <div className="gallery-item">
                <img src={item.img} alt={item.label} className="gallery-img" loading="lazy" />
                <div className="gallery-label">{item.label}</div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={320} className="gallery-item-wrap">
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="gallery-item gallery-more">
              <InstagramIcon size={32} />
              <span>More on Instagram</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── GUESTS ────────────────────────────────────────────────────────────────────
function Guests() {
  return (
    <section className="guests" id="guests">
      <div className="container">
        <Reveal><p className="section-label center">Who's Pulled Up</p></Reveal>
        <SplitTitle center>Notable Guests</SplitTitle>
        <div className="guests-grid">
          {GUESTS.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 100}>
              <div className="guest-cat" style={{ '--cat-color': cat.color }}>
                <h3 className="guest-cat-title">{cat.category}</h3>
                <ul className="guest-list">
                  {cat.names.map(name => <li key={name} className="guest-name">{name}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EVENTS ────────────────────────────────────────────────────────────────────
function Events() {
  return (
    <section className="events">
      <div className="container">
        <Reveal><p className="section-label center">Beyond the Mic</p></Reveal>
        <SplitTitle center>In the Community</SplitTitle>
        <div className="events-grid">
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.title} delay={i * 120}>
              <div className="event-card">
                <div className="event-icon">{ev.icon}</div>
                <span className="event-type">{ev.type}</span>
                <h3 className="event-title">{ev.title}</h3>
                <p className="event-desc">{ev.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SPONSORS ──────────────────────────────────────────────────────────────────
function Sponsors() {
  return (
    <section className="sponsors" id="partners">
      <div className="container">
        <Reveal><p className="section-label center">Sponsors & Partners</p></Reveal>
        <SplitTitle center>Who We Rock With</SplitTitle>
        <div className="sponsors-grid">
          {SPONSORS.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <a href={s.link} target="_blank" rel="noopener noreferrer" className={`sponsor-card${s.highlight ? ' sponsor-highlight' : ''}`}>
                {s.highlight && <span className="sponsor-badge">Exclusive</span>}
                <div className="sponsor-logo-wrap"><img src={s.logo} alt={s.name} className="sponsor-logo" /></div>
                <span className="sponsor-desc">{s.desc}</span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="partner-cta">
            <div className="partner-cta-text">
              <h3>Want to Partner with Club 520?</h3>
              <p className="brand-body">We work with brands that <span className="text-gold">understand culture.</span> Reach a passionate, loyal audience across YouTube, podcast, and social.</p>
            </div>
            <a href="mailto:partnerships@club520.com" className="btn btn-primary">Get in Touch</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── MERCH ─────────────────────────────────────────────────────────────────────
function MerchShowcase() {
  return (
    <section className="merch">
      <div className="container">
        <Reveal><p className="section-label center">The Collection</p></Reveal>
        <SplitTitle center>Shop Club 520</SplitTitle>
        <div className="merch-grid">
          {MERCH_CATS.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 100}>
              <a href={LINKS.merch} target="_blank" rel="noopener noreferrer" className="merch-card">
                <div className="merch-card-img-wrap">
                  <img src={cat.img} alt={cat.name} className="merch-card-img" />
                </div>
                <span className="merch-tag">{cat.tag}</span>
                <h3 className="merch-card-name">{cat.name}</h3>
                <p className="merch-card-desc">{cat.desc}</p>
                <span className="merch-card-cta">Shop Now →</span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="merch-feature">
            <div className="merch-feature-text">
              <span className="merch-feature-badge">Adidas × Club 520</span>
              <h3>Exclusive Collection</h3>
              <p className="brand-body">The first-ever podcast × Adidas collab. Official gear, limited drops, <span className="text-gold">straight from the couch to the streets.</span></p>
            </div>
            <a href={LINKS.adidas} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View the Collab →</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── NEWSLETTER ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = e => { e.preventDefault(); if (email) setSubmitted(true) }
  return (
    <section className="newsletter">
      <div className="container">
        <Reveal>
          <div className="newsletter-inner">
            <div className="newsletter-text">
              <h2>Never miss an episode.</h2>
              <p className="brand-body">Club 520 updates, merch drops, and behind-the-scenes content — <span className="text-gold">straight to your inbox.</span></p>
            </div>
            {submitted ? (
              <div className="newsletter-success">✓ You're in. Let's get it.</div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required className="newsletter-input" />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── WATCH & LISTEN ────────────────────────────────────────────────────────────
function Watch() {
  return (
    <section className="watch" id="watch">
      <div className="container">
        <Reveal><p className="section-label center">Find Us</p></Reveal>
        <SplitTitle center>Watch & Listen</SplitTitle>
        <Reveal delay={160}>
          <div className="platform-links">
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="platform-btn youtube"><YoutubeIcon size={22} /> YouTube</a>
            <a href={LINKS.spotify} target="_blank" rel="noopener noreferrer" className="platform-btn spotify"><SpotifyIcon size={22} /> Spotify</a>
            <a href={LINKS.apple} target="_blank" rel="noopener noreferrer" className="platform-btn apple"><ApplePodcastsIcon size={22} /> Apple Podcasts</a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="platform-btn instagram"><InstagramIcon size={22} /> Instagram</a>
            <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="platform-btn tiktok"><TikTokIcon size={22} /> TikTok</a>
            <a href={LINKS.patreon} target="_blank" rel="noopener noreferrer" className="platform-btn patreon"><PatreonIcon size={22} /> Patreon</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={logo} alt="Club 520" className="footer-logo-img" />
            <p className="footer-network">Part of <a href="https://www.thevolume.com/" target="_blank" rel="noopener noreferrer" className="text-gold volume-link">The Volume Network</a></p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <p className="footer-col-heading">Listen</p>
              <a href={LINKS.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
              <a href={LINKS.apple} target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
              <a href={LINKS.patreon} target="_blank" rel="noopener noreferrer">Patreon</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-heading">Follow</p>
              <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href={LINKS.twitter} target="_blank" rel="noopener noreferrer">X / Twitter</a>
              <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-heading">Shop</p>
              <a href={LINKS.merch} target="_blank" rel="noopener noreferrer">Merch Store</a>
              <a href={LINKS.adidas} target="_blank" rel="noopener noreferrer">Adidas Collab</a>
            </div>
          </div>
        </div>
        <div className="footer-social-row">
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YoutubeIcon size={20} /></a>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon size={20} /></a>
          <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon size={20} /></a>
          <a href={LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X"><XIcon size={20} /></a>
          <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon size={20} /></a>
          <a href={LINKS.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify"><SpotifyIcon size={20} /></a>
          <a href={LINKS.apple} target="_blank" rel="noopener noreferrer" aria-label="Apple Podcasts"><ApplePodcastsIcon size={20} /></a>
          <a href={LINKS.patreon} target="_blank" rel="noopener noreferrer" aria-label="Patreon"><PatreonIcon size={20} /></a>
        </div>
        <div className="footer-bottom"><p>© 2025 Club 520. All rights reserved.</p></div>
      </div>
    </footer>
  )
}

// ─── ICONS ─────────────────────────────────────────────────────────────────────
function HamburgerIcon({ open }) {
  return open
    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="24" height="24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="24" height="24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
}
function YoutubeIcon({ size = 24 }) { return <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> }
function InstagramIcon({ size = 24 }) { return <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> }
function FacebookIcon({ size = 24 }) { return <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> }
function SpotifyIcon({ size = 24 }) { return <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg> }
function TikTokIcon({ size = 24 }) { return <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/></svg> }
function XIcon({ size = 24 }) { return <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }
function ApplePodcastsIcon({ size = 24 }) { return <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true"><path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm7.14 3.87c2.91 0 5.46 1.3 7.26 3.37a.28.28 0 01-.05.4l-1.3 1a.28.28 0 01-.39-.06 6.57 6.57 0 00-5.52-2.96 6.57 6.57 0 00-5.52 2.96.28.28 0 01-.39.06l-1.3-1a.28.28 0 01-.05-.4 9.27 9.27 0 017.26-3.37zm.08 3.49c1.5 0 2.82.67 3.73 1.72a.28.28 0 01-.03.4l-1.3 1a.28.28 0 01-.39-.05 3.29 3.29 0 00-2.61-1.27 3.29 3.29 0 00-2.61 1.27.28.28 0 01-.39.05l-1.3-1a.28.28 0 01-.03-.4 5.07 5.07 0 013.93-1.72zm-.08 3.49c.92 0 1.66.74 1.66 1.66 0 .6-.32 1.12-.8 1.4l.68 3.35a.28.28 0 01-.27.34h-2.54a.28.28 0 01-.27-.34l.68-3.35a1.66 1.66 0 01-.8-1.4c0-.92.74-1.66 1.66-1.66z"/></svg> }
function PatreonIcon({ size = 24 }) { return <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true"><path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.4H2V21.6z"/></svg> }
