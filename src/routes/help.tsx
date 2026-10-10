import { createFileRoute } from '@tanstack/react-router';
import { HelpPage } from '@/components/travel/Pages';
export const Route = createFileRoute('/help')({
 head:()=>({meta:[{title:'Travel planning help | YatraGenie'},{name:'description',content:'Answers about mock trip estimates, expense tracking, maps and itinerary sharing.'},{property:'og:title',content:'Travel planning help | YatraGenie'},{property:'og:description',content:'Answers about mock trip estimates, expense tracking, maps and itinerary sharing.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:HelpPage,
});
