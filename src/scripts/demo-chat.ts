/**
 * demo-chat.ts — plays the scripted demonstrations of DemoChat.astro.
 *
 * The page holds every word of every case. This script only decides which
 * steps are shown: it adds `is-on` to the parts of the case on show, one step
 * after the other, and the style sheet does the rest. Nothing is fetched, and
 * nothing is measured.
 *
 *   it is a chat: the request is typed in the message field, then sent; each answer is
 *   written word after word; what was said scrolls up when a new message arrives
 *   with a choice (`data-intro`): nothing plays until the visitor picks a side or a case
 *   plays when the panel comes on screen; waits while it is off screen
 *   the cases of a tab follow one another, once: the last one stays on show
 *   pause, play, next step, replay; changing tab or case starts that one
 *   a case or a step chosen by hand stops the sequence: the visitor leads
 *   reduced motion: the complete picture at once, no controls
 *   a visitor who paused keeps the complete picture for the session
 */
const STORE = 'poesis-demo';
/** One key of the request, in milliseconds; the style sheet uses the same pace. */
const KEY = 26;

/**
 * Gets a case ready to be played: its request becomes keys to type in the message field, and
 * each answer becomes words to write. The words are the text of the page, cut where it is; the
 * keys are a picture of that text being typed, silent for screen readers.
 */
function prepare(scene: HTMLElement): void {
  if (scene.dataset.ready) return;
  scene.dataset.ready = 'true';
  const typed = scene.querySelector<HTMLElement>('[data-type]');
  if (typed) {
    const text = typed.dataset.type ?? '';
    typed.replaceChildren(...[...text].map((key, index) => {
      const span = document.createElement('span');
      span.className = 'demo__key';
      span.style.setProperty('--i', String(index));
      span.textContent = key;
      return span;
    }));
    // Typed, a short pause, sent.
    scene.style.setProperty('--type', `${250 + text.length * KEY + 380}ms`);
    scene.dataset.type = String(250 + text.length * KEY + 380);
  }
  for (const said of scene.querySelectorAll<HTMLElement>('[data-words]')) {
    const parts = (said.textContent ?? '').trim().split(/\s+/);
    said.replaceChildren(...parts.flatMap((word, index) => {
      const span = document.createElement('span');
      span.className = 'demo__word';
      span.style.setProperty('--i', String(index));
      span.textContent = word;
      return index < parts.length - 1 ? [span, document.createTextNode(' ')] : [span];
    }));
  }
}
/** How long the last picture of a case holds before the next case starts. */
const BETWEEN_CASES = 5200;

function remembered(): boolean {
  try { return sessionStorage.getItem(STORE) === 'paused'; } catch { return false; }
}
function remember(paused: boolean): void {
  try { if (paused) sessionStorage.setItem(STORE, 'paused'); else sessionStorage.removeItem(STORE); } catch { /* storage unavailable */ }
}

function mount(root: HTMLElement): void {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-panel]')];
  const controls = root.querySelector<HTMLElement>('.demo__controls');
  const toggle = root.querySelector<HTMLButtonElement>('[data-demo-toggle]');
  const next = root.querySelector<HTMLButtonElement>('[data-demo-next]');
  const replay = root.querySelector<HTMLButtonElement>('[data-demo-replay]');
  const status = root.querySelector<HTMLElement>('[data-demo-status]');
  const dots = [...root.querySelectorAll<HTMLElement>('.demo__dots-track i')];
  if (!tabs.length || !panels.length || !controls || !toggle || !next || !replay) return;

  /** The panel opens on the choice between its two sides, and waits for it. */
  let choosing = root.hasAttribute('data-intro');
  const last = Number(root.dataset.last) || 6;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenesOf = (panel: HTMLElement) => [...panel.querySelectorAll<HTMLElement>('[data-scene]')];
  let panel = panels.find((candidate) => candidate.classList.contains('is-active')) ?? panels[0];
  /** The case on show. */
  let scene = scenesOf(panel).find((candidate) => candidate.classList.contains('is-current')) ?? scenesOf(panel)[0];
  let step = 0;
  /** The visitor lets it advance by itself. */
  let playing = false;
  /** The cases of the tab follow one another, until the visitor picks a case or a step. */
  let sequence = false;
  /** On screen, in the front tab. */
  let visible = !('IntersectionObserver' in window);
  let timer = 0;
  let due = 0;
  let remaining = 0;

  /** How long each step holds. The request holds for as long as it takes to type it and send it. */
  const waits = (): number[] => {
    const list = (scene.dataset.delays ?? '').split(',').map(Number);
    const typing = Number(scene.dataset.type);
    if (typing) list[1] = typing + 750;
    return list;
  };
  const live = (): boolean => root.classList.contains('is-live');
  /** The case after the one on show, in the same tab. */
  const following = (): HTMLElement | undefined => { const all = scenesOf(panel); return all[all.indexOf(scene) + 1]; };
  const caseButton = (of: HTMLElement | undefined) => (of ? panel.querySelector<HTMLElement>(`[data-case="${of.dataset.scene}"]`) : null);
  /** The last picture of a case is on show and another case will follow by itself. */
  const between = (): boolean => step >= last && playing && sequence && Boolean(following());

  function render(): void {
    if (live()) prepare(scene);
    for (const part of scene.querySelectorAll<HTMLElement>('[data-step]')) part.classList.toggle('is-on', Number(part.dataset.step) <= step);
    scene.querySelector('.demo__composer')?.classList.toggle('is-typing', step >= 1);
    // The conversation follows its last message, as a chat does.
    const log = scene.querySelector<HTMLElement>('[data-log]');
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: live() && step > 1 && !root.classList.contains('is-instant') ? 'smooth' : 'auto' });
    // Which steps are reached, and which file, command or panel of people is in view.
    const views = [...scene.querySelectorAll<HTMLElement>('[data-view]')];
    const inView = views.filter((view) => Number(view.dataset.view) <= step).pop() ?? views[0];
    for (const view of views) view.classList.toggle('is-current', view === inView);
    for (const chip of scene.querySelectorAll<HTMLElement>('[data-chip]')) {
      chip.classList.toggle('is-done', Number(chip.dataset.chip) <= step);
      if (inView && chip.dataset.chip === inView.dataset.view) chip.setAttribute('aria-current', 'step'); else chip.removeAttribute('aria-current');
    }
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-done', index < step - 1);
      dot.classList.toggle('is-now', index === step - 1);
    });
    const upNext = between() ? caseButton(following()) : null;
    for (const button of root.querySelectorAll<HTMLElement>('[data-case]')) button.classList.toggle('is-next', button === upNext);
    const ended = step >= last && !between();
    root.classList.toggle('is-playing', playing && !ended);
    toggle!.setAttribute('aria-label', playing && !ended ? 'Pause the demonstration' : 'Play the demonstration');
    // After the last step of a case, "next" opens the next case of the tab, when there is one.
    const more = step < last || Boolean(following());
    next!.setAttribute('aria-label', step >= last && following() ? 'Show the next case' : 'Show the next step');
    if (more) next!.removeAttribute('aria-disabled'); else next!.setAttribute('aria-disabled', 'true');
  }

  function hold(): void {
    if (!timer) return;
    window.clearTimeout(timer);
    timer = 0;
    remaining = Math.max(0, due - performance.now());
  }

  function schedule(): void {
    if (timer || !playing || !visible) return;
    if (step >= last && !between()) return;
    if (remaining <= 0) remaining = step >= last ? BETWEEN_CASES : (waits()[step] ?? 1500);
    due = performance.now() + remaining;
    timer = window.setTimeout(() => {
      timer = 0;
      remaining = 0;
      if (step >= last) {
        const to = following();
        if (to) show(to, true);
        return;
      }
      step += 1;
      if (step >= last && !(sequence && following())) playing = false;
      render();
      schedule();
    }, remaining);
  }

  /** What a step is called, for the visitor who moves through them by hand. */
  function say(): void {
    if (!status) return;
    const named = scene.querySelector<HTMLElement>(`[data-chip="${step}"]`) ?? scene.querySelector<HTMLElement>(`[data-step="${step}"][data-say]`);
    const label = named?.dataset.say ?? named?.textContent?.trim().replace(/^\d+\s*/, '') ?? '';
    status.textContent = step ? `Step ${step} of ${last}${label ? `: ${label}` : ''}` : '';
  }

  function freeze(frozen: boolean): void {
    root.classList.toggle('is-paused', frozen);
  }

  /** The case on show, from its first step again; it dims first, so that nothing snaps away. */
  function restart(): void {
    hold();
    remaining = 0;
    playing = true;
    freeze(false);
    remember(false);
    const current = scene;
    current.classList.add('is-resetting');
    window.setTimeout(() => {
      root.classList.remove('is-instant');
      step = 0;
      render();
      current.classList.remove('is-resetting');
      schedule();
    }, 190);
  }

  function complete(): void {
    hold();
    remaining = 0;
    playing = false;
    step = last;
    render();
  }

  /** Puts a case of the tab in front on show and plays it. `inSequence`: the cases after it will follow. */
  function show(target: HTMLElement, inSequence: boolean): void {
    hold();
    remaining = 0;
    for (const other of scenesOf(panel)) other.classList.toggle('is-current', other === target);
    for (const button of panel.querySelectorAll<HTMLElement>('[data-case]')) button.setAttribute('aria-pressed', String(button.dataset.case === target.dataset.scene));
    scene = target;
    sequence = inSequence;
    if (status) status.textContent = '';
    if (still.matches) { complete(); return; }
    root.classList.remove('is-instant');
    freeze(false);
    remember(false);
    playing = true;
    step = 0;
    render();
    schedule();
  }

  /** Puts a tab in front. Returns false when it already was. */
  function front(tab: HTMLButtonElement, focus: boolean): boolean {
    const target = panels.find((candidate) => candidate.id === tab.getAttribute('aria-controls'));
    for (const other of tabs) {
      other.setAttribute('aria-selected', String(other === tab));
      other.tabIndex = other === tab ? 0 : -1;
    }
    if (focus) tab.focus();
    if (!target || target === panel) return false;
    panel.classList.remove('is-active');
    panel = target;
    panel.classList.add('is-active');
    return true;
  }

  function select(tab: HTMLButtonElement, focus: boolean): void {
    // A tab opens on its first case, and its cases then follow one another.
    if (front(tab, focus)) show(scenesOf(panel)[0], true);
  }

  // The choice: a side starts on its first case and plays them all; a case starts alone.
  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-start]')) {
    button.addEventListener('click', () => {
      const tab = tabs.find((candidate) => candidate.dataset.tab === button.dataset.start);
      if (!tab) return;
      choosing = false;
      root.classList.add('is-chosen');
      // The button that was pressed leaves the page: the focus goes to the tab it opened.
      front(tab, true);
      const wanted = scenesOf(panel).find((candidate) => candidate.dataset.scene === button.dataset.startCase);
      show(wanted ?? scenesOf(panel)[0], !wanted);
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (event) => {
      const to = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (to === null) return;
      event.preventDefault();
      select(tabs[(to + tabs.length) % tabs.length], true);
    });
  });

  // A case chosen by hand plays, and stays: the visitor asked for that one.
  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-case]')) {
    button.addEventListener('click', () => {
      const target = scenesOf(panel).find((candidate) => candidate.dataset.scene === button.dataset.case);
      if (target) show(target, false);
    });
  }

  toggle.addEventListener('click', () => {
    if (step >= last && !between()) { restart(); return; }
    if (playing) {
      playing = false;
      hold();
      freeze(true);
      remember(true);
    } else {
      playing = true;
      root.classList.remove('is-instant');
      freeze(false);
      remember(false);
      schedule();
    }
    render();
  });

  next.addEventListener('click', () => {
    if (step >= last) {
      const to = following();
      if (to) show(to, false);
      return;
    }
    hold();
    remaining = 0;
    playing = false;
    sequence = false;
    root.classList.remove('is-instant');
    freeze(false);
    step += 1;
    render();
    say();
  });

  replay.addEventListener('click', restart);

  // A step chosen by hand: its file, its command or its people come into view.
  for (const chip of root.querySelectorAll<HTMLButtonElement>('[data-chip]')) {
    chip.addEventListener('click', () => {
      hold();
      remaining = 0;
      playing = false;
      sequence = false;
      freeze(false);
      // Jumping to a step shows it at once: the conversation above it does not play again.
      root.classList.add('is-instant');
      step = Number(chip.dataset.chip);
      render();
      say();
    });
  }

  const copy = root.querySelector<HTMLButtonElement>('[data-demo-copy]');
  const copyLabel = copy?.querySelector<HTMLElement>('[data-demo-copy-label]');
  if (copy && copyLabel && navigator.clipboard) {
    const idle = copyLabel.textContent ?? '';
    copy.classList.add('is-on');
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copy.dataset.demoCopy ?? '');
        copyLabel.textContent = 'Copied';
        if (status) status.textContent = 'Install commands copied.';
      } catch {
        if (status) status.textContent = 'The commands could not be copied. They are on the Developers page.';
      }
      window.setTimeout(() => { copyLabel.textContent = idle; }, 2200);
    });
  }

  function see(now: boolean): void {
    visible = now;
    root.classList.toggle('is-held', !now);
    if (now) schedule(); else hold();
  }

  /** Motion accepted: it plays. Reduced motion: the complete picture, and no controls. */
  function start(): void {
    hold();
    remaining = 0;
    root.classList.add('is-ready');
    freeze(false);
    if (choosing) {
      // Nothing plays before the visitor has chosen; the parts of the cases are ready behind.
      root.classList.toggle('is-live', !still.matches);
      playing = false;
      return;
    }
    if (still.matches) {
      root.classList.remove('is-live', 'is-instant');
      sequence = false;
      complete();
      return;
    }
    root.classList.add('is-live');
    if (remembered()) {
      root.classList.add('is-instant');
      sequence = false;
      complete();
      return;
    }
    playing = true;
    sequence = true;
    step = 0;
    render();
    schedule();
  }

  // On screen: a third of the panel, or what fills two fifths of a small screen when the panel is taller than it.
  if ('IntersectionObserver' in window) {
    let onScreen = false;
    new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      const room = entry.rootBounds?.height ?? window.innerHeight;
      onScreen = entry.isIntersecting && entry.intersectionRect.height >= Math.min(entry.boundingClientRect.height * 0.3, room * 0.4);
      see(onScreen && !document.hidden);
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.45, 0.6] }).observe(root);
    document.addEventListener('visibilitychange', () => see(onScreen && !document.hidden));
  }
  // Older Safari has no addEventListener on a media query list: the page then keeps its first answer.
  still.addEventListener?.('change', start);
  start();
}

for (const root of document.querySelectorAll<HTMLElement>('[data-demo]')) mount(root);
