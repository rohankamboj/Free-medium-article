const n = [
    'medium.com',
    'levelup.gitconnected.com',
    'towardsdatascience.com',
    'betterprogramming.pub',
  ],
  s = (e) => {
    try {
      const t = new URL(e);
      return (
        n.some((r) => t.hostname.includes(r)) &&
        !t.hostname.includes('freedium.cfd')
      );
    } catch {
      return !1;
    }
  },
  u = (e) => `https://freedium.cfd/${e}`;
chrome.tabs.onUpdated.addListener((e, t, r) => {
  if (t.status === 'loading' && r.url && s(r.url)) {
    const c = u(r.url);
    chrome.tabs.update(e, { url: c });
  }
});
