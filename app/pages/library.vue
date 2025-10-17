<template>
  <UDashboardPanel id="library">
    <template #header>
      <UDashboardNavbar title="Biblioteca" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="w-full h-full text-center items-center">
        <h1>Hello World!</h1>
        <p>(Conjunto de livro e etc)</p>
      </div>
    </template>
  </UDashboardPanel>
</template>
<script setup></script>
