import { useMemo, useState } from 'react'
import {
  Activity, ArrowUpRight, AudioLines, Bell, BookOpen, Check,
  ChevronDown, CircleHelp, Command, Cpu, Focus, Headphones,
  Laptop2, Mic, Moon, MoreHorizontal, Pause, Play, Plus,
  Power, Settings2, Sparkles, Sun, Terminal, Timer, Volume2,
  Waves, X
} from 'lucide-react'

type Mode = 'Everyday' | 'Study' | 'Coding' | 'Focus' | 'Chill'

const modes: { name: Mode; detail: string; icon: typeof Sun; color: string; note: string }[] = [
  { name: 'Everyday', detail: 'A little help with the usual stuff', icon: Sun, color: 'sage', note: 'Your desktop, just the way you left it.' },
  { name: 'Study', detail: 'A quieter space to learn', icon: BookOpen, color: 'blue', note: 'Distractions down. Learning mode on.' },
  { name: 'Coding', detail: 'Set up your dev workspace', icon: Terminal, color: 'teal', note: 'Editor, terminal, and your flow.' },
  { name: 'Focus', detail: 'One thing at a time', icon: Focus, color: 'amber', note: 'Keep the noise out. Get it done.' },
  { name: 'Chill', detail: 'Slow things down a little', icon: Headphones, color: 'rose', note: 'Take a breath. No rush.' }
]

const suggestions = ['Start a 45-minute study session', 'Open my coding workspace', 'Make the desktop quieter']

export default function App() {
  const [mode, setMode] = useState<Mode>('Everyday')
  const [command, setCommand] = useState('')
  const [listening, setListening] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [notice, setNotice] = useState('')

  const activeMode = useMemo(() => modes.find((item) => item.name === mode)!, [mode])

  function runCommand(value = command) {
    const text = value.trim().toLowerCase()
    if (!text) return
    if (text.includes('study')) setMode('Study')
    else if (text.includes('coding') || text.includes('code')) setMode('Coding')
    else if (text.includes('focus')) setMode('Focus')
    else if (text.includes('chill') || text.includes('relax')) setMode('Chill')
    else if (text.includes('everyday') || text.includes('normal')) setMode('Everyday')
    else setNotice('That command is ready for the assistant engine. Voice and AI actions are coming next.')
    setCommand('')
    setListening(false)
  }

  return (
    <div className={`app-shell mode-${mode.toLowerCase()}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><AudioLines size={19} strokeWidth={2.2} /></div>
          <div><strong>yathu<span>.ai</span></strong><small>YOUR DESKTOP COMPANION</small></div>
        </div>

        <div className="side-label">WORKSPACE</div>
        <button className="nav-item active"><Activity size={17} /> Overview <span className="nav-dot" /></button>
        <button className="nav-item" onClick={() => setNotice('Your routines will live here.') }><Waves size={17} /> Routines</button>
        <button className="nav-item" onClick={() => setNotice('Your recent activity will appear here.') }><Timer size={17} /> Activity</button>

        <div className="side-label side-label-spaced">YOUR MODES</div>
        {modes.map((item) => {
          const Icon = item.icon
          return <button key={item.name} className={`mode-link ${mode === item.name ? 'selected' : ''}`} onClick={() => setMode(item.name)}>
            <span className={`mode-mini ${item.color}`}><Icon size={14} /></span>{item.name}
            {mode === item.name && <span className="mode-check"><Check size={13} /></span>}
          </button>
        })}

        <div className="sidebar-bottom">
          <div className="connection"><span className="online-dot" /><span>Yathu is ready</span><span className="local-tag">LOCAL</span></div>
          <button className="profile-row" onClick={() => setNotice('Settings are coming soon.')}>
            <div className="avatar">Y</div><div className="profile-copy"><strong>Yathu</strong><small>Personal assistant</small></div><MoreHorizontal size={18} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="crumb">Workspace <span>/</span> <b>Overview</b></div>
          <div className="top-actions">
            <div className="system-status"><span className="online-dot" /> All systems normal</div>
            <button className="icon-button" aria-label="Notifications" onClick={() => setNotice('You are all caught up.')}><Bell size={17} /></button>
            <button className="icon-button" aria-label="Settings" onClick={() => setNotice('Settings are coming soon.')}><Settings2 size={17} /></button>
          </div>
        </header>

        <div className="content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> YOUR SPACE, YOUR PACE</div>
              <h1>Good to have you<br /><em>back.</em></h1>
              <p className="welcome-sub">What are we getting into today?</p>
            </div>
            <div className="date-card"><span>YOUR ASSISTANT</span><div className="assistant-status"><span className="online-dot" /> Standing by</div><div className="date-divider" /><small>Say <b>“Hey Yathu”</b> or press <kbd>Ctrl</kbd><kbd>Space</kbd></small></div>
          </div>

          <section className="command-panel">
            <div className="command-top"><div className="command-label"><span className="command-spark"><Sparkles size={14} /></span> TALK TO YATHU</div><span className="command-hint">A thought, a task, or a quick command</span></div>
            <div className="command-entry">
              <div className="entry-icon"><Command size={19} /></div>
              <input value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && runCommand()} placeholder="What do you need, Yathu?" />
              <button className={`mic-button ${listening ? 'listening' : ''}`} onClick={() => { setListening(!listening); setNotice('Microphone capture will be connected in the voice-engine phase.') }} aria-label="Toggle microphone"><Mic size={18} /></button>
              <button className="send-button" onClick={() => runCommand()} aria-label="Send command"><ArrowUpRight size={19} /></button>
            </div>
            <div className="suggestions">{suggestions.map((item) => <button key={item} onClick={() => { setCommand(item); runCommand(item) }}>{item}<ArrowUpRight size={12} /></button>)}</div>
          </section>

          <div className="section-heading"><div><span className="eyebrow">MAKE IT YOURS</span><h2>Pick your atmosphere.</h2></div><button className="text-action" onClick={() => setMode('Everyday')}>Reset mode <X size={13} /></button></div>
          <section className="mode-grid">
            {modes.map((item) => {
              const Icon = item.icon
              return <button key={item.name} className={`mode-card ${item.color} ${mode === item.name ? 'chosen' : ''}`} onClick={() => { setMode(item.name); setNotice(`${item.name} mode selected. Desktop integrations will be connected next.`) }}>
                <div className="mode-card-top"><span className="mode-icon"><Icon size={19} /></span>{mode === item.name ? <span className="active-pill"><span /> ACTIVE</span> : <ArrowUpRight size={16} className="card-arrow" />}</div>
                <strong>{item.name}</strong><small>{item.detail}</small>
              </button>
            })}
          </section>

          <section className="bottom-grid">
            <div className="now-card">
              <div className="now-heading"><div><span className="eyebrow">CURRENT ATMOSPHERE</span><h3>{mode} mode</h3></div><span className="now-icon"><activeMode.icon size={20} /></span></div>
              <p>{activeMode.note}</p>
              <div className="now-footer"><span><span className="online-dot" /> Ready when you are</span><button onClick={() => setNotice('Mode customization is coming soon.')}>Customize <ArrowUpRight size={13} /></button></div>
            </div>
            <div className="timer-card">
              <div className="timer-top"><span className="eyebrow">A LITTLE STRUCTURE</span><Timer size={18} /></div>
              <div className="timer-main"><div><strong>45<span>min</span></strong><small>Focus session</small></div><button className="timer-play" onClick={() => setTimerRunning(!timerRunning)}>{timerRunning ? <Pause size={17} /> : <Play size={17} />}</button></div>
              <div className="timer-track"><span style={{ width: timerRunning ? '24%' : '0%' }} /></div>
              <div className="timer-caption">{timerRunning ? 'Session started · timer integration next' : 'A good place to start'}</div>
            </div>
          </section>
          <footer className="footer"><span>YATHU.AI <i>·</i> BUILT AROUND YOUR DAY</span><span><Cpu size={13} /> DESKTOP PREVIEW <i>·</i> V0.1</span></footer>
        </div>
      </main>
      {notice && <div className="toast"><span className="toast-mark"><Check size={14} /></span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={15} /></button></div>}
    </div>
  )
}
