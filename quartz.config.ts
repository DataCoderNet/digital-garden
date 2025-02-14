import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🍁Lucas' Garden",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://0-lucas.github.io/digital-garden/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      cdnCaching: true,
      typography: {
        header: "Outfit",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#dde2ed",
          gray: "#b48ead",
          darkgray: "#2E3440",
          dark: "#bf616a",
          secondary: "#3b4252",
          tertiary: "#b48ead",
          highlight: "#fceac5",
        },
        darkMode: {
          light: "#2e3440",
          lightgray: "#4C566A",
          gray: "#81A1C1",
          darkgray: "#ffffff",
          dark: "#EBCB8B",
          secondary: "#d8dee9",
          tertiary: "#81A1C1",
          highlight: "#4C566A",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        // you can add 'git' here for last modified from Git
        // if you do rely on git for dates, ensure defaultDateType is 'modified'
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        // uses themes bundled with Shikiji, see https://shikiji.netlify.app/themes
        theme: {
          light: "tokyo-night",
          dark: "tokyo-night",
        },
        // set this to 'true' to use the background color of the Shikiji theme
        // if set to 'false', will use Quartz theme colors for background
        keepBackground: true,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
