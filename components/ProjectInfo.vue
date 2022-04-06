<template>
  <div
    class="mb-3"
    :class="[isCurrentProject ? 'text-black' : 'text-gray-400']"
  >
    <div>{{ project.title }}</div>
    <div>{{ project.sponsor }}</div>
    <div>
      <span>{{ formattedDate }}</span>
      <span> - </span>
      <span class="font-serif italic">{{ project.type.join(', ') }}</span>
    </div>
    <div v-show="isCurrentProject" v-html="descriptionHtml"></div>
  </div>
</template>

<script lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import Vue, { PropOptions } from 'vue'
import { IProject } from '~/interfaces/project'

export default Vue.extend({
  props: {
    project: {
      type: Object,
      required: true,
    } as PropOptions<IProject>,
    isCurrentProject: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    descriptionHtml(): string {
      return documentToHtmlString(this.project.description)
    },
    formattedDate(): string {
      if (this.project.endYear) {
        return `${this.project.startYear}.${this.project.endYear
          .toString()
          .substring(2)}`
      } else {
        return this.project.startYear.toString()
      }
    },
  },
})
</script>
