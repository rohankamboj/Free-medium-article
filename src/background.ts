const MEDIUM_DOMAINS = [
  'medium.com',
  'levelup.gitconnected.com',
  'towardsdatascience.com',
  'betterprogramming.pub'
];

// Check if the URL is a Medium article
const isMediumArticle = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return MEDIUM_DOMAINS.some(domain => urlObj.hostname.includes(domain)) && 
           !urlObj.hostname.includes('freedium.cfd');
  } catch {
    return false;
  }
};

// Create the Freedium URL
const createFreediumUrl = (url: string): string => {
  return `https://freedium.cfd/${url}`;
};

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url && isMediumArticle(tab.url)) {
    const freediumUrl = createFreediumUrl(tab.url);
    chrome.tabs.update(tabId, { url: freediumUrl });
  }
});