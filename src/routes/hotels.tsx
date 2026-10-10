import { createFileRoute } from '@tanstack/react-router';
import { HotelsPage } from '@/components/travel/Pages';
export const Route = createFileRoute('/hotels')({
 head:()=>({meta:[{title:'Find your perfect stay | YatraGenie'},{name:'description',content:'Compare sample Srinagar stays by budget, rating and location.'},{property:'og:title',content:'Find your perfect stay | YatraGenie'},{property:'og:description',content:'Compare sample Srinagar stays by budget, rating and location.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:HotelsPage,
});
