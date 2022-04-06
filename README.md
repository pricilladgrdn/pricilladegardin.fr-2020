# pricilladegardin.fr

Source code of my [website](https://pricilladegardin.fr)

## Stack

- [Nuxt JS](https://nuxtjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Contentful](https://www.contentful.com/)

## Contentful Setup

Create a new space and install [color picker extension](https://github.com/jbendercode/contentful-ui-ext-colour-picker)

Using [Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/installation/), import content models:

```bash
contentful space import --space-id <SPACE_ID> --content-file contentful/export.json
```

Create some projects entries and a single author entry.

Set following environment variables (or use a dotenv file):

- CONTENTFUL_SPACE_ID : The ID of your Contentful space
- CONTENTFUL_ACCESS_TOKEN : Your Contentful access token
- CONTENTFUL_AUTHOR_ENTRY_ID : The ID of the author entry

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

Browse [http://localhost:3000](http://localhost:3000)

## Google Analytics Setup

Set following environment variable:

- GA_TRACKING_ID: Your Google Analytics trackind ID

Nothing else to do thanks to [nuxt/google-analytics](https://google-analytics.nuxtjs.org/)
