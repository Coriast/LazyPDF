<template>      
  <canvas id="render"></canvas>
</template>

<script setup>
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker.mjs?url";

GlobalWorkerOptions.workerSrc = worker;

const hardCodedFilePath = "sample.pdf"

onMounted(() => {
  let loadingTask = getDocument(hardCodedFilePath);
  loadingTask.promise.then(function(pdf) {
    pdf.getPage(1).then(function(page) {
      let scale = 1.5;
      let viewport = page.getViewport({scale: scale});

      let canvas = document.getElementById("render");
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
});

</script>
