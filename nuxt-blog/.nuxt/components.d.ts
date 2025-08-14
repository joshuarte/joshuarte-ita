
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AppIcons': typeof import("../components/AppIcons.vue")['default']
    'PersonalProjectItem': typeof import("../components/PersonalProjectItem.vue")['default']
    'PortfolioPanel': typeof import("../components/PortfolioPanel.vue")['default']
    'PrismicImageWrapper': typeof import("../components/PrismicImageWrapper.vue")['default']
    'ProjectCard': typeof import("../components/ProjectCard.vue")['default']
    'ProjectImage': typeof import("../components/ProjectImage.vue")['default']
    'RecentPosts': typeof import("../components/RecentPosts.vue")['default']
    'RecentProjectsButton': typeof import("../components/RecentProjectsButton.vue")['default']
    'SocialIcons': typeof import("../components/SocialIcons.vue")['default']
    'WorkExperienceItem': typeof import("../components/WorkExperienceItem.vue")['default']
    'IconsDiscordIcon': typeof import("../components/icons/DiscordIcon.vue")['default']
    'IconsLinkedinIcon': typeof import("../components/icons/LinkedinIcon.vue")['default']
    'IconsLogoJoshuarte': typeof import("../components/icons/LogoJoshuarte.vue")['default']
    'IconsLogoLJM': typeof import("../components/icons/LogoLJM.vue")['default']
    'SectionsBioSection': typeof import("../components/sections/BioSection.vue")['default']
    'SectionsFooterSection': typeof import("../components/sections/FooterSection.vue")['default']
    'SectionsHeroSection': typeof import("../components/sections/HeroSection.vue")['default']
    'SectionsPersonalProjectsSection': typeof import("../components/sections/PersonalProjectsSection.vue")['default']
    'SectionsSkillsSection': typeof import("../components/sections/SkillsSection.vue")['default']
    'SectionsWorkSection': typeof import("../components/sections/WorkSection.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'PrismicEmbed': typeof import("@prismicio/vue")['PrismicEmbed']
    'PrismicImage': typeof import("@prismicio/vue")['PrismicImage']
    'PrismicLink': typeof import("@prismicio/vue")['PrismicLink']
    'PrismicText': typeof import("@prismicio/vue")['PrismicText']
    'PrismicRichText': typeof import("@prismicio/vue")['PrismicRichText']
    'PrismicTable': typeof import("@prismicio/vue")['PrismicTable']
    'SliceZone': typeof import("@prismicio/vue")['SliceZone']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAppIcons': LazyComponent<typeof import("../components/AppIcons.vue")['default']>
    'LazyPersonalProjectItem': LazyComponent<typeof import("../components/PersonalProjectItem.vue")['default']>
    'LazyPortfolioPanel': LazyComponent<typeof import("../components/PortfolioPanel.vue")['default']>
    'LazyPrismicImageWrapper': LazyComponent<typeof import("../components/PrismicImageWrapper.vue")['default']>
    'LazyProjectCard': LazyComponent<typeof import("../components/ProjectCard.vue")['default']>
    'LazyProjectImage': LazyComponent<typeof import("../components/ProjectImage.vue")['default']>
    'LazyRecentPosts': LazyComponent<typeof import("../components/RecentPosts.vue")['default']>
    'LazyRecentProjectsButton': LazyComponent<typeof import("../components/RecentProjectsButton.vue")['default']>
    'LazySocialIcons': LazyComponent<typeof import("../components/SocialIcons.vue")['default']>
    'LazyWorkExperienceItem': LazyComponent<typeof import("../components/WorkExperienceItem.vue")['default']>
    'LazyIconsDiscordIcon': LazyComponent<typeof import("../components/icons/DiscordIcon.vue")['default']>
    'LazyIconsLinkedinIcon': LazyComponent<typeof import("../components/icons/LinkedinIcon.vue")['default']>
    'LazyIconsLogoJoshuarte': LazyComponent<typeof import("../components/icons/LogoJoshuarte.vue")['default']>
    'LazyIconsLogoLJM': LazyComponent<typeof import("../components/icons/LogoLJM.vue")['default']>
    'LazySectionsBioSection': LazyComponent<typeof import("../components/sections/BioSection.vue")['default']>
    'LazySectionsFooterSection': LazyComponent<typeof import("../components/sections/FooterSection.vue")['default']>
    'LazySectionsHeroSection': LazyComponent<typeof import("../components/sections/HeroSection.vue")['default']>
    'LazySectionsPersonalProjectsSection': LazyComponent<typeof import("../components/sections/PersonalProjectsSection.vue")['default']>
    'LazySectionsSkillsSection': LazyComponent<typeof import("../components/sections/SkillsSection.vue")['default']>
    'LazySectionsWorkSection': LazyComponent<typeof import("../components/sections/WorkSection.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyPrismicEmbed': LazyComponent<typeof import("@prismicio/vue")['PrismicEmbed']>
    'LazyPrismicImage': LazyComponent<typeof import("@prismicio/vue")['PrismicImage']>
    'LazyPrismicLink': LazyComponent<typeof import("@prismicio/vue")['PrismicLink']>
    'LazyPrismicText': LazyComponent<typeof import("@prismicio/vue")['PrismicText']>
    'LazyPrismicRichText': LazyComponent<typeof import("@prismicio/vue")['PrismicRichText']>
    'LazyPrismicTable': LazyComponent<typeof import("@prismicio/vue")['PrismicTable']>
    'LazySliceZone': LazyComponent<typeof import("@prismicio/vue")['SliceZone']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AppIcons: typeof import("../components/AppIcons.vue")['default']
export const PersonalProjectItem: typeof import("../components/PersonalProjectItem.vue")['default']
export const PortfolioPanel: typeof import("../components/PortfolioPanel.vue")['default']
export const PrismicImageWrapper: typeof import("../components/PrismicImageWrapper.vue")['default']
export const ProjectCard: typeof import("../components/ProjectCard.vue")['default']
export const ProjectImage: typeof import("../components/ProjectImage.vue")['default']
export const RecentPosts: typeof import("../components/RecentPosts.vue")['default']
export const RecentProjectsButton: typeof import("../components/RecentProjectsButton.vue")['default']
export const SocialIcons: typeof import("../components/SocialIcons.vue")['default']
export const WorkExperienceItem: typeof import("../components/WorkExperienceItem.vue")['default']
export const IconsDiscordIcon: typeof import("../components/icons/DiscordIcon.vue")['default']
export const IconsLinkedinIcon: typeof import("../components/icons/LinkedinIcon.vue")['default']
export const IconsLogoJoshuarte: typeof import("../components/icons/LogoJoshuarte.vue")['default']
export const IconsLogoLJM: typeof import("../components/icons/LogoLJM.vue")['default']
export const SectionsBioSection: typeof import("../components/sections/BioSection.vue")['default']
export const SectionsFooterSection: typeof import("../components/sections/FooterSection.vue")['default']
export const SectionsHeroSection: typeof import("../components/sections/HeroSection.vue")['default']
export const SectionsPersonalProjectsSection: typeof import("../components/sections/PersonalProjectsSection.vue")['default']
export const SectionsSkillsSection: typeof import("../components/sections/SkillsSection.vue")['default']
export const SectionsWorkSection: typeof import("../components/sections/WorkSection.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const PrismicEmbed: typeof import("@prismicio/vue")['PrismicEmbed']
export const PrismicImage: typeof import("@prismicio/vue")['PrismicImage']
export const PrismicLink: typeof import("@prismicio/vue")['PrismicLink']
export const PrismicText: typeof import("@prismicio/vue")['PrismicText']
export const PrismicRichText: typeof import("@prismicio/vue")['PrismicRichText']
export const PrismicTable: typeof import("@prismicio/vue")['PrismicTable']
export const SliceZone: typeof import("@prismicio/vue")['SliceZone']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAppIcons: LazyComponent<typeof import("../components/AppIcons.vue")['default']>
export const LazyPersonalProjectItem: LazyComponent<typeof import("../components/PersonalProjectItem.vue")['default']>
export const LazyPortfolioPanel: LazyComponent<typeof import("../components/PortfolioPanel.vue")['default']>
export const LazyPrismicImageWrapper: LazyComponent<typeof import("../components/PrismicImageWrapper.vue")['default']>
export const LazyProjectCard: LazyComponent<typeof import("../components/ProjectCard.vue")['default']>
export const LazyProjectImage: LazyComponent<typeof import("../components/ProjectImage.vue")['default']>
export const LazyRecentPosts: LazyComponent<typeof import("../components/RecentPosts.vue")['default']>
export const LazyRecentProjectsButton: LazyComponent<typeof import("../components/RecentProjectsButton.vue")['default']>
export const LazySocialIcons: LazyComponent<typeof import("../components/SocialIcons.vue")['default']>
export const LazyWorkExperienceItem: LazyComponent<typeof import("../components/WorkExperienceItem.vue")['default']>
export const LazyIconsDiscordIcon: LazyComponent<typeof import("../components/icons/DiscordIcon.vue")['default']>
export const LazyIconsLinkedinIcon: LazyComponent<typeof import("../components/icons/LinkedinIcon.vue")['default']>
export const LazyIconsLogoJoshuarte: LazyComponent<typeof import("../components/icons/LogoJoshuarte.vue")['default']>
export const LazyIconsLogoLJM: LazyComponent<typeof import("../components/icons/LogoLJM.vue")['default']>
export const LazySectionsBioSection: LazyComponent<typeof import("../components/sections/BioSection.vue")['default']>
export const LazySectionsFooterSection: LazyComponent<typeof import("../components/sections/FooterSection.vue")['default']>
export const LazySectionsHeroSection: LazyComponent<typeof import("../components/sections/HeroSection.vue")['default']>
export const LazySectionsPersonalProjectsSection: LazyComponent<typeof import("../components/sections/PersonalProjectsSection.vue")['default']>
export const LazySectionsSkillsSection: LazyComponent<typeof import("../components/sections/SkillsSection.vue")['default']>
export const LazySectionsWorkSection: LazyComponent<typeof import("../components/sections/WorkSection.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyPrismicEmbed: LazyComponent<typeof import("@prismicio/vue")['PrismicEmbed']>
export const LazyPrismicImage: LazyComponent<typeof import("@prismicio/vue")['PrismicImage']>
export const LazyPrismicLink: LazyComponent<typeof import("@prismicio/vue")['PrismicLink']>
export const LazyPrismicText: LazyComponent<typeof import("@prismicio/vue")['PrismicText']>
export const LazyPrismicRichText: LazyComponent<typeof import("@prismicio/vue")['PrismicRichText']>
export const LazyPrismicTable: LazyComponent<typeof import("@prismicio/vue")['PrismicTable']>
export const LazySliceZone: LazyComponent<typeof import("@prismicio/vue")['SliceZone']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
