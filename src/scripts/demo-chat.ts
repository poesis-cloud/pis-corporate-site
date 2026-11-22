/**
 * demo-chat.ts — plays the scripted demonstrations of DemoChat.astro.
 *
 * The page holds every word of both scenarios. This script only decides which
 * steps are shown: it adds `is-on` to the parts of the current scenario, one
 * step after the other, and the style sheet does the rest. Nothing is fetched,
 * and nothing is measured.
 *
 *   plays once, when the panel comes on screen; waits while it is off screen
 *   pause, play, next step, replay; changing tab starts the other scenario
 *   reduced motion: the complete picture at once, no controls
 *   a visitor who paused keeps the complete picture for the session
 */
const STORE = 'poesis-demo';

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

  const last = Number(root.dataset.last) || 6;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  let panel = panels.find((candidate) => candidate.classList.contains('is-active')) ?? panels[0];
  let step = 0;
  /** The visitor lets it advance by itself. */
  let playing = false;
  /** On screen, in the front tab. */
  let visible = !('IntersectionObserver' in window);
  let timer = 0;
  let due = 0;
  let remaining = 0;

  const waits = (): number[] => (panel.dataset.delays ?? '').split(',').map(Number);

  function render(): void {
    for (const part of panel.querySelectorAll<HTMLElement>('[data-step]')) part.classList.toggle('is-on', Number(part.dataset.step) <= step);
    // The developer scenario: which steps are reached, and which file or command is in view.
    const views = [...panel.querySelectorAll<HTMLElement>('[data-view]')];
    const inView = views.filter((view) => Number(view.dataset.view) <= step).pop() ?? views[0];
    for (const view of views) view.classList.toggle('is-current', view === inView);
    for (const chip of panel.querySelectorAll<HTMLElement>('[data-chip]')) {
      chip.classList.toggle('is-done', Number(chip.dataset.chip) <= step);
      if (inView && chip.dataset.chip === inView.dataset.view) chip.setAttribute('aria-current', 'step'); else chip.removeAttribute('aria-current');
    }
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-done', index < step - 1);
      dot.classList.toggle('is-now', index === step - 1);
    });
    const ended = step >= last;
    root.classList.toggle('is-playing', playing && !ended);
    toggle!.setAttribute('aria-label', playing && !ended ? 'Pause the demonstration' : 'Play the demonstration');
    if (ended) next!.setAttribute('aria-disabled', 'true'); else next!.removeAttribute('aria-disabled');
  }

  function hold(): void {
    if (!timer) return;
    window.clearTimeout(timer);
    timer = 0;
    remaining = Math.max(0, due - performance.now());
  }

  function schedule(): void {
    if (timer || !playing || !visible || step >= last) return;
    if (remaining <= 0) remaining = waits()[step] ?? 1500;
    due = performance.now() + remaining;
    timer = window.setTimeout(() => {
      timer = 0;
      remaining = 0;
      step += 1;
      if (step >= last) playing = false;
      render();
      schedule();
    }, remaining);
  }

  /** What a step is called, for the visitor who moves through them by hand. */
  function say(): void {
    if (!status) return;
    const named = panel.querySelector<HTMLElement>(`[data-chip="${step}"]`) ?? panel.querySelector<HTMLElement>(`[data-step="${step}"][data-say]`);
    const label = named?.dataset.say ?? named?.textContent?.trim() ?? '';
    status.textContent = step ? `Step ${step} of ${last}${label ? `: ${label}` : ''}` : '';
  }

  function freeze(frozen: boolean): void {
    root.classList.toggle('is-paused', frozen);
  }

  /** From the first step again; the panel dims first, so that nothing snaps away. */
  function restart(): void {
    hold();
    remaining = 0;
    playing = true;
    freeze(false);
    remember(false);
    const current = panel;
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

  function select(tab: HTMLButtonElement, focus: boolean): void {
    const target = panels.find((candidate) => candidate.id === tab.getAttribute('aria-controls'));
    for (const other of tabs) {
      other.setAttribute('aria-selected', String(other === tab));
      other.tabIndex = other === tab ? 0 : -1;
    }
    if (focus) tab.focus();
    if (!target || target === panel) return;
    hold();
    remaining = 0;
    panel.classList.remove('is-active');
    panel = target;
    panel.classList.add('is-active');
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

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (event) => {
      const to = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (to === null) return;
      event.preventDefault();
      select(tabs[(to + tabs.length) % tabs.length], true);
    });
  });

  toggle.addEventListener('click', () => {
    if (step >= last) { restart(); return; }
    if (playing) {
      playing = false;
      hold();
      freeze(true);
      remember(true);
    } else {
      playing = true;
      freeze(false);
      remember(false);
      schedule();
    }
    render();
  });

  next.addEventListener('click', () => {
    if (step >= last) return;
    hold();
    remaining = 0;
    playing = false;
    freeze(false);
    step += 1;
    render();
    say();
  });

  replay.addEventListener('click', restart);

  // A step of the developer scenario, chosen by hand: its file or command comes into view.
  for (const chip of root.querySelectorAll<HTMLButtonElement>('[data-chip]')) {
    chip.addEventListener('click', () => {
      hold();
      remaining = 0;
      playing = false;
      freeze(false);
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
    if (still.matches) {
      root.classList.remove('is-live', 'is-instant');
      complete();
      return;
    }
    root.classList.add('is-live');
    if (remembered()) {
      root.classList.add('is-instant');
      complete();
      return;
    }
    playing = true;
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
