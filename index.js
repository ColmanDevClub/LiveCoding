const totalSizeInBytes = 100000000;

let usedSize = 0;

const initApp = () => {
  usedSize = Number(window.localStorage.getItem("usedSize"));
  updateDashboard(usedSize);
}

const onFileInputChange = (fileInputElement) => {
  const fileName = fileInputElement.value;
  const isImgFile = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName);

  if (isImgFile) {
    const file = fileInputElement.files[0];
    updateFile(file);
  } else {
    alert("Invalid file type!");
  }
};

const updateFile = (file) => {
  const fileSize = file.size;

  if (usedSize + fileSize < totalSizeInBytes) {
    usedSize = usedSize + fileSize;
    updateDashboard(usedSize);
    window.localStorage.setItem("usedSize", usedSize);
  } else {
    alert("Not enough size!");
  } 
}

const updateDashboard = (usedSize) => {
  const formattedUsedSize = getFormattedBytes(usedSize)
  const usedSizeElement = document.getElementById("used-size");
  usedSizeElement.innerText = formattedUsedSize.size;
  const usedSizeUnitElement = document.getElementById("used-size-unit");
  usedSizeUnitElement.innerText = formattedUsedSize.unit;

  const formattedRemainSize = getFormattedBytes(totalSizeInBytes - usedSize)
  const remainSizeElement = document.getElementById("remain-size");
  remainSizeElement.innerHTML = formattedRemainSize.size;
  const remainSizeUnitElement = document.getElementById("remain-size-unit");
  remainSizeUnitElement.innerText = formattedRemainSize.unit;

  const formattedTotalSize = getFormattedBytes(totalSizeInBytes);
  const maxSizeElement = document.getElementById("max-size");
  maxSizeElement.innerText = formattedTotalSize.size;
  const totalSizeUnitElement = document.getElementById("total-size-unit");
  totalSizeUnitElement.innerText = formattedTotalSize.unit;

  const progressBarClr = document.getElementById("progress-bar-clr");
  progressBarClr.style.width = (usedSize / totalSizeInBytes) * 100 + "%";

  const progressBarCircle = document.getElementById("progress-bar-circle");
  if (usedSize > 0) progressBarCircle.style.right = "0";
  else progressBarCircle.style.right = "-10px";
}

const getFormattedBytes = (bytes) => {
  const decimals = 2;
  if (!+bytes) {
    return {
      size: 0, unit: 'Bytes'
    }
  } 
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return  {
    size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    unit: sizes[i]
  }
}

const reset = () => {
  usedSize = 0;
  updateDashboard(usedSize);
  window.localStorage.setItem("usedSize", 0);
}

initApp();
