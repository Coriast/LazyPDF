<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="w-full h-full text-center items-center">
        <h1>Hello World!</h1>
        <p>(Livros recentes, dentre outros)</p>
      </div>
    </template>
  </UDashboardPanel>
</template>
<script setup></script>
