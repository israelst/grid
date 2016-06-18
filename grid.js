function rhythmGenerator(rhythm){
    var beat = -1;
    return function(){
        beat = (beat + 1) % rhythm.length;
        return rhythm[beat];
    };
}

function addLines(baseStyle, gridContainer, beat){
    var row = parseFloat(baseStyle.fontSize),
        height = parseFloat(baseStyle.height),
        qtyOfRows = Math.floor(height / row);

    for(var i = 0; i <= qtyOfRows; i++){
        if(beat()) addLine(gridContainer, i);
    }
}

function createLine(top){
    var div = document.createElement('div');
    div.style.width = '100%';
    div.style.borderBottom = 'solid 1px';
    div.style.zIndex= '999';

    div.style.position = 'absolute';
    div.style.top = top + 'em';

    return div;
}

function addLine(parent, i){
    var lineEl = createLine(i);
    parent.appendChild(lineEl);
}

function addContainer(parent){
    var gridContainer = document.createElement('div');
    gridContainer.id = 'addon-grid-container';
    return parent.appendChild(gridContainer);
}

function grid(request, sender, sendResponse) {
    var body = document.body,
        root = document.body.parentElement,
        style = getComputedStyle(root),
        container = addContainer(body),
        rhythm = [1, 1, 0, 0],
        beat = rhythmGenerator(rhythm);

    addLines(style, container, beat);

    chrome.runtime.onMessage.removeListener(grid);
}

chrome.runtime.onMessage.addListener(grid);
