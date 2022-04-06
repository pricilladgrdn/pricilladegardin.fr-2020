<template>
  <div class="flex flex-col">
    <div
      class="relative pl-3 pt-3 pb-2 hover:underline select-none after:content-[''] after:absolute after:-bottom-3 after:left-0 after:right-0 after:h-3 after:bg-gradient-to-b after:from-white after:to-transparent"
      @click="showBiography = !showBiography"
    >
      {{ $t('about') }}
    </div>
    <div class="px-3 pt-2 pb-3 flex flex-col overflow-auto">
      <div v-show="showBiography" v-html="biographyHtml"></div>
      <div v-show="!showBiography">
        <ProjectInfo
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          :is-current-project="index == currentIndex"
          @click.native="$emit('changeProject', index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import Vue, { PropOptions } from 'vue'
import { IAuthor } from '~/interfaces/author'
import { IProject } from '~/interfaces/project'

export default Vue.extend({
  props: {
    projects: {
      type: Array,
      required: true,
    } as PropOptions<IProject[]>,
    currentIndex: {
      type: Number,
      default: 0,
    },
    author: {
      type: Object,
      required: true,
    } as PropOptions<IAuthor>,
  },
  data() {
    return {
      showBiography: false,
    }
  },
  computed: {
    biographyHtml(): string {
      return documentToHtmlString(this.author.biography)
    },
  },
})
</script>
