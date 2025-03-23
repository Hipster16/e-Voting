export const scrollToElement = (id: string) => {
  let element = document.getElementById(id);
  
  if (!element) {
    element = document.querySelector(`[id="${id}"]`);
  }
  
  if (element) {
    const header = document.querySelector('header');
    const headerOffset = header ? header.offsetHeight : 80;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset - 20;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
  } else {
    console.warn(`Element with ID "${id}" not found`);
  }
};

export const useScrollToHash = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      
      setTimeout(() => {
        scrollToElement(id);
        
        window.history.pushState({}, '', href);
      }, 10);
    }
  };
  
  return handleClick;
}; 