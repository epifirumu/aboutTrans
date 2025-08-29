import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  vite: {
    plugins: [
      UnoCSS(),
    ],
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
    },
  },
  title: 'aboutTrans',
  description: '关于跨性别，你想知道的都在这里～这是一个面向不了解或希望了解跨性别群体的人的一个科普网站，同时，社群伙伴们也可以在此获取到有用的信息！',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { property: 'og:image', content: 'https://aboutrans.info/social.png' }],
  ],
  cleanUrls: true,
  markdown: {
    config(md) {
      md.use(footnote)
    },
  },
  themeConfig: {
    logo: '/favicon.png',
    editLink: {
      pattern: 'https://github.com/AB-aboutTrans/aboutTrans/edit/main/docs/:path',
      text: '对当前页面提出修改建议',
    },
    search: {
      provider: 'algolia',
      options: {
        appId: 'KC9PIGEXUW',
        apiKey: 'e38aa16c6e13667ccb1cb7a03069aa1f',
        indexName: 'index_ab_vitepress_crawls',
        askAi: {
          assistantId: 'LGsLW0x1ShDf'
        },
        searchParameters: {
          facetFilters: []
        },
        locales: {
          root: {
            placeholder: '搜索文档或向 AI 提问',
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                searchBox: {
                  clearButtonTitle: '清除查询条件',
                  clearButtonAriaLabel: '清除查询条件',
                  closeButtonText: '关闭',
                  closeButtonAriaLabel: '关闭',
                  placeholderText: '搜索文档或向 AI 提问',
                  placeholderTextAskAi: '向 AI 提问：',
                  placeholderTextAskAiStreaming: '思考中...',
                  searchInputLabel: '搜索',
                  backToKeywordSearchButtonText: '返回关键字搜索',
                  backToKeywordSearchButtonAriaLabel: '返回关键字搜索'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除',
                  recentConversationsTitle: '最近的对话',
                  removeRecentConversationButtonTitle: '从历史记录中删除对话'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '请检查网络连接'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '您可以尝试查询',
                  reportMissingResultsText: '您认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
                resultsScreen: { askAiPlaceholder: '向 AI 提问： ' },
                askAiScreen: {
                  disclaimerText: '负责生成回答的 AI 也可能犯错，请注意核查回复。',
                  relatedSourcesText: '相关来源',
                  thinkingText: '思考中...',
                  copyButtonText: '复制',
                  copyButtonCopiedText: '已复制！',
                  copyButtonTitle: '复制',
                  likeButtonTitle: '赞',
                  dislikeButtonTitle: '踩',
                  thanksForFeedbackText: '感谢您的反馈！',
                  preToolCallText: '搜索中...',
                  duringToolCallText: '搜索 ',
                  afterToolCallText: '已搜索'
                },
                footer: {
                  selectText: '查看',
                  submitQuestionText: '提交问题',
                  selectKeyAriaLabel: 'Enter 键',
                  navigateText: '选择',
                  navigateUpKeyAriaLabel: '向上箭头',
                  navigateDownKeyAriaLabel: '向下箭头',
                  closeText: '关闭',
                  backToSearchText: '返回搜索',
                  closeKeyAriaLabel: 'Esc 键',
                  poweredByText: '搜索提供者'
                }
              }
            }
          }
        }
      }
    },
    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '深色模式',
    outlineTitle: '当前页面中',
    returnToTopLabel: '回到顶部',
    footer: {
      message: '本站内容基于 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans">CC BY 4.0</a> 许可发布',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} AB aboutTrans`,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: [
      { text: '主页', link: 'index' },
      { text: '关于', link: 'about' },
      { 
        text: '更多',
        items: [
          { 
            text: '更新记录',
            link: 'https://github.com/AB-aboutTrans/aboutTrans/commits/main/' 
          },
          { 
            text: '在 X 上关注',
            link: 'https://x.com/AB_aboutTrans'
          },
        ],
      },
      { 
        text: '字重',
        items: [
          { 
            text: '正文加粗',
            link: '#' 
          },
          { 
            text: '恢复默认',
            link: '#'
          },
        ],
      },
    ],
    sidebar: [
      {
        text: '目录',
        items: [
          { text: '概念术语', link: '/docs/terms' },
          { text: '医疗照护', link: '/docs/medical' },
          { text: '政策法规', link: '/docs/policy' },
          { text: '社会支持', link: '/docs/support' },
          { text: '纪念活动', link: '/docs/events' },
          { text: '误区问答', link: '/docs/faq' },
        ],
      },
    ],
  },
})
