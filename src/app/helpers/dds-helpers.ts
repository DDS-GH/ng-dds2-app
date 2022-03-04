const foundEls = [];

const handleFound = (elems, initr) => {
  elems.forEach((elem) => {
    if (!foundEls.includes(elem.id)) {
      foundEls.push(elem.id);
      initr.command(elem);
    }
  });
};

export const createObserver = (waitForElements) => {
  // As assistance for delayed initialization, define an observer to watch for changes
  var observers = [];
  waitForElements.forEach(function (initr) {
    observers.push(
      new MutationObserver(function (mutations, me) {
        var targetElems = document.querySelectorAll(initr.selectr);
        if (targetElems.length > 0) {
          handleFound(targetElems, initr);
          me.disconnect(); // stop observing
          return;
        }
      })
    );
  });

  // start observing
  observers.forEach(function (observer) {
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  });

  return observers;
};

export const Uuid = () => {
  const windowObj: any = window;
  const winCrypto = windowObj.crypto || windowObj.msCrypto;
  let index = winCrypto.getRandomValues(new Uint32Array(1))[0];
  index = +`${index}`.substr(0, 1);
  const uuid = winCrypto.getRandomValues(new Uint32Array(10))[index];
  return uuid;
};

export const setElementId = (elId: string, elName = `el`): string => {
  if (elId) {
    return elId;
  }
  elId = `${elName}-${Uuid()}`;
  return elId;
};

export const stringToBoolean = (thisState) => {
  if (thisState === "1" || thisState === "true") {
    return true;
  }
  return false;
};

export const pascalDash = function (key) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

export const hasChanges = (changes: any) => {
  if (
    changes &&
    !changes.firstChange &&
    changes.previousValue !== changes.currentValue
  ) {
    return true;
  }
  return false;
};

export const ddsIcon = (icon: string): string => {
  if (icon) {
    if (!icon.match(/dds__icon--/)) {
      icon = `dds__icon--${icon}`;
    }
  }
  return icon;
};

export const ddsLink = (link: string): string => {
  if (!link) {
    link = `#`;
  }
  return link;
};
