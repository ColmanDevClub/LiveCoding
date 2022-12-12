const totalSizeInBytes = 100000000;

let usedSizeInBytes = 0;

const initApp = () => {
  usedSizeInBytes = Number(window.localStorage.getItem("usedSizeInBytes"));
  updateDashboard(usedSizeInBytes);
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
  const fileSizeInBytes = file.size;

  if (usedSizeInBytes + fileSizeInBytes < totalSizeInBytes) {
    usedSizeInBytes = usedSizeInBytes + fileSizeInBytes;
    updateDashboard(usedSizeInBytes);
    window.localStorage.setItem("usedSizeInBytes", usedSizeInBytes);
  } else {
    alert("Not enough size!");
  } 
}

const updateDashboard = (usedSizeInBytes) => {
  updateSizes(usedSizeInBytes, "used-size", "used-size-unit");
  updateSizes(totalSizeInBytes - usedSizeInBytes, "remain-size", "remain-size-unit");
  updateSizes(totalSizeInBytes, "max-size", "total-size-unit");

  const progressBarClr = document.getElementById("progress-bar-clr");
  progressBarClr.style.width = (usedSizeInBytes / totalSizeInBytes) * 100 + "%";

  const progressBarCircle = document.getElementById("progress-bar-circle");
  if (usedSizeInBytes > 0) progressBarCircle.style.right = "0";
  else progressBarCircle.style.right = "-10px";
}

const updateSizes = (sizeInBytes, sizeElementId, unitsElementId) => {
  const formattedSize = getFormattedBytes(sizeInBytes)
  const usedSizeElement = document.getElementById(sizeElementId);
  usedSizeElement.innerText = formattedSize.size;
  const usedSizeUnitElement = document.getElementById(unitsElementId);
  usedSizeUnitElement.innerText = formattedSize.unit;
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
  usedSizeInBytes = 0;
  updateDashboard(usedSizeInBytes);
  window.localStorage.setItem("usedSizeInBytes", 0);
}

initApp();
