<template>  
  <div id="viewerContainer" class="overflow-auto absolute w-full h-full">
    <div id="viewer" class="pdfViewer"></div>
  </div>
</template>

<script setup>
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker.mjs?url";

import { EventBus, PDFFindController, PDFLinkService, PDFViewer } from "pdfjs-dist/web/pdf_viewer.mjs";

GlobalWorkerOptions.workerSrc = worker;

const hardCodedFilePath = "sample.pdf"

const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;
const SEARCH_FOR = "";

onMounted(async () => {
  const container = document.getElementById('viewerContainer');

  const eventBus = new EventBus();
  const pdfLinkService = new PDFLinkService({
    eventBus
  });

  const pdfFindController = new PDFFindController({
    eventBus,
    linkService: pdfLinkService
  });

  const pdfViewer = new PDFViewer({
    container: container,
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
    url: hardCodedFilePath,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    enableXfa: true
  });

  const pdfDocument = await loadingTask.promise;

  pdfViewer.setDocument(pdfDocument);

  pdfLinkService.setDocument(pdfDocument, null);
});

</script>
