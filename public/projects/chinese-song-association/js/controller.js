Controller = class {
  constructor() {
  }

  click = function(mousePos, widgets, displayRatio) {
    for(let i = 0; i < widgets.length; i++) {
      if (widgets[i].interactable) {
        if(mousePos.x / displayRatio > widgets[i].posX && mousePos.x / displayRatio < widgets[i].posX + widgets[i].width && mousePos.y / displayRatio > widgets[i].posY && mousePos.y / displayRatio < widgets[i].posY + widgets[i].height) {
          return widgets[i];
        }
      }
    }
  }
};
