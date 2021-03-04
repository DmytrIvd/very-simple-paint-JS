window.addEventListener("load", function onWindowLoad() {
  let Canvas = document.getElementById("canvas");

  let context = Canvas.getContext("2d");
  let mouseCords = document.getElementById("MouseCords");

  let group = document.getElementById("InstrumentsGroup");

  let clearButton = document.getElementById("ClearCanvas");

  let isMouseDown = false;
  // let linesArray = [];
  let currentsize = 5;
  let currrentColor = "rgb(200,20,100)";
  let mode = "";

  generatePallete(document.getElementById("Pallete"));
  SubscribeRadioButtons(group);

  Canvas.addEventListener("mousedown", function () {
    mousedown(canvas, event);
  });
  Canvas.addEventListener("mousemove", function () {
    mousemove(canvas, event);
  });
  Canvas.addEventListener("mouseup", mouseup);

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }
  function mousedown(canvas, evt) {
    isMouseDown = true;
    let currentPosition = getMousePos(canvas, evt);
    context.moveTo(currentPosition.x, currentPosition.y);
    context.beginPath();
    if (mode == "Pen") {
      context.globalCompositeOperation = "source-over";
      context.lineWidth = currentsize;
      context.strokeStyle = currrentColor;
    } else {
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = "50";
    }
    context.lineCap = "round";
  }
  function mousemove(canvas, evt) {
    if (isMouseDown) {
      let currentPosition = getMousePos(canvas, evt);
      context.lineTo(currentPosition.x, currentPosition.y);
      context.stroke();
      // store(
      //   currentPosition.x,
      //   currentPosition.y,
      //   context.lineWidth,
      //   context.strokeStyle
      // );
    }
    mouseCords.innerText = "(X=" + evt.clientX + "; Y=" + evt.clientY + ";)";
  }
  function mouseup() {
    isMouseDown = false;
    //   store();
  }
  // function store(x, y, s, c) {
  //   let line = {
  //     x: x,
  //     y: y,
  //     size: s,
  //     color: c,
  //   };
  //   linesArray.push(line);
  // }

  let clear = document.getElementById("ClearCanvas");
  clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  function generatePallete(pallete) {
    let colors = [
      "black",
      "gray",
      "white",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "magenta",
      "pink",
    ];
    for (const iterator of colors) {
      let inputBlock = document.createElement("input");
      inputBlock.setAttribute("type", "radio");
      inputBlock.setAttribute("autocomplete", "off");

      inputBlock.className = "btn-check";
      inputBlock.name = "Color-Box";
      inputBlock.value = iterator;
      inputBlock.id = iterator + "-block";
      inputBlock.addEventListener("change", function changePenColor(e) {
        ColorClick(e.target.value);
      });
      pallete.appendChild(inputBlock);

      let labelBlock = document.createElement("label");
      labelBlock.className += "btn btn-outline-light colorContainer";
      labelBlock.htmlFor = iterator + "-block";
      labelBlock.style.backgroundColor = iterator;
      pallete.appendChild(labelBlock);
    }
  }
  function ColorClick(color) {
    currrentColor = color;
  }

  let penSize = document.getElementById("PenSizeShow");
  let minusSize = document.getElementById("MinusPenSize");
  let plusSize = document.getElementById("PlusPenSize");
  plusSize.onclick = function () {
    if (currentsize < 80) {
      currentsize++;
      penSize.innerText = currentsize;
    } else {
      alert("Pen cannot be that big");
    }
  };
  minusSize.onclick = function () {
    if (currentsize > 1) {
      currentsize--;
      penSize.innerText = currentsize;
    } else {
      alert("Pen cannot be that small");
    }
  };

  function SubscribeRadioButtons(divNode) {
    let inputNodes = divNode.childNodes;
    for (let i = 0; i < inputNodes.length; ++i) {
      let inputNode = inputNodes[i];
      if (inputNode.type == "radio") {
        inputNode.addEventListener("change", function changeInstrument(e) {
          if (e.target.checked) {
            mode = e.target.value;
          }
        });
      }
    }
  }

  // redraw();
});
// function redraw() {
//   for (var i = 1; i < linesArray.length; i++) {
//     Context.beginPath();
//     Context.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
//     Context.lineWidth = linesArray[i].size;
//     Context.lineCap = "round";
//     Context.strokeStyle = linesArray[i].color;
//     Context.lineTo(linesArray[i].x, linesArray[i].y);
//     Context.stroke();
//   }
// }
