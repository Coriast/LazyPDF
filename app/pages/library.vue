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
        <Bookshelf />
        <Bookshelf />
        <Bookshelf />
      </div>
    </template>
  </UDashboardPanel>
</template>
