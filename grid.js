function addLines(){
    var body = document.body,
        root = body.parentElement,
        style = getComputedStyle(root),
        row = parseFloat(style.fontSize),
        height = parseFloat(style.height),
        qtyOfRows = Math.floor(height / row);
        console.log(height, row)

    for(var i = 0; i <= qtyOfRows; i++){
        addLine(root, row, i);
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


function grid(request, sender, sendResponse) {
    console.log(request.qtyCols);
    addLines();
    chrome.runtime.onMessage.removeListener(grid);
}

chrome.runtime.onMessage.addListener(grid);
