<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 class="text-5xl font-bold text-gray-800 mb-3">Testando...</h1>
    
    <input type="file" @change="handleFileSelect">
    <canvas id="pdf-canvas"></canvas>
    <a href="/">Voltar pra home</a>
  </div>
</template>
<script setup>
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker.mjs?url";

GlobalWorkerOptions.workerSrc = worker;

const handleFileSelect = (event) => {
  let file = event.target.files[0];

  let fileReader = new FileReader();

  fileReader.onload = (event) => {
    let typedarray = new Uint8Array(event.target.result);

    let loadingTask = getDocument(typedarray);

    loadingTask.promise.then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        let scale = 1.5;
        let viewport = page.getViewport({scale: scale});

        let canvas = document.getElementById("pdf-canvas");
        let context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        let renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        let renderTask = page.render(renderContext);
        renderTask.promise.then(function () {

        });
      }, function (reason) {
        console.error(reason);
      })
    });
  }

  fileReader.readAsArrayBuffer(file);
};
</script>
