<template>
  <div v-if="fileSelected" ref="viewerContainer" class="overflow-auto absolute w-full h-full">
    <div id="viewer" class="pdfViewer"></div>
  </div>
  <div v-else class="w-full h-full flex justify-center items-center">
    <UFileUpload class="w-52" v-model="fileSelected" @change="handleFileSelect"></UFileUpload>
  </div>
</template>

<script setup>
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { EventBus, PDFFindController, PDFLinkService, PDFViewer } from "pdfjs-dist/web/pdf_viewer.mjs";

GlobalWorkerOptions.workerSrc = worker;

const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;
const SEARCH_FOR = "";
const container = useTemplateRef('viewerContainer');
const fileSelected = ref(null);

const handleFileSelect = () => {
  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    const resultArray = new Uint8Array(event.target.result);

    const eventBus = new EventBus();
    const pdfLinkService = new PDFLinkService({
      eventBus
    });
  
    const pdfFindController = new PDFFindController({
      eventBus,
      linkService: pdfLinkService
    });
    
    const pdfViewer = new PDFViewer({
      container: container.value,
      eventBus: eventBus,
      linkService: pdfLinkService,
      findController: pdfFindController
    });
    pdfLinkService.setViewer(pdfViewer);
  
    eventBus.on("pagesinit", () => {
      pdfViewer.currentScaleValue = "page-width";
  
      if(SEARCH_FOR)
      {
        eventBus.dispatch("find", {type: "", query: SEARCH_FOR });
      }
    });
  
    const loadingTask = getDocument({
      data: resultArray,
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED,
      enableXfa: true
    });
  
    loadingTask.promise.then((pdfDocument) => {
      pdfViewer.setDocument(pdfDocument);
    
      pdfLinkService.setDocument(pdfDocument, null);
    });
  }

  fileReader.readAsArrayBuffer(fileSelected.value);
}

</script>
