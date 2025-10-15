<template>
  <UDashboardPanel id="home">
      <template #header>
        <div class="flex">
          <a href="/test">Teste</a>
          <UFileUpload v-model="filePDF" @change="handleUploadPDF" accept="pdf" variant="button" class="w-20 h-10"/>
        </div>
      </template>
      <template #body>
        <canvas id="render"></canvas>
      </template>
  </UDashboardPanel>
</template>

<script setup>
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker.mjs?url";

const filePDF = ref(null);

GlobalWorkerOptions.workerSrc = worker;

const handleUploadPDF = (event) => {
  let fileReader = new FileReader();

  fileReader.onload = (event) => {
    let resultArray = new Uint8Array(event.target.result);

    let loadingTask = getDocument(resultArray);
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
  }

  fileReader.readAsArrayBuffer(filePDF.value);
}



</script>
