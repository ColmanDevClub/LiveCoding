var sizeUnitElements = document.getElementsByClassName("size-unit");

for (var i = 0; i < sizeUnitElements.length; i++) {
  sizeUnitElements[i].innerHTML = "MB";
}
const totalSize = 100;
let usedSize = 0;

updateSizes();

const onFileInputChange = (event) => {
  const fileName = event.value;
  const isImgFile = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName);

  if (isImgFile) {
    const file = event.files[0];
    const fileSize = parseInt(file.size / 1024 / 1024);
    if (usedSize + fileSize <= totalSize) {
      usedSize = usedSize + fileSize;
      window.localStorage.setItem("usedSize", usedSize);

      updateSizes();
    } else {
      alert("Not enough size!");
    } 
  } else {
    alert("Invalid file type!");
  }
}

function updateSizes() {
  const maxSizeElement = document.getElementById("max-size");
  const usedSizeElement = document.getElementById("used-size");
  const remainSizeElement = document.getElementById("remain-size");
  const progressBarClr = document.getElementById("progress-bar-clr");
  const progressBarCircle = document.getElementById("progress-bar-circle");

  usedSize = JSON.parse(window.localStorage.getItem("usedSize"));
  usedSizeElement.innerText = usedSize;
  remainSizeElement.innerHTML = totalSize - usedSize;
  maxSizeElement.innerText = totalSize;
  progressBarClr.style.width = (usedSize / totalSize) * 100 + "%";
  if (usedSize > 0) progressBarCircle.style.right = "0";
  else progressBarCircle.style.right = "-10px";
}

function reset() {
  window.localStorage.setItem("usedSize", 0);
  updateSizes();
}
