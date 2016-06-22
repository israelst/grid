function beatGenerator(rhythm){
    var beat = -1;
    return function(){
        beat = (beat + 1) % rhythm.length;
        return rhythm[beat];
    };
}

function createLine(top){
    var div = document.createElement('div');
    div.style.width = '100%';
    div.style.borderBottom = 'dashed 1px';
    div.style.zIndex= '999';

    div.style.position = 'absolute';
    div.style.top = top + 'em';

    return div;
}

function addContainer(parent){
    var gridContainer = document.createElement('div');
    gridContainer.id = 'addon-grid-container';
    return parent.appendChild(gridContainer);
}

function qtyOfRows(style){
    var height = parseFloat(style.height),
        rowHeight = parseFloat(style.fontSize);
    return Math.floor(height / rowHeight);
}

function grid(request, sender, sendResponse) {
    var body = document.body,
        rootStyle = getComputedStyle(body.parentElement),
        container = addContainer(body),
        addLine = container.appendChild.bind(container),
        rhythm = [1, 1, 1, 1],
        beat = beatGenerator(rhythm);

    for(var i = 0; i <= qtyOfRows(rootStyle); i++){
        if(beat()) addLine(createLine(i));
    }

    chrome.runtime.onMessage.removeListener(grid);
}

chrome.runtime.onMessage.addListener(grid);
