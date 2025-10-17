<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const toast = useToast();

const open = ref(false);

const links = [
  [
    {
      label: "Home",
      icon: "i-lucide-house",
      to: "/",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Biblioteca",
      icon: "i-lucide-book",
      to: "/library",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "PDF Viewer",
      icon: "i-lucide-braces",
      to: "/pdfViewer",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Teste",
      icon: "i-lucide-braces",
      to: "/test",
      onSelect: () => {
        open.value = false;
      },
    },
  ],
  [
    {
      label: "Configurações",
      to: "/settings",
      icon: "i-lucide-settings",
      defaultOpen: false,
      type: "trigger",
      children: [
        {
          label: "General",
          to: "/settings",
          exact: true,
          onSelect: () => {
            open.value = false;
          },
        },
        {
          label: "Outra config 1",
          to: "/settings/othersetting",
          onSelect: () => {
            open.value = false;
          },
        },
        {
          label: "Outra config 2",
          to: "/settings/anothersetting",
          onSelect: () => {
            open.value = false;
          },
        },
      ],
    },
  ],
] satisfies NavigationMenuItem[][];

const groups = computed(() => [
  {
    id: "links",
    label: "Go to",
    items: links.flat(),
  },
  {
    id: "code",
    label: "Code",
    items: [
      {
        id: "source",
        label: "View source code",
        icon: "i-lucide-github",
        to: "https://github.com/Coriast/LazyPDF",
        target: "_blank",
      },
    ],
  },
]);
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar id="default" v-model:open="open" collapsible resizable class="bg-elevated/25" :ui="{ footer: 'lg:border-t lg:border-default' }">
      <template #header="{ collapsed }">
        <UTooltip text="LazyPDF" :disabled="!collapsed">
          <div class="flex items-center justify-center gap-2 w-full" :class="collapsed ? 'justify-center' : 'justify-start pl-2'">
            <UIcon name="i-lucide-book-open-text" class="size-6" />
            <h1 v-if="!collapsed" class="text-xl select-none font-semibold tracking-tight">LazyPDF</h1>
          </div>
        </UTooltip>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" tooltip popover />

        <UNavigationMenu :collapsed="collapsed" :items="links[1]" orientation="vertical" tooltip class="mt-auto" />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
