import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'

const STATE_KEY = 'gambling_state'
const DATA_URL = 'https://raw.githubusercontent.com/NuclearGecko74/gambling-project/main/assets/data/games.json'

const FALLBACK_DATA = {
  config: { initialCredits: 100, betAmount: 10, spinTicks: 15, tickInterval: 80 },
  symbols: [
    { icon: '7️⃣', prize: 150, name: 'Siete' },
    { icon: '💎', prize: 100, name: 'Diamante' },
    { icon: '🍀', prize: 80,  name: 'Trébol' },
    { icon: '🔔', prize: 60,  name: 'Campana' },
    { icon: '🍋', prize: 40,  name: 'Limón' },
    { icon: '🍒', prize: 30,  name: 'Cereza' },
  ],
}

const loadState = () => {
  try { return JSON.parse(localStorage.getItem(STATE_KEY)) }
  catch { return null }
}

const saveState = (state) => localStorage.setItem(STATE_KEY, JSON.stringify(state))
const clearState = () => localStorage.removeItem(STATE_KEY)

export default function Games() {
  const [symbols, setSymbols] = useState([])
  const [betAmount, setBetAmount] = useState(10)
  const [credits, setCredits] = useState(100)
  const [wins, setWins] = useState(0)
  const [spins, setSpins] = useState(0)
  const [reels, setReels] = useState(['💎', '💎', '💎'])
  const [reelClasses, setReelClasses] = useState(['', '', ''])
  const [status, setStatus] = useState('')
  const [statusColor, setStatusColor] = useState('var(--text-muted)')
  const [flash, setFlash] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [bannerMsg, setBannerMsg] = useState('')

  const creditsRef = useRef(100)
  const winsRef = useRef(0)
  const spinsRef = useRef(0)
  const spinningRef = useRef(false)
  const symbolsRef = useRef([])
  const configRef = useRef(null)

  useEffect(() => {
    const initData = (data) => {
      const betAmt = data.config?.betAmount ?? data.betAmount ?? 10
      const normalizedSymbols = data.symbols.map(s => ({
        icon: s.icon ?? s.emoji,
        prize: s.prize !== undefined ? s.prize : s.multiplier * betAmt,
        name: s.name,
      }))
      const config = {
        initialCredits: data.config?.initialCredits ?? data.initialCredits ?? 100,
        betAmount: betAmt,
        spinTicks: data.config?.spinTicks ?? 15,
        tickInterval: data.config?.tickInterval ?? 80,
      }

      symbolsRef.current = normalizedSymbols
      configRef.current = config
      setSymbols(normalizedSymbols)
      setBetAmount(config.betAmount)

      const saved = loadState()
      if (saved) {
        creditsRef.current = saved.credits
        winsRef.current = saved.wins
        spinsRef.current = saved.spins
        setCredits(saved.credits)
        setWins(saved.wins)
        setSpins(saved.spins)
        setBannerMsg(`Sesión anterior restaurada — ${saved.credits} créditos · ${saved.wins} victorias · ${saved.spins} tiradas`)
        setShowBanner(true)
      } else {
        creditsRef.current = config.initialCredits
        setCredits(config.initialCredits)
      }

      setStatus(`¡Haz clic en girar! — Apuesta: ${config.betAmount} créditos`)
    }

    axios.get(DATA_URL)
      .then(res => initData(res.data))
      .catch(() => initData(FALLBACK_DATA))
  }, [])

  const handleSpin = useCallback(() => {
    if (spinningRef.current || !configRef.current) return
    const cfg = configRef.current
    const syms = symbolsRef.current
    if (creditsRef.current < cfg.betAmount) return

    const newCredits = creditsRef.current - cfg.betAmount
    const newSpins = spinsRef.current + 1
    creditsRef.current = newCredits
    spinsRef.current = newSpins
    spinningRef.current = true

    setCredits(newCredits)
    setSpins(newSpins)
    setSpinning(true)
    setReelClasses(['spinning', 'spinning', 'spinning'])
    setStatus('Girando...')
    setStatusColor('var(--text-muted)')
    saveState({ credits: newCredits, wins: winsRef.current, spins: newSpins })

    let ticks = 0
    let lastSyms = []
    const randomSym = () => syms[Math.floor(Math.random() * syms.length)]

    const timer = setInterval(() => {
      lastSyms = [randomSym(), randomSym(), randomSym()]
      setReels(lastSyms.map(s => s.icon))

      if (++ticks >= cfg.spinTicks) {
        clearInterval(timer)
        spinningRef.current = false
        setSpinning(false)

        const isWin = lastSyms[0].icon === lastSyms[1].icon && lastSyms[1].icon === lastSyms[2].icon

        if (isWin) {
          const prize = lastSyms[0].prize
          const newC = creditsRef.current + prize
          const newW = winsRef.current + 1
          creditsRef.current = newC
          winsRef.current = newW
          setCredits(newC)
          setWins(newW)
          setReelClasses(['winning', 'winning', 'winning'])
          setStatus(`¡GANASTE! +${prize} créditos 🏆`)
          setStatusColor('var(--accent-green)')
          setFlash(true)
          setTimeout(() => setFlash(false), 450)
        } else {
          setReelClasses(['', '', ''])
          if (creditsRef.current < cfg.betAmount) {
            setStatus('Sin créditos — reinicia el juego.')
            setStatusColor('#ff4d4d')
          } else {
            setStatus(`Sigue intentando — apuesta: ${cfg.betAmount} créditos`)
            setStatusColor('var(--text-muted)')
          }
        }

        saveState({ credits: creditsRef.current, wins: winsRef.current, spins: spinsRef.current })
      }
    }, cfg.tickInterval)
  }, [])

  const handleReset = () => {
    if (!configRef.current) return
    const cfg = configRef.current
    creditsRef.current = cfg.initialCredits
    winsRef.current = 0
    spinsRef.current = 0
    spinningRef.current = false
    clearState()
    setCredits(cfg.initialCredits)
    setWins(0)
    setSpins(0)
    setSpinning(false)
    setReels(['💎', '💎', '💎'])
    setReelClasses(['', '', ''])
    setStatus(`¡Haz clic en girar! — Apuesta: ${cfg.betAmount} créditos`)
    setStatusColor('var(--text-muted)')
    setShowBanner(false)
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' && !e.target.matches('input, textarea, select, button')) {
        e.preventDefault()
        handleSpin()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [handleSpin])

  const canSpin = !spinning && symbols.length > 0 && credits >= betAmount

  return (
    <>
      {showBanner && (
        <div className="session-banner">
          <span>{bannerMsg}</span>
          <button className="banner-dismiss" aria-label="Cerrar" onClick={() => setShowBanner(false)}>
            ✕
          </button>
        </div>
      )}

      <div className="page-banner">
        <h1>Juegos</h1>
        <p>Prueba tu suerte — usa <kbd>Espacio</kbd> para girar</p>
      </div>

      <main>
        <section className="game-section">
          <div className="game-wrapper">
            <div className="game-header">
              <h2>Tragamonedas</h2>
              <div className="credits-display">
                <span className="credits-label">Créditos</span>
                <span className={`credits-value${flash ? ' flash' : ''}`}>{credits}</span>
              </div>
            </div>

            <div className="slot-display">
              {reels.map((symbol, i) => (
                <div key={i} className={`reel${reelClasses[i] ? ' ' + reelClasses[i] : ''}`}>
                  {symbol}
                </div>
              ))}
            </div>

            <p className="game-status" style={{ color: statusColor }}>{status}</p>

            <div className="game-controls">
              <button className="btn-main" onClick={handleSpin} disabled={!canSpin}>
                Girar
              </button>
              <button className="btn-outline" onClick={handleReset}>
                Reiniciar
              </button>
            </div>

            <div className="game-stats">
              <div className="game-stat">
                <span>{wins}</span>
                <span>Victorias</span>
              </div>
              <div className="game-stat">
                <span>{spins}</span>
                <span>Tiradas</span>
              </div>
            </div>
          </div>

          <div className="symbols-guide">
            <h3>Tabla de premios</h3>
            <div className="symbols-grid">
              {symbols.map((s, i) => (
                <div key={i} className="symbol-row">
                  <span>{s.icon} {s.icon} {s.icon}</span>
                  <span className="prize">+{s.prize} créditos</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
