function addLines(baseStyle, gridContainer){
    var row = parseFloat(baseStyle.fontSize),
        height = parseFloat(baseStyle.height),
        qtyOfRows = Math.floor(height / row);

    for(var i = 0; i <= qtyOfRows; i++){
        addLine(gridContainer, row, i);
    }
}

function createLine(top){
    var div = document.createElement('div');
    div.style.width = '100%';
    div.style.borderBottom = 'solid 1px';
    div.style.zIndex= '999';

    div.style.position = 'absolute';
    div.style.top = top + 'px';

    return div;
}


function addLine(parent, rowHeight, i){
    var lineEl = createLine(i * rowHeight);
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
        container = addContainer(body);

    addLines(style, container);

    chrome.runtime.onMessage.removeListener(grid);
}

chrome.runtime.onMessage.addListener(grid);
