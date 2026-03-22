<template>
  <UDashboardPanel id="settings">
    <template #header>
      <UDashboardNavbar title="Configurações" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="w-full h-full text-center items-center">
        <h1>Configurações</h1>
        <p>(Configurações aqui)</p>
      </div>
    </template>
  </UDashboardPanel>
</template>
<script setup></script>
