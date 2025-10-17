<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl select-none w-11/12 max-w-6xl text-left">Categoria</h1>

    <div class="flex justify-center rounded-xl border border-zinc-600/70 my-3 w-11/12 max-w-6xl">
      <UCarousel v-slot="{ item }" arrows :items="items" :ui="{ item: 'basis-1/5' }" :prev-icon="prevIcon" :next-icon="nextIcon" class="p-2">
        <NuxtLink :to="item.to" class="block overflow-hidden rounded-md">
          <img :src="item.src" width="234" height="312" class="object-cover w-full h-auto transition-transform hover:scale-110" />
        </NuxtLink>
      </UCarousel>
    </div>

    <USeparator size="md" class="my-4 w-11/12 max-w-6xl" />
  </div>
</template>

<script setup lang="ts">
const items = [
  { src: "https://picsum.photos/312/468?random=1", to: "/pdfViewer" },
  { src: "https://picsum.photos/312/468?random=2", to: "/pdfViewer" },
  { src: "https://picsum.photos/312/468?random=3", to: "/pdfViewer" },
  { src: "https://picsum.photos/312/468?random=4", to: "/pdfViewer" },
  { src: "https://picsum.photos/312/468?random=5", to: "/pdfViewer" },
  { src: "https://picsum.photos/312/468?random=6", to: "/pdfViewer" },
  { src: "https://picsum.photos/312/468?random=7", to: "/pdfViewer" },
  { src: "https://picsum.photos/312/468?random=8", to: "/pdfViewer" },
];

const prevIcon = "i-lucide-chevron-left";
const nextIcon = "i-lucide-chevron-right";
</script>
