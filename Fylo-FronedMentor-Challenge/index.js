var uploadBtn = document.getElementById("upload-file-btn");
var sizeUnitElements = document.getElementsByClassName("size-unit");

for (var i = 0; i < sizeUnitElements.length; i++) {
  sizeUnitElements[i].innerHTML = "MB";
}
var totalSize = 100;
var maxSizeElement = document.getElementById("max-size");
var usedSize = 0;
var usedSizeElement = document.getElementById("used-size");
var remainSizeElement = document.getElementById("remain-size");
var progressBarClr = document.getElementById("progress-bar-clr");
var progressBarCircle = document.getElementById("progress-bar-circle");

var fileName;
var validFile;
var fileSize;
// window.localStorage.setItem("usedSize", 0);
updateSizes();
uploadBtn.addEventListener("change", () => {
  fileName = uploadBtn.value;
  validFile = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName);
  console.log(validFile);
  if (!validFile) {
    alert("Invalid file type!");
  } else {
    fileSize = uploadBtn.files[0];
    fileSize = parseInt(fileSize.size / 1000 / 1000);
    usedSize += fileSize;
    if (usedSize > totalSize) {
      alert("Not enough size!");
      usedSize -= fileSize;
    }
    window.localStorage.setItem("usedSize", usedSize);
    console.log();

    updateSizes();
  }
});

function updateSizes() {
  usedSize = JSON.parse(window.localStorage.getItem("usedSize"));
  usedSizeElement.innerText = usedSize;
  remainSizeElement.innerHTML = totalSize - usedSize;
  maxSizeElement.innerText = totalSize;
  progressBarClr.style.width = (usedSize / totalSize) * 100 + "%";
  if (usedSize > 0) progressBarCircle.style.right = "0";
  else progressBarCircle.style.right = "-10px";
}

document.getElementById("zero-size").addEventListener("click", () => {
  reset();
});

function reset() {
  window.localStorage.setItem("usedSize", 0);
  updateSizes();
}
