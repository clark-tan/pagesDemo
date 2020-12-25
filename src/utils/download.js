export function downloadFile (url, filename, mime, bom) {
    // var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
    // var blob = new Blob(blobData, { type: mime || "application/octet-stream" });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      // window.navigator.msSaveBlob(blob, filename);
    } else {
      // var blobURL = window.URL.createObjectURL(blob);
      var blobURL = url // 暂时当做URL处理后续需要完善多类型方式
      var tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = encodeURI(blobURL)
      tempLink.setAttribute('download', filename)

      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      // This allows you to download files in desktop safari if pop up blocking
      // is enabled.
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
      }

      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
      // window.URL.revokeObjectURL(blobURL);
    }
}
