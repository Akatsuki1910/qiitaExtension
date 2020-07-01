const config = {
  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(233, 30, 99, 0.95)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(205, 220, 57, 0.9)',
    'rgba(255, 235, 59, 0.95)',
    'rgba(255, 193, 7, 1)'
  ],

  components: {
    preview: true,
    opacity: true,
    hue: true,

    interaction: {
      hex: true,
      rgba: true,
      hsva: true,
      input: true,
      clear: true,
      save: true,
    },
  },
}

const storageColorArr = ["headerColor","topLinkColor","topLinkColorVisited","topLinkColorHover","topUsernameColor","topUsernameColorVisited","topUsernameColorHover"];
let pickrArr = [];

let d = "";
chrome.storage.sync.get((data) => {
  console.log(data);
  d=data;
  for(let i in storageColorArr){
    const dColor = d[storageColorArr[i]];
    pickrArr[i] = new Pickr(Object.assign({
      el: '#c'+i,
      default: dColor,
    }, config));
    pickrArr[i]
    .on('save', (color) => {
      let rgbaStr = "";
      if(color != null){
        const rgba = color.toRGBA();
        const r = rgba[0];
        const g = rgba[1];
        const b = rgba[2];
        const a = rgba[3];
        rgbaStr = "rgba("+r+","+g+","+b+","+a+")";
      }
      chrome.storage.sync.set({
        [storageColorArr[i]]: rgbaStr
      }, () => {
        console.log('color is ' + rgbaStr);
      })
    });
  }
});