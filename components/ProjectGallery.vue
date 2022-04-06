<template>
  <div
    class="transition-colors p-3 h-full w-full flex flex-col"
    :style="{ color: project.textColor }"
  >
    <div class="mb-2">{{ author.firstName }} {{ author.lastName }}</div>
    <div class="flex-1"></div>
    <ImageCarousel :images="project.images" :current-index="currentIndex" />
    <div class="mt-2">
      <span class="mr-2">{{ project.title }} - {{ project.sponsor }}</span>
      <span class="font-serif italic"
        >{{ currentIndex + 1 }} – {{ project.images.length }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IAuthor } from '~/interfaces/author'
import { IProject } from '~/interfaces/project'

export default Vue.extend({
  props: {
    project: {
      type: Object,
      required: true,
    } as PropOptions<IProject>,
    currentIndex: {
      type: Number,
      default: 0,
    },
    author: {
      type: Object,
      required: true,
    } as PropOptions<IAuthor>,
  },
})
</script>
