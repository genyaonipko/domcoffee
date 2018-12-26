
const initialState = {
  balerina: 0,
  gourme: 0,
  orient: 0,
  servus: 0,
  sera: 0,
  rose: 0,
  opera: 0,
  barista: 0,
  nero: 0,
  italia: 0,
  marone: 0,
  pura: 0,
  verde: 0,
  cote: 0,
  trope: 0,
  java: 0,
  efiopia: 0,
  columbia: 0,
  crema: 0,
};

export const reduceAllPositions = payload => {
  const keys = Object.keys(initialState);
  const concatObj = Object.assign({}, initialState);
  const dashboardInform = payload.reduce((previousValue, currentItem) => {
    for (let i = 0; i < keys.length; i += 1) {
      const current = !Number.isNaN(+currentItem.dashboardInform[keys[i]])
        ? +currentItem.dashboardInform[keys[i]]
        : 0;
      concatObj[keys[i]] = +previousValue[keys[i]] + current;
    }
    return { ...concatObj };
  }, initialState);
  return dashboardInform;
};

export const o = 1